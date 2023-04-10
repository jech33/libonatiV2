import { Lora, Montserrat, Roboto } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
export const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});
export const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});
