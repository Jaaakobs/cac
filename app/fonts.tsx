// app/fonts.ts
import { Anton, Open_Sans } from 'next/font/google';

export const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});