
import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Hero from "@/components/Hero";
import Card from "@/components/utilities/Card";
import SearchInput from "@/components/utilities/SearchInput";
import useFullUrl from "@/hooks/useFullUrl";

const CategoryDetails = () => {

  const fullUrl = useFullUrl();


  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const router = useRouter();
  const { category_slug } = router.query;
  const fetchCategory = async () => {
    if (!category_slug) return; // Wait until category is available
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}website/blog-category/${category_slug}`
      );
      setCategory(res?.data?.data || null);
      fetchBlogs(res?.data?.data.id);
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [category_slug, searchTerm]);


  const fetchBlogs = async (category_id) => {

    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}website/blog?category_id=${category_id}&search=${searchTerm}`
      );
      setBlogs(res?.data?.data || null);

    } catch (err) {
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const changeDateFormate = (dateString) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
    return formatted;
  }

  return (
    <>
      <Head>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
        />
      </Head>
      <Hero
        imageSrc="/assets/frontend/images/breadcrumb.jpg"
        mobileSrc="/assets/frontend/images/breadcrumb.jpg"
        title={category.name}
      />
      <div className="box-multiple">
        <section className="blog-platter category_page">



          <div className="container">



            <div className="row">
              <div className="col-md-12">
                <div className="search-box-container mb-4">
                  <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search blogs..."
                  />
                </div>
              </div>
              {blogs && blogs.map((blogitem) => {
                return <div className="col-sm-4"> <Card data={blogitem} key={blogitem.id} catSlug={category.category} /></div>
              })}
            </div>
          </div>

        </section >
      </div>
    </>
  );
};

export default CategoryDetails;
