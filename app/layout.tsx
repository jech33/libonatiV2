export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-black to-libonatiDarkBlack">
        {children}
      </body>
    </html>
  );
}
