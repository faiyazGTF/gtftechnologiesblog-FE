import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Heading from '@/components/utilities/Heading';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);

      const response = await axios.post(`${BASE_URL}login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { token } = response.data;
      const expiryTime = Date.now() + 30 * 60 * 1000; // 30 minutes

      localStorage.setItem('authToken', token);
      localStorage.setItem('authExpiry', expiryTime.toString());

      toast.success('Logged in successfully!');
      router.push('/admin');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password';
      toast.error(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100">
        <div className="relative w-full h-full">
          <Image
            src="/assets/images/interior/2.webp"
            alt="Login background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-start">
            <Image
              src="/assets/images/gtflogo-vector.svg"
              alt="Company Logo"
              width={250}
              height={150}
              priority
              className="ml-[-22px]"
            />
          </div>

          <Heading>Sign in</Heading>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-[5px] font-montserrat font-semibold text-sm text-gray-700 tracking-[1px]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="bg-white font-montserrat appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)] sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-[5px] font-montserrat font-semibold text-sm text-gray-700 tracking-[1px]"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="bg-white font-montserrat appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)] sm:text-sm"
                  placeholder="Password"
                />
              </div>

              {/* Inline error */}
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--text-primary)] hover:bg-[var(--text-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
