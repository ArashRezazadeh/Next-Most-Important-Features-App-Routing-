import ArticleCard from "@/components/ArticleCard";


async function getArticles() {
  try {
    const res = await fetch('http://localhost:3000/api/articles');
    
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function Home() {
  const articles: any[] = await getArticles();

  return (
    <>
      <div className="flex flex-col justify-center align-center w-full pt-20 text-gray-700 text-center">
        <h1 className="text-6xl font-bold drop-shadow-md">My awesome blog</h1>
        <h2 className="text-lg mt-2 drop-shadow-md">
          This is an example blog for the Real-World Next.js book
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-4 w-4/6 m-auto pt-20 pb-20">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </>
  );
}