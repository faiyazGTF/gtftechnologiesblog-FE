
import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/utilities/Card";
import BlogSidebar from "@/components/BlogSidebar";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [filtercategories, setFiltercategories] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [tocDescription, setTocDescription] = useState('');


  const router = useRouter();
  const { slug } = router.query;
  const fetchBlog = async () => {
    if (!slug) return; // Wait until slug is available

    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}website/blog/${slug}`
      );
      setBlog(res?.data?.data || null);
      fetchCategoryBlogs(res?.data?.data?.category?.id);


    } catch (err) {
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchCategories();
    fetchPopularBlogs();
  }, [slug]); // re-run when slug changes

  useEffect(() => {
    if (typeof window !== "undefined" && categoryBlogs.length > 0) {
      const initOwl = async () => {
        const $ = (await import("jquery")).default;

        // Polyfill for $.camelCase if it's missing (required by some versions of Owl Carousel)
        if (!$.camelCase) {
          $.camelCase = function (string) {
            return string.replace(/-([a-z])/g, function (all, letter) {
              return letter.toUpperCase();
            });
          };
        }

        // Polyfill for $.type if it's missing (required by some versions of Owl Carousel)
        if (!$.type) {
          $.type = function (obj) {
            return obj == null ? String(obj) : Object.prototype.toString.call(obj).replace(/^\[object\s(.*)\]$/, "$1").toLowerCase();
          };
        }

        window.jQuery = $;
        window.$ = $;
        await import("owl.carousel");

        const $owl = $(".owl-carousel1");
        if ($owl.length > 0) {
          // Destroy existing instance if any
          if ($owl.data("owl.carousel")) {
            $owl.owlCarousel("destroy");
          }

          $owl.owlCarousel({
            loop: true,
            margin: 30,
            video: true,
            nav: true,
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
              0: { items: 1 },
              480: { items: 1 },
              560: { items: 1 },
              760: { items: 1 },
              990: { items: 3 },
              1200: { items: 3 },
              1500: { items: 3 }
            }
          });
        }
      };
      initOwl();
    }
  }, [categoryBlogs]); // Re-init when categoryBlogs data is loaded

  const changeDateFormate = (dateString) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
    return formatted;
  }


  const fetchCategoryBlogs = async (id) => {
    try {
      setLoading(true);
      const endpoint = `${BASE_URL}website/blog?categories=${id}`;
      const res = await axios.get(endpoint);
      setCategoryBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}website/blog-category?limit=100`);
      setFiltercategories(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}website/blog?limit=5`);
      setPopularBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch popular blogs:", err);
    }
  };

  const handleCategoryToggle = (id) => {
    // On details page, toggling a category should probably redirect to the blog list with that filter
    router.push(`/blog?categories=${id}`);
  };

  return (
    <>
      <Head>
        <title>{blog?.meta_title || "GTF Technologies: Leading Real Estate Digital Marketing Agency"}</title>
        <meta name="description" content={blog?.meta_description || ""} />
        <meta name="keywords" content={blog?.meta_keywords || ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
        />
      </Head>

      <section className="blog-platter">

        <div className="container">
          <div className="row">
            <div className="col-sm-9">

              <div className="row">
                <div className="col-sm-12">
                  <div className="big-box">


                    <div className="details-blog">
                      <h4 className="main-heading">{blog?.heading}</h4>

                      <ul className="inline-details">
                        <li>
                          <span className="catogories-det">{blog?.category?.name}</span>
                        </li>
                        <li>
                          <p><span>published:</span> {changeDateFormate(blog?.date_at)}</p>
                        </li>
                        {/* <li>
                          <p><span>updated on:</span> Aug 12, 2022</p>
                        </li> */}
                      </ul>

                      <div className="img-box">
                        <img src={blog?.feature_image} width="100%" />
                      </div>

                      <div dangerouslySetInnerHTML={{ __html: blog?.description }} />

                      {
                        blog?.toc && blog?.toc.length > 0 && (
                          <>
                            <div class="inner-d-box">
                              <h5>Table of Contents</h5>
                              <ul className="toc-list">
                                {blog?.toc?.map((item, index) => (
                                  <li key={index}>{item.toc_heading}</li>
                                ))}
                              </ul>
                            </div>
                            {blog?.toc?.map((item, index) => (
                              <>
                                <h4 class="main-heading">{item.title}</h4>
                                <p class="para-details" dangerouslySetInnerHTML={{ __html: blog?.description }} />



                              </>
                            ))}
                          </>
                        )
                      }




                    </div>

                    <br /><br />

                    <div className="big-box-multiple">
                      <h4 className="main-heading">{blog?.category?.name}</h4>
                      <Link href={`/category/${blog?.category?.slug}`}><button className="btn btn-default btn-multi arrow_button">View All <img src="/assets/frontend/images/right-down.png" /> </button></Link>
                    </div>

                    {categoryBlogs && categoryBlogs.length > 0 && (
                      <div className="inner-sec-owl box-multiple">
                        <div className="owl-carousel1 owl-carousel owl-theme box-multiple">
                          {categoryBlogs.map((item, index) => (
                            <div className="item" key={index}>
                              <div className="box drop-shad">
                                <Card data={item} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}






                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="small-box">
                <BlogSidebar
                  filtercategories={filtercategories}
                  data={popularBlogs}
                  checkCategories={[]}
                  handleCategoryToggle={handleCategoryToggle}
                  filter={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default BlogDetails;
