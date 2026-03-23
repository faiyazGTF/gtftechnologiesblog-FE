import Hero from "@/components/Hero";
import BlogCard from "@/components/utilities/BlogCard";
import Container from "@/components/utilities/Container";
import LatestBlog from "@/components/utilities/LatestBlog";
import SearchInput from "@/components/utilities/SearchInput";
import Section from "@/components/utilities/Section";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "https://livinterio.com/"

  const router = useRouter();
  const { slug } = router.query; // 👈 This is how you get the slug from the URL

  const fetchBlog = async () => {
    if (!slug) return; // Wait until slug is available

    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}api/blog/${slug}`
      );
      setBlog(res?.data?.data || null);
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]); // re-run when slug changes

  
  return (
    <>
      <Head>
        <title>{blog?.meta_title || "Liv Interio - Interior Design Excellence"}</title>
        <meta name="description" content={blog?.meta_description || ""} />
        <meta name="keywords" content={blog?.meta_keywords || ""} />
      </Head>
      <Hero
        imageSrc="/assets/images/blogs/desktop/banner.webp"
        mobileSrc="/assets/images/blogs/mobile/banner.webp"
        title="Blog Details"
        parent={{ link: "/blogs", title: "Blogs" }}
      />
      <Section
        id="details"
        className="relative overflow-hidden before:absolute before:bottom-0 before:left-[7.5%] before:w-[85%] before:h-[0.5px] before:bg-[var(--text-primary)]"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[50px]">
            <div className="md:col-span-9">
              {loading ? (
                <p>Loading...</p>
              ) : blog ? (
                <BlogCard data={blog} detailsPage={true} />
              ) : (
                <p>Blog not found.</p>
              )}
            </div>
            <div className="md:col-span-3">
              <LatestBlog />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default BlogDetails;
