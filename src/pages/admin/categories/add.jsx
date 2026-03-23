import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import AdminHeader from '@/components/admin/AdminHeader';
import Container from '@/components/utilities/Container';
import Heading from '@/components/utilities/Heading';
import InputField from '@/components/admin/InputFiels';
import axiosAdmin from '@/login/axiosAdmin';
import withAuth from '@/login/withAuth';
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Section from '@/components/utilities/Section';

const AdminAddCategoryPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

  const [editorValue, setEditorValue] = useState('');
  const [images, setImages] = useState({});
  const [preview, setPreview] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    { label: 'Name', name: 'name', placeholder: 'Enter name', col: 'md:col-span-6 lg:col-span-4' },
  ];

  const handleImageChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      for (const key in data) {
        if (key !== 'description') {
          formData.append(key, data[key]);
        }
      }

      for (const key in images) {
        formData.append(key, images[key]);
      }

      formData.append('description', editorValue);

      await axiosAdmin.post(
        `${BASE_URL}blog-category`,
        formData
      );

      toast.success('Category added successfully!');
      router.push("/admin/categories");
      reset();
      setEditorValue('');
      setImages({});
      setPreview({});
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while submitting!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <Section className='!py-[30px]'>
        <Container>
          <div className='shadow-sm'>
            <div className="flex items-center justify-between  px-6 py-4 border-b border-[var(--text-primary)]">
              <Heading>Add Category</Heading>
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
                    value={field.type === 'editor' ? editorValue : undefined}
                    onChange={
                      field.type === 'image'
                        ? (e) => handleImageChange(e, field.name)
                        : field.type === 'editor'
                          ? setEditorValue
                          : undefined
                    }
                    preview={preview[field.name]}
                  />
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--text-primary)] hover:bg-[var(--text-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--text-primary)] transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
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

export default withAuth(AdminAddCategoryPage);
