import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <Link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
    </Html>
  );
}
