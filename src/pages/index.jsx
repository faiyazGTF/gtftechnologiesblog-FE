import Hero from "@/components/Hero";
import BlogCard from "@/components/utilities/BlogCard";
import Container from "@/components/utilities/Container";
import LatestBlog from "@/components/utilities/LatestBlog";
import Pagination from "@/components/utilities/Pagination";
import SearchInput from "@/components/utilities/SearchInput";
import Section from "@/components/utilities/Section";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavLink from "@/components/utilities/NavLink";
import Link from "next/link";
import Card from "@/components/utilities/Card";
import BlogSidebar from "@/components/BlogSidebar";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filtercategories, setFiltercategories] = useState([]);

  const [checkCategories, setCheckCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const limit = 20;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


  const fetchCategories = async () => {
    try {
      setLoading(true);
      const endpoint = `${BASE_URL}website/blog-category?page=${page}&limit=${limit}&ids=${checkCategories.join(",")}`;
      const res = await axios.get(endpoint);
      if (filtercategories.length <= 0) {
        setFiltercategories(res.data?.data || []);
      }
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleCategoryToggle = (id) => {
    setCheckCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCategories();
      fetchBlogs();
    }, 300); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [page, searchTerm, checkCategories]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) setPage(newPage);
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
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const endpoint = searchTerm
        ? `${BASE_URL}website/blog?search=${searchTerm}}`
        : `${BASE_URL}website/blog?page=${page}&limit=${limit}`;
      const res = await axios.get(endpoint);

      setBlogs(res.data?.data || []);
      setTotalPages(res.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title> GTF Technologies: Leading Real Estate Digital Marketing Agency </title>
        <meta name="keywords" content="real estate digital marketing agency, digital marketing agency for real estate, marketing agency for real estate, real estate marketing agency, digital marketing services for real estate" />
        <meta name="description" content="GTF Technologies is a leading real estate digital marketing agency in India offering PPC, SEO, branding & website development tailored for real estate brands and developers." />
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
        title="Blogs"
      />


      <section className="blog-platter">

        <div className="container">

          <div className="row">
            <div className="col-sm-9 listing_itemcard_container">

              {categories && categories.map((cat) => {
                if (cat.blogs.length > 0) {
                  return (<>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="big-box-multiple">
                          <h4 className="main-heading">{cat.name}</h4>
                          {
                            cat.blogs.length >= 3 && (
                              <Link href={`/blog/category/${cat.slug}`}><button className="btn btn-default btn-multi arrow_button">View All <img src="assets/frontend/images/right-down.png" /> </button></Link>
                            )
                          }
                        </div>

                        <div className="box-multiple">
                          <div className="row">
                            {cat.blogs && cat.blogs.map((blogitem) => {
                              return <div className="col-sm-4"> <Card data={blogitem} key={blogitem.id} /></div>
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>)
                }
              })}


            </div>

            <div className="col-sm-3">
              <div className="small-box">
                <BlogSidebar
                  filtercategories={filtercategories}
                  data={blogs}
                  checkCategories={[]}
                  handleCategoryToggle={handleCategoryToggle}
                  filter={false}
                />
              </div>


            </div>
          </div>
        </div>
      </section>



    </>
  );
};

export default Blogs;
