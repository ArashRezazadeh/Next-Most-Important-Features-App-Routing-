import { NextRequest } from 'next/server';
import data from "@/data/articles"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'ID parameter is required' }, { status: 400 });
  }

  const requestedArticle = data.find((article) => article.id === id);

  if (!requestedArticle) {
    return Response.json({ error: 'Article not found' }, { status: 404 });
  }

  return Response.json(requestedArticle);
}