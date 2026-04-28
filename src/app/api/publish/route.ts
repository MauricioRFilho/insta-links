import { NextResponse } from "next/server";

/**
 * Publishes updated links.json to GitHub via the Contents API.
 * This triggers a Vercel redeploy automatically via webhook.
 *
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 */
export async function POST(req: Request) {
  try {
    const { password, data } = await req.json();

    // Auth check
    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // e.g. "MauricioRFilho/insta-links"

    if (!token || !repo) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN ou GITHUB_REPO não configurados." },
        { status: 500 }
      );
    }

    const filePath = "public/data/links.json";
    const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

    // Step 1: Get current file SHA (required for update)
    const currentFile = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    let sha: string | undefined;
    if (currentFile.ok) {
      const fileData = await currentFile.json();
      sha = fileData.sha;
    }

    // Step 2: Push updated content
    const content = Buffer.from(
      JSON.stringify(data, null, 2) + "\n"
    ).toString("base64");

    const pushResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `chore: update links via admin panel`,
        content,
        sha,
        branch: "main",
      }),
    });

    if (!pushResponse.ok) {
      const err = await pushResponse.json();
      console.error("[Publish] GitHub API error:", err);
      return NextResponse.json(
        { error: `GitHub API: ${err.message || "Erro desconhecido"}` },
        { status: 502 }
      );
    }

    const result = await pushResponse.json();
    return NextResponse.json({
      success: true,
      commitSha: result.commit?.sha,
    });
  } catch (error) {
    console.error("[Publish] Error:", error);
    return NextResponse.json(
      { error: "Erro interno ao publicar." },
      { status: 500 }
    );
  }
}
