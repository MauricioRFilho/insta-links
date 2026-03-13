"use server";

import { ShopeeService, type ShopeeProduct } from "@/services/shopee";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function searchShopeeProducts(input: string): Promise<{ success: boolean; data?: ShopeeProduct[]; error?: string }> {
  try {
    const products = await ShopeeService.search(input);
    
    if (!products.length) {
      return { success: false, error: "Nenhum produto encontrado." };
    }

    return { success: true, data: products };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("[Admin] Erro Shopee:", msg);
    return { success: false, error: msg };
  }
}

export async function saveProduct(productData: ShopeeProduct & { category?: string }) {
  try {
    // Usando upsert para evitar duplicatas e permitir atualização
    const data = await prisma.product.upsert({
      where: { shopee_id: productData.shopee_id },
      update: {
        title: productData.title,
        image_url: productData.image_url,
        price: productData.price,
        url: productData.url,
        category: productData.category || null,
        currency: productData.currency || 'BRL',
        active: true,
      },
      create: {
        shopee_id: productData.shopee_id,
        title: productData.title,
        image_url: productData.image_url,
        price: productData.price,
        url: productData.url,
        category: productData.category || null,
        currency: productData.currency || 'BRL',
      },
    });

    revalidatePath('/ofertas');
    revalidatePath('/admin');
    return { success: true, data };
  } catch (error) {
    console.error("[Admin] Prisma Save Error:", error);
    return { success: false, error: "Falha interna ao salvar no Prisma" };
  }
}

export async function getProducts() {
  try {
    const data = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return data;
  } catch (error) {
    console.error("[Admin] Prisma Get Error:", error);
    return [];
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/ofertas');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error("[Admin] Prisma Delete Error:", error);
    return { success: false, error: "Falha interna ao deletar no Prisma" };
  }
}
