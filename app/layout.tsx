/** Libraries **/
import { Metadata } from 'next';
import { montserrat } from '@shared/fonts';

/** Assets **/
import './globals.css';

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
        className={`${montserrat.className} margin-0
        bg-gradient-to-r from-black to-libonatiDarkBlack 
        flex flex-col min-h-[100dvh]`}
      >
        {children}
      </body>
    </html>
  );
}
