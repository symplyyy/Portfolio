import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Custom404() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>404 - Page non trouvée | Portfolio</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
      </Head>
      
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          {/* Numéro 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-[#CDFB52] leading-none">
              404
            </h1>
          </motion.div>

          {/* Message principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Page introuvable
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-sm mx-auto">
              Cette page n&#39;existe pas
            </p>
          </motion.div>

          {/* Bouton de retour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-[#CDFB52] text-black font-medium rounded-lg hover:bg-[#CDFB52]/90 transition-colors duration-200 cursor-pointer"
            >
              Retour à l&#39;accueil
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
} 