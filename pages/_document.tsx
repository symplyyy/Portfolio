import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Titre de la page */}
        <title>Timéo Soëte | Développeur Web React, Next.js & PHP | Portfolio</title>
        <meta name="description" content="Développeur Web Fullstack à Strasbourg. Spécialisé en React, Next.js & PHP, je crée des sites modernes, performants et responsive."></meta>
        
        {/* Favicon - Configuration optimisée pour Google */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Meta tags additionnels pour une meilleure indexation */}
        <meta property="og:image" content="/images/logo_portfolio.png" />
        <meta property="og:title" content="Timéo Soëte | Développeur Web React, Next.js & PHP" />
        <meta property="og:description" content="Développeur Web Fullstack à Strasbourg. Spécialisé en React, Next.js & PHP, je crée des sites modernes, performants et responsive." />
        <meta property="og:type" content="website" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/images/logo_portfolio.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo_portfolio.png" />
        
        {/* Meta tags pour le site */}
        <meta name="theme-color" content="#CDFB52" />
        <meta name="author" content="Timéo Soëte" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
