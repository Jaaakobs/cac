import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function CustomHead() {
  return (
    <Html>
      <Head>
        <script src="https://tally.so/widgets/embed.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}