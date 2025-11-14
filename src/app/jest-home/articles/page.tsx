import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

async function getArticle(articleID: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/article?id=${articleID}`, {
      // Add revalidation if needed
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch article');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

function extractArticleIdFromSlug(slug: string): string {
  // Your existing slug extraction logic
  return slug.split('-').pop() || slug;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const articleID = extractArticleIdFromSlug(params.slug);
  const article = await getArticle(articleID);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-4/6 m-auto shadow-xl text-gray-800 bg-white">
      <div className="w-full bg-blue-500 text-white px-4 py-1">
        <Link href="/" className="text-white hover:underline">
          Back to homepage
        </Link>
      </div>
      <div className="relative w-full h-80">
        <Image 
          src={article.image.url} 
          alt={article.title} 
          fill
          style={{ objectFit: 'cover' }}
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

// Optional: Generate static params if you know your slugs ahead of time
export async function generateStaticParams() {
  // If you have a list of articles, you can pre-generate them
  // return articles.map((article) => ({
  //   slug: `${article.title.toLowerCase().replace(/\s+/g, '-')}-${article.id}`,
  // }));
  
  return [];
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const articleID = extractArticleIdFromSlug(params.slug);
  const article = await getArticle(articleID);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.body.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.body.substring(0, 160),
      images: [article.image.url],
    },
  };
}