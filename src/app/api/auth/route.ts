import { NextResponse } from "next/server";

/** Simple password-based auth for admin panel. Validates against ADMIN_PASSWORD env var. */
export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD não configurada no servidor." },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }
}
