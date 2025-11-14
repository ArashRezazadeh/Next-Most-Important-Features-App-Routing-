import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul className="">
          <li>
            <Link href="/jest-home">Jest Home Page</Link>
          </li>
      </ul>
    </div>
  );
}
