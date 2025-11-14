// app/article/[slug]/page.tsx
import { extractArticleIdFromSlug } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
  title: string;
  body: string;
  author: {
    name: string;
  };
  image: {
    url: string;
    author: string;
  };
}

interface Props {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string) {
  const articleID = extractArticleIdFromSlug(slug);
  const articleReq = await fetch(`http://localhost:3000/api/article?id=${articleID}`, {
    next: { revalidate: 60 } // Optional: add revalidation
  });

  if (!articleReq.ok) {
    if (articleReq.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch article');
  }

  return articleReq.json() as Promise<Article>;
}

export async function generateMetadata({ params }: Props) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: `Article by ${article.author.name}`,
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug);

  if (!article) {
    // This will render the closest 404.tsx file
    notFound();
  }

  return (
    <div className="w-4/6 m-auto shadow-xl text-gray-800 bg-white">
      <div className="w-full bg-blue-500 text-white px-4 py-1">
        <Link href="/">
          Back to homepage
        </Link>
      </div>
      <div className="relative w-full h-80">
        <Image 
          src={article.image.url} 
          alt={article.title} 
          fill
          className="object-cover"
        />
        <div className="absolute px-4 py-2 bg-black bg-opacity-60 text-white bottom-2 right-2">
          Image by <span className="font-bold">{article.image.author}</span> on Unsplash
        </div>
      </div>
      <div className="p-8">
        <h1 className="font-black text-4xl">{article.title}</h1>
        <h2> Written by {article.author.name} </h2>
        <hr className="border-gray-400 mt-6 mb-6" />
        <p>{article.body}</p>
      </div>
    </div>
  );
}