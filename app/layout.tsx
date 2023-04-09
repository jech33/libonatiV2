/** Libraries **/
import { Metadata } from 'next';
import { lora, montserrat, roboto } from '@shared/fonts';

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
        className={`${montserrat.variable} ${lora.variable} ${roboto.variable}
        font-montserrat margin-0 flex min-h-[100dvh] flex-col 
        bg-gradient-to-r from-black to-libonatiDarkBlack`}
      >
        {children}
      </body>
    </html>
  );
}
