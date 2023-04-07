import { Lora, Montserrat, Roboto } from 'next/font/google';

export const montserrat = Montserrat({ subsets: ['latin'] });
export const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});
export const lora = Lora({ subsets: ['latin'] });

export const typography = {
  h1: `${montserrat.className} text-5xl`,
  h2: `${montserrat.className} text-3xl`,
  h3: `${lora.className} font-[700]`,
  p: roboto.className,
};
