import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomModal from '../utilities/CustomModal';
import Form from '../utilities/Form';
// my css 
// bootstrap and style.css moved to _app.js
export default function Layout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const noLayoutRoutes = ['/disclaimer', '/privacy-policy'];
  const shouldHideLayout =
    router.pathname.startsWith('/admin') ||
    noLayoutRoutes.some(route => router.pathname.includes(route));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      {!shouldHideLayout && <Header onOpen={openModal} />}

      {isModalOpen && (
        <CustomModal onClose={closeModal}>
          <Form logo={true} />
        </CustomModal>
      )}

      {
        // ✅ Safely inject openModal only if children is valid
        React.isValidElement(children)
          ? React.cloneElement(children, { openModal })
          : children
      }

      {!shouldHideLayout && <Footer />}
    </div>
  );
}
