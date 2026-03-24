import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('authToken');
        const expiry = localStorage.getItem('authExpiry');

        // If no token or expiry, redirect
        if (!token || !expiry || Date.now() > parseInt(expiry)) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('authExpiry');
          router.push('/admin/login');
          return;
        }

        try {
          // Validate token
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_ADMIN_URL}validate-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Set timeout to auto-logout when expiry hits
          const timeout = parseInt(expiry) - Date.now();
          const timer = setTimeout(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authExpiry');
            router.push('/admin/login');
          }, timeout);

          return () => clearTimeout(timer); // Clean up
        } catch (err) {
          console.error('Token validation failed:', err);
          localStorage.removeItem('authToken');
          localStorage.removeItem('authExpiry');
          router.push('/admin/login');
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
