import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />

        {/* Favicon */}
        <link rel="icon" href="/assets/images/favicon.webp" />

        {/* Default SEO Tags */}
        <meta name="description" content="Liv Interio" />
        <meta name="keywords" content="Liv Interio" />
        <meta name="author" content="Liv Interio" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Liv Interio" />
        <meta property="og:description" content="Liv Interio" />
        
        {/* Owl Carousel CSS */}
        <link rel="stylesheet" href="/assets/frontend/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/frontend/css/owl.theme.default.min.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
