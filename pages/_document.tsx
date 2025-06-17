import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        
        {/* Apple Touch Icon - utilise le logo du portfolio */}
        <link rel="apple-touch-icon" href="/images/logo_portfolio.png" />
        
        {/* Meta tags pour le site */}
        <meta name="theme-color" content="#CDFB52" />
        <meta name="description" content="Portfolio de Timéo Soëte - Développeur Web Frontend & Backend" />
        <meta name="author" content="Timéo Soëte" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
