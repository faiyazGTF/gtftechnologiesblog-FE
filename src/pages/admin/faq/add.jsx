import React, { useState, useEffect } from 'react';
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
import Link from 'next/link';

const AdminAddBlogFaq = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm();
  const router = useRouter();
  const API_ADMIN_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL

  const [editorValue, setEditorValue] = useState('');
  const [images, setImages] = useState({});
  const [preview, setPreview] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const { blog_id: blogId } = router.query;
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosAdmin.get(`${API_ADMIN_URL}blog-faq?limit=100`);
      if (res.data && res.data.data) {
        const formatted = res.data.data.map(cat => ({
          value: cat.id,
          label: cat.name
        }));
        setCategories(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };



  const fields = [

    { label: 'Question', name: 'question', placeholder: 'Enter Question', col: 'md:col-span-12 lg:col-span-12' },
    { label: 'Answer', name: 'answer', placeholder: 'Enter Answer', col: 'md:col-span-12 lg:col-span-12', type: 'text' },
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
      formData.append('blog_id', blogId);
      formData.append('question', data.question);
      formData.append('answer', data.answer);

      await axiosAdmin.post(
        `${API_ADMIN_URL}blog-faq`,
        formData
      );

      toast.success('Faq added successfully!');
      router.push(`/admin/faq?blog_id=${blogId}`);
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
              <Link href={`/admin/blog-faq?blog_id=${blogId}`}>Back </Link>
              <Heading>Add Faq</Heading>
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
                          ? (content) => {
                            setEditorValue(content);
                            setValue(field.name, content);
                          }
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

export default withAuth(AdminAddBlogFaq);
