import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import AdminHeader from '@/components/admin/AdminHeader';
import Container from '@/components/utilities/Container';
import Heading from '@/components/utilities/Heading';
import InputField from '@/components/admin/InputFiels';
import axiosAdmin from '@/login/axiosAdmin';
import withAuth from '@/login/withAuth';
import { useRouter } from "next/router";
import Section from '@/components/utilities/Section';

const AdminEditCategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const API_ADMIN_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady && id) {
      fetchCategory();
    }
  }, [router.isReady, id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await axiosAdmin.get(`${API_ADMIN_URL}blog-category/${id}`);
      if (res.data && res.data.data) {
        reset(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to fetch category data");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Name', name: 'name', placeholder: 'Enter name', col: 'md:col-span-12' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axiosAdmin.put(`${API_ADMIN_URL}blog-category/${id}`, data);
      toast.success('Category updated successfully!');
      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while updating!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!router.isReady || loading) {
    return (
      <>
        <AdminHeader />
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-[var(--text-primary)] font-montserrat">Loading category details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <Section className='!py-[30px]'>
        <Container>
          <div className='shadow-sm'>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--text-primary)]">
              <Heading>Edit Category</Heading>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {fields.map((field) => (
                  <InputField
                    key={field.name}
                    {...field}
                    register={register}
                    placeholder={field.placeholder}
                    error={errors[field.name]}
                  />
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--text-primary)] hover:bg-[var(--text-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--text-primary)] transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>

            <Toaster position="top-right" />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default withAuth(AdminEditCategoryPage);
