import '@/styles/fonts.css'; 
import '@/styles/globals.css';
import '../../public/assets/frontend/css/bootstrap.min.css';
import '../../public/assets/frontend/css/style.css';
import { useRouter } from 'next/router';
import '@/styles/tailwind-admin.css'; // We'll handle this purely by CSS scope if needed, or import it here
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
