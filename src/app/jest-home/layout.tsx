export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="w-full min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
