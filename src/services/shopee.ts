import crypto from 'node:crypto';

interface ShopeeConfig {
  appId: string;
  secret: string;
  baseUrl: string;
}

export interface ShopeeProduct {
  shopee_id: string;
  title: string;
  image_url: string;
  price: number;
  currency: string;
  url: string;
  commission_rate?: string;
  rating?: number;
  sales?: number;
}

const config: ShopeeConfig = {
  appId: process.env.SHOPEE_APP_ID || '',
  secret: process.env.SHOPEE_APP_SECRET || '',
  baseUrl: 'https://open-api.affiliate.shopee.com.br/graphql',
};

export class ShopeeService {

  private static sign(payload: string): { timestamp: number; signature: string } {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto.createHash('sha256')
      .update(config.appId + timestamp + payload + config.secret)
      .digest('hex');
    return { timestamp, signature };
  }

  private static async graphql<T = unknown>(query: string): Promise<T> {
    const payload = JSON.stringify({ query });
    const { timestamp, signature } = this.sign(payload);

    const res = await fetch(config.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `SHA256 Credential=${config.appId}, Timestamp=${timestamp}, Signature=${signature}`,
      },
      body: payload,
      signal: AbortSignal.timeout(15000),
    });

    const data = await res.json();
    if (data.errors?.length) throw new Error(data.errors[0].message);
    return data.data as T;
  }

  private static mapNodes(nodes: Record<string, unknown>[]): ShopeeProduct[] {
    return nodes.map((n) => ({
      shopee_id: String(n.itemId),
      title: n.productName as string,
      image_url: n.imageUrl as string,
      price: parseFloat(n.priceMin as string) || 0,
      currency: 'BRL',
      url: n.offerLink as string,
      commission_rate: n.commissionRate as string | undefined,
      rating: n.ratingStar as number | undefined,
      sales: n.sales as number | undefined,
    }));
  }

  /**
   * Detecta se o input é URL de produto ou keyword.
   * Retorna produtos em ambos os casos.
   */
  static async search(input: string): Promise<ShopeeProduct[]> {
    const ids = this.extractIds(input);

    if (ids) {
      return this.getByIds(ids.shopId, ids.itemId);
    }

    return this.searchByKeyword(input);
  }

  /** Busca produto específico por shopId + itemId */
  static async getByIds(shopId: string, itemId: string): Promise<ShopeeProduct[]> {
    const data = await this.graphql<{ productOfferV2?: { nodes?: Record<string, unknown>[] } }>(
      `{ productOfferV2(itemId: ${itemId}, shopId: ${shopId}) { nodes { itemId productName imageUrl priceMin priceMax offerLink commissionRate ratingStar sales } } }`
    );
    return this.mapNodes(data?.productOfferV2?.nodes || []);
  }

  /** Busca produtos por keyword */
  static async searchByKeyword(keyword: string, limit = 10): Promise<ShopeeProduct[]> {
    const safe = keyword.replace(/"/g, '\\"');
    const data = await this.graphql<{ productOfferV2?: { nodes?: Record<string, unknown>[] } }>(
      `{ productOfferV2(keyword: "${safe}", sortType: 1, limit: ${limit}) { nodes { itemId productName imageUrl priceMin priceMax offerLink commissionRate ratingStar sales } } }`
    );
    return this.mapNodes(data?.productOfferV2?.nodes || []);
  }

  /** Extrai shopId e itemId de qualquer URL da Shopee */
  static extractIds(input: string): { shopId: string; itemId: string } | null {
    const productMatch = input.match(/product\/(\d+)\/(\d+)/);
    if (productMatch) return { shopId: productMatch[1], itemId: productMatch[2] };

    const iMatch = input.match(/i\.(\d+)\.(\d+)/);
    if (iMatch) return { shopId: iMatch[1], itemId: iMatch[2] };

    return null;
  }
}
