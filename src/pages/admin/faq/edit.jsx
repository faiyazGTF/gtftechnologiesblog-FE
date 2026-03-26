import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import AdminHeader from '@/components/admin/AdminHeader';
import Container from '@/components/utilities/Container';
import Heading from '@/components/utilities/Heading';
import InputField from '@/components/admin/InputFiels';
import axiosAdmin from '@/login/axiosAdmin';
import withAuth from '@/login/withAuth';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Section from '@/components/utilities/Section';
import Link from 'next/link';

const EditBlogFaq = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm();
  const API_ADMIN_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL

  const [editorValue, setEditorValue] = useState('');
  const [blogId, setBlogId] = useState('');

  const [images, setImages] = useState({});
  const [preview, setPreview] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const fetchBlog = async () => {
    try {
      const res = await axiosAdmin.get(`${API_ADMIN_URL}blog-faq/${id}`);
      const data = res.data.data;

      const formData = {
        ...data,
      };
      setBlogId(data.blog_id);
      reset(formData); // fill form
      setEditorValue(data.description || '');
    } catch (err) {
      console.error(err);
      toast.error('Failed to load blog data');
    }
  };

  const fields = [

    { label: 'Question', name: 'question', placeholder: 'Enter Question', col: 'md:col-span-12 lg:col-span-12' },
    { label: 'Answer', name: 'answer', placeholder: 'Enter Answer', col: 'md:col-span-12 lg:col-span-12', type: 'text' },
  ];
  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

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


      formData.append('question', data.question);
      formData.append('answer', data.answer);

      await axiosAdmin.put(`${API_ADMIN_URL}blog-faq/${id}`, formData);

      toast.success('Blog FAQ updated successfully!');
      router.push(`/admin/faq?blog_id=${blogId}`);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  console.log('Form Errors:', errors);

  return (
    <>
      <AdminHeader />
      <Section className='!py-[30px]'>
        <Container>
          <div className='shadow-sm'>
            <div className="flex items-center justify-between  px-6 py-4 border-b border-[var(--text-primary)]">
              <Link href={`/admin/faq?blog_id=${blogId}`}>Back </Link>
              <Heading>Edit Faq</Heading>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {fields.map((field) => (
                  <InputField
                    editPage={true}
                    key={field.name}
                    {...field}
                    register={register}
                    error={errors[field.name]}
                    value={field.type === 'editor' ? editorValue : undefined}
                    onChange={
                      field.type === 'image'
                        ? (e) => handleImageChange(e, field.name)
                        : field.type === 'editor'
                          ? (content) => {
                            setEditorValue(content);
                            setValue(field.name, content);
                            trigger(field.name);
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

export default withAuth(EditBlogFaq);
