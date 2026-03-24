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

const EditBlog = () => {
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
  const API_ASSETS = process.env.NEXT_PUBLIC_API_URL;

  const [editorValue, setEditorValue] = useState('');
  const [images, setImages] = useState({});
  const [preview, setPreview] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosAdmin.get(`${API_ADMIN_URL}blog-category?limit=100`);
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

  const fetchBlog = async () => {
    try {
      const res = await axiosAdmin.get(`${API_ADMIN_URL}blog/${id}`);
      const data = res.data.data;

      // Handle mapping and date formatting
      const formData = {
        ...data,
        mobile_image: data.mb_image, // map mb_image to mobile_image
        date_at: data.date_at ? data.date_at.split('T')[0] : '', // format date for input type="date"
      };

      reset(formData); // fill form
      setEditorValue(data.description || '');
      setPreview({
        mobile_image: data.mb_image,
        feature_image: data.feature_image,
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to load blog data');
    }
  };

  const handleTitleBlur = (e) => {
    const title = e.target.value;
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setValue('slug', slug);
    }
  };

  const fields = [
    {
      label: 'Category',
      name: 'category_id',
      placeholder: 'Select Category',
      col: 'md:col-span-6 lg:col-span-4',
      type: 'select',
      options: [...categories]
    },
    { label: 'Title', name: 'heading', placeholder: 'Enter Title', col: 'md:col-span-6 lg:col-span-4', onBlur: handleTitleBlur },
    { label: 'Short Description', name: 'short_description', placeholder: 'Enter Short Description', col: 'md:col-span-6 lg:col-span-4' },
    { label: 'Date', name: 'date_at', placeholder: 'Select Date', col: 'md:col-span-6 lg:col-span-4', type: 'date' },
    { label: 'Mobile Image', name: 'mobile_image', col: 'md:col-span-6 lg:col-span-3', type: 'image', isRequired: false },
    { label: 'Desktop Image', name: 'feature_image', col: 'md:col-span-6 lg:col-span-3', type: 'image', isRequired: false },
    { label: 'Alt Tag', name: 'alt', placeholder: 'Enter Alt', col: 'md:col-span-3 lg:col-span-3' },
    { label: 'Slug', name: 'slug', placeholder: 'Enter Slug', col: 'md:col-span-3 lg:col-span-3' },
    { label: 'Blog Content', name: 'description', col: 'md:col-span-12', type: 'editor' },
    { label: 'Meta Title', name: 'meta_title', placeholder: 'Enter Meta Title', col: 'md:col-span-6 lg:col-span-4', isRequired: false },
    { label: 'Meta Keyword', name: 'meta_keywords', placeholder: 'Enter Meta Keyword', col: 'md:col-span-6 lg:col-span-4', isRequired: false },
    { label: 'Meta Description', name: 'meta_description', placeholder: 'Enter Meta Description', col: 'md:col-span-6 lg:col-span-4', isRequired: false },
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
    const excludeFields = ['description', 'mobile_image', 'feature_image', 'mb_image'];

    for (const key in data) {
      if (!excludeFields.includes(key)) {
        formData.append(key, data[key]);
      }
    }

    for (const key in images) {
      formData.append(key, images[key]);
    }

    formData.append('description', editorValue);

    await axiosAdmin.put(`${API_ADMIN_URL}blog/${id}`, formData);

    toast.success('Blog updated successfully!');
    router.push("/admin/blogs");
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
            <Heading>Edit Blog</Heading>
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

export default withAuth(EditBlog);
