"use server";

import { ShopeeService } from "@/services/shopee";

export async function fetchShopeeProducts() {
  try {
    const products = await ShopeeService.searchItems();
    return { success: true, data: products };
  } catch (error) {
    console.error("Erro ao buscar produtos Shopee:", error);
    return { success: false, error: "Falha ao carregar ofertas" };
  }
}
