"use server";

import { ShopeeService, type ShopeeProduct } from "@/services/shopee";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function searchShopeeProducts(input: string): Promise<{ success: boolean; data?: ShopeeProduct[]; error?: string }> {
  try {
    const products = await ShopeeService.search(input);
    
    if (!products.length) {
      return { success: false, error: "Nenhum produto encontrado." };
    }

    return { success: true, data: products };
  } catch (error: any) {
    console.error("[Admin] Erro Shopee:", error?.message);
    return { success: false, error: error?.message || "Erro desconhecido" };
  }
}

export async function saveProduct(productData: any) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        shopee_id: productData.shopee_id,
        title: productData.title,
        image_url: productData.image_url,
        price: productData.price,
        url: productData.url,
        category: productData.category || null,
        currency: productData.currency || 'BRL',
      }])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath('/ofertas');
    revalidatePath('/admin');
    return { success: true, data };
  } catch (err) {
    return { success: false, error: "Falha interna ao salvar" };
  }
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
    
  if (error) return [];
  return data;
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Supabase Delete Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath('/ofertas');
    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    return { success: false, error: "Falha interna ao deletar" };
  }
}
