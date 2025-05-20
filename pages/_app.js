import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import PreLoader from "@/src/layouts/PreLoader";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import dynamic from 'next/dynamic';

function App({ Component, pageProps }) {
  const [preLoader, setPreLoader] = useState(true);

  useEffect(() => {
    // Initialize AOS only on client side
    const initializeAOS = async () => {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 800,
        once: true
      });
    };

    // Load Bootstrap JS only on client side
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min');
      initializeAOS();
    }

    // Preloader timeout
    const timer = setTimeout(() => {
      setPreLoader(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Voice2Byte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Add Font Awesome CDN if needed */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </Head>
      {preLoader && <PreLoader />}
      {!preLoader && <Component {...pageProps} />}
    </Fragment>
  );
}

export default App;