/** Libraries **/
import { Metadata } from 'next';
import { montserrat, roboto } from '@shared/fonts';

/** Functional **/
import Footer from '@components/Footer';

export const metadata: Metadata = {
  title: 'Bruno Libonati',
  description: "Bruno Libonati's band website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}
        bg-gradient-to-r from-black to-libonatiDarkBlack
        min-h-[100dvh]`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
