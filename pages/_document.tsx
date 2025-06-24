import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Titre de la page */}
        <title>Timéo Soëte | Développeur Web React, Next.js & PHP | Portfolio</title>
        <meta name="description" content="Développeur Web Fullstack à Strasbourg. Spécialisé en React, Next.js & PHP, je crée des sites modernes, performants et responsive."></meta>
        
        {/* Favicon - Configuration complète */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Favicons pour différentes tailles */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        
        {/* Meta tags pour navigateurs */}
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#CDFB52" />
        
        {/* Meta tags Open Graph pour Google/réseaux sociaux */}
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:image:width" content="48" />
        <meta property="og:image:height" content="48" />
        <meta property="og:image:type" content="image/x-icon" />
        <meta property="og:title" content="Timéo Soëte | Développeur Web React, Next.js & PHP" />
        <meta property="og:description" content="Développeur Web Fullstack à Strasbourg. Spécialisé en React, Next.js & PHP, je crée des sites modernes, performants et responsive." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://timeosoete.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:title" content="Timéo Soëte | Développeur Web React, Next.js & PHP" />
        <meta name="twitter:description" content="Développeur Web Fullstack à Strasbourg. Spécialisé en React, Next.js & PHP, je crée des sites modernes, performants et responsive." />
        
        {/* Meta tags pour le site */}
        <meta name="theme-color" content="#CDFB52" />
        <meta name="author" content="Timéo Soëte" />
        
        {/* Directives pour les robots */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot-image" content="index" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://timeosoete.com" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
