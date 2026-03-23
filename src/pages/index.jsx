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

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checkCategories, setCheckCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const limit = 4;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const endpoint = searchTerm
        ? `${BASE_URL}website/blog?search=${searchTerm}&categories=${checkCategories.join(",")}`
        : `${BASE_URL}website/blog?page=${page}&limit=${limit}&categories=${checkCategories.join(",")}`;
      const res = await axios.get(endpoint);

      setBlogs(res.data?.data || []);
      setTotalPages(res.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const endpoint = `${BASE_URL}website/blog-category?page=${page}&limit=${limit}`;
      const res = await axios.get(endpoint);
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
      fetchBlogs();
    }, 300); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [page, searchTerm, checkCategories]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) setPage(newPage);
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
            <div className="col-sm-9">

              <div className="row">
                <div className="col-sm-12">
                  <div className="big-box">
                    <h4 className="main-heading">Featured Blog</h4>

                    <div className="inner-big-box">
                      <div className="box">
                        <div className="left">
                          <img src="images/Mask group.png" width="100%" />
                        </div>
                        <div className="right">
                          <div className="content">
                            <span className="catogories">SEO</span>
                            <h5>Real Estate Digital Marketing Agencies in India: Why GTF Technologies is the Choice for Developers? Real Estate Digital Marketing Agencies in India: Why GTF Technologies is the Choice for Developers?</h5>
                            <p><img src="images/check-mark.png" /> july 04, 2022</p>
                            <button className="btn btn-default">View All <img src="images/right-down.png" /> </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="big-box-multiple">
                    <h4 className="main-heading">Digital Marketing</h4>
                    <button className="btn btn-default btn-multi">View All <img src="images/right-down.png" /> </button>
                  </div>

                  <div className="box-multiple">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="inner-smb">
                          <img src="images/blog-small.png" width="100%" />
                          <div className="content">
                            <span className="catogories">Digital Marketing</span>
                            <p className="main-text">Real Estate Digital Marketing Agencies in India: Why GTF Technologies is...</p>
                            <p className="btn-action"><span className="calander"><img src="images/check-mark.png" width="16px;" /> july 04, 2022</span> <span><img src="images/right-ar.png" width="16px;" /> </span> </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>


                </div>
              </div>

            </div>

            <div className="col-sm-3">
              <div className="small-box">
                <div className="search-box-container mb-4">
                  <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search blogs..."
                  />
                </div>

                <div id="accordion" role="tablist" aria-multiselectable="true">

                  <div className="card">
                    <div className="card-header" role="tab" id="accordionHeadingOne">
                      <div className="mb-0 row">
                        <div className="col-12 no-padding accordion-head">
                          <a data-toggle="collapse" data-parent="#accordion" href="#accordionBodyOne" aria-expanded="false" aria-controls="accordionBodyOne"
                            className="collapsed">
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                            <h5>Categories</h5>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div id="accordionBodyOne" className="collapse show visible" role="tabpanel" aria-labelledby="accordionHeadingOne" aria-expanded="false" data-parent="accordion">
                      <div className="card-block col-12">
                        <form >
                          {categories.map((item, index) => {
                            return (
                              <React.Fragment key={index}>
                                <input
                                  type="checkbox"
                                  id={`cat-${index}`}
                                  name="categories"
                                  value={item.id}
                                  checked={checkCategories.includes(item.id)}
                                  onChange={() => handleCategoryToggle(item.id)}
                                />
                                <label htmlFor={`cat-${index}`}> {item.name}</label><br />
                              </React.Fragment>
                            )
                          })}
                        </form>
                      </div>
                    </div>
                  </div>


                </div>

                <div className="gap"></div>

                <div id="accordion" role="tablist" aria-multiselectable="true">

                  <div className="card">
                    <div className="card-header" role="tab" id="accordionHeadingTwo">
                      <div className="mb-0 row">
                        <div className="col-12 no-padding accordion-head">
                          <a data-toggle="collapse" data-parent="#accordion" href="#accordionBodyTwo" aria-expanded="false" aria-controls="accordionBodyTwo"
                            className="collapsed">
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                            <h5>Popular Posts</h5>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div id="accordionBodyTwo" className="collapse show visible" role="tabpanel" aria-labelledby="accordionHeadingTwo" aria-expanded="false" data-parent="accordion">
                      <div className="card-block col-12">
                        <ul>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                          <li><a href="">Real Estate Digital Marketing Agencies Why GTF Technologies is...</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="gap"></div>

                <div className="form-box">
                  <h4>Get in Touch</h4>

                  <form action="/action_page.php">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="name" id="email" />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Email" id="pwd" />
                    </div>

                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Phone" id="pwd" />
                    </div>

                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Enter password" id="pwd" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>

                </div>


              </div>


            </div>
          </div>
        </div>
      </section>



    </>
  );
};

export default Blogs;
