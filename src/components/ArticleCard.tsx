import Link from 'next/link';
import Image from 'next/image';
import { composeArticleSlug, cutTextToLength } from '../lib';

export default function ArticleCard(article: any) {
  const articleURL = `/jest-home/articles/${composeArticleSlug(article.id, article.title)}`;

  return (
    <Link className="w-full rounded-sm bg-white rounded-b-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out" href={articleURL} passHref>
      <div className="relative w-full h-44">
        <Image
          src={article.image.url}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-md"
        />
      </div>
      <div className="p-2">
        <div className="text-xl font-bold leading-2 h-16">{article.title}</div>
        <div className="mt-2 text-sm">{cutTextToLength(article.body, 100)}</div>
        <hr className="divide-solid border-blue-50 mt-4 mb-4" />
        <div className="text-sm">Written by {article.author.name}</div>
      </div>
    </Link>
  );
}
