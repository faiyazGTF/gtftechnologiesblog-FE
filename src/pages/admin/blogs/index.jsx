import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import CustomTable from '@/components/utilities/admin/CustomTable';
import TableBody from '@/components/utilities/admin/TableBody';
import TableData from '@/components/utilities/admin/TableData';
import TableHead from '@/components/utilities/admin/TableHead';
import TableHeader from '@/components/utilities/admin/TableHeader';
import TableRow from '@/components/utilities/admin/TableRow';
import Container from '@/components/utilities/Container';
import Heading from '@/components/utilities/Heading';
import Image from 'next/image';
import Link from 'next/link';
import withAuth from '@/login/withAuth';
import axiosAdmin from '@/login/axiosAdmin';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/utilities/Pagination';
import Section from '@/components/utilities/Section';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from "yet-another-react-lightbox/plugins/zoom";
const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const limit = 5;
  const Thead = ['Title', 'Feature Image', 'Mobile Image', 'Action'];
  const API_ADMIN_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;
  const API_ASSETS = process.env.NEXT_PUBLIC_API_URL;

  const fetchBlogs = async (page = 1) => {
    try {
      const res = await axiosAdmin.get(
        `${API_ADMIN_URL}blog?page=${page}&limit=${limit}`
      );

      const data = res.data;
      setBlogs(data.data || []);
      setCurrentPage(data.pagination?.page || 1);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch blogs');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await axiosAdmin.delete(
        `${API_ADMIN_URL}blog/${id}`
      );
      if (res.data.status) {
        toast.success('Blog deleted successfully');
        fetchBlogs(currentPage);
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const openLightbox = (src) => {
    setLightboxImage(src);
    setLightboxOpen(true);
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <>
      <AdminHeader />
      <Section className="!py-[30px]">
        <Container>
          <div className="shadow-sm">
            <div className="flex items-center justify-between px-[30px] py-[20px] border-b border-[var(--text-primary)]">
              <Heading>Blogs</Heading>
              <Link
                href="/admin/blogs/add"
                className="bg-[var(--text-primary)] text-white px-[30px] py-[10px] rounded-[5px] hover:bg-[var(--text-primary-hover)]"
              >
                Add Blog
              </Link>
            </div>

            <div className="bg-white p-[40px]">
              <h4>All Blogs</h4>

              <div className="mt-[30px] overflow-auto">
                <CustomTable>
                  <TableHead>
                    <TableRow>
                      {Thead.map((item, index) => (
                        <TableHeader key={index}>{item}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {blogs.length > 0 ? (
                      blogs.map((blog) => (
                        <TableRow key={blog._id}>
                          <TableData heading={blog.heading && blog.heading.length > 110 ? blog.heading : undefined}>
                            {blog.heading && blog.heading.length > 110
                              ? `${blog.heading.slice(0, 110)}...`
                              : blog.heading}
                          </TableData>
                          <TableData>
                            <Image
                              src={`${API_ASSETS}${blog.feature_image}`}
                              alt="feature"
                              width={40}
                              height={40}
                              className="rounded object-cover mx-auto cursor-pointer"
                              onClick={() =>
                                openLightbox(
                                  `${API_ASSETS}${blog.feature_image}`
                                )
                              }
                            />
                          </TableData>
                          <TableData>
                            <Image
                              src={`${API_ASSETS}${blog.mb_image}`}
                              alt="mobile"
                              width={40}
                              height={40}
                              className="rounded object-cover mx-auto cursor-pointer"
                              onClick={() =>
                                openLightbox(
                                  `${API_ASSETS}${blog.mb_image}`
                                )
                              }
                            />
                          </TableData>
                          <TableData>
                            <div className="w-full flex items-center justify-center gap-[10px]">
                              <Link
                                href={`/admin/blogs/edit/?id=${blog.id}`}
                                className="hover:bg-[#ecebeb] inline-block  p-[10px] rounded-[5px]"
                              >
                                <Image
                                  src="/assets/icons/edit.webp"
                                  alt="Edit icon"
                                  width={20}
                                  height={20}
                                />
                              </Link>
                              <button
                                onClick={() => handleDelete(blog.id)}
                                className="hover:bg-[#ecebeb] p-[10px] rounded-[5px]"
                              >
                                <Image
                                  src="/assets/icons/delete.webp"
                                  alt="Delete Icon "
                                  width={20}
                                  height={20}
                                />
                              </button>
                            </div>
                          </TableData>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableData colSpan={Thead.length} className="text-center">
                          No blogs found.
                        </TableData>
                      </TableRow>
                    )}
                  </TableBody>
                </CustomTable>

                {totalPages > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lightbox Viewer */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: lightboxImage }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
      />
    </>
  );
};

export default withAuth(AdminBlogsPage);
