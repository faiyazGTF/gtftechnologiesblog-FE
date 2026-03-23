// pages/_app.js
import '@/styles/fonts.css'; 
import '@/styles/globals.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout'; // Import your layout
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 200,
    });
  }, []);

//   useEffect(() => {
//   if (typeof window !== 'undefined' && window.innerWidth >= 768) {
//     import('aos').then((AOS) => {
//       AOS.init({
//         duration: 800,
//         once: true,
//         offset: 200,
//       });
//     });
//   }
// }, []);
  return (
    <Layout>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </Layout>
  );
}
