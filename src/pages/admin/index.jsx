import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminIndex = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.replace('/admin/blogs');
    }
  }, [router.isReady]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting to Blogs...</div>;
};

export default AdminIndex;
