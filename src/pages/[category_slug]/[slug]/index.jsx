
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/components/utilities/Card";
import BlogSidebar from "@/components/BlogSidebar";
import FAQAccordion from "@/components/Faqaccordion";
import BlogCategorySlider from "@/components/utilities/BlogCategorySlider";


const BlogDetails = () => {
    const sectionRef = useRef(null); // ← add this

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

            </Head>

            <section className="blog-platter" ref={sectionRef}>

                <div className="container">
                    {!loading && (
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
                                                    <img src={blog?.feature_image} width="100%" alt={blog?.heading || "Blog image"} />
                                                </div>

                                                <div dangerouslySetInnerHTML={{ __html: blog?.description }} />

                                                {
                                                    blog?.toc && blog?.toc.length > 0 && (
                                                        <>
                                                            <div className="inner-d-box">
                                                                <h5>Table of Contents</h5>
                                                                <ul className="toc-list">
                                                                    {blog?.toc?.map((item, index) => (
                                                                        <li key={index}><a href={`#${item.slug}`}>{item.toc_heading}</a></li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            {blog?.toc?.map((item, index) => (
                                                                <>
                                                                    <div id={item.slug}>
                                                                        <h4 className="main-heading">{item.title}</h4>
                                                                        <p className="para-details" dangerouslySetInnerHTML={{ __html: item?.description }} />

                                                                    </div>
                                                                </>
                                                            ))}
                                                        </>
                                                    )
                                                }




                                            </div>


                                            <FAQAccordion blog_id={blog?.id} />


                                            <div className="big-box-multiple">
                                                <h4 className="main-heading">{blog?.category?.name}</h4>
                                                <Link href={`/category/${blog?.category?.slug}`}><button className="btn btn-default btn-multi arrow_button">View All <img src="/assets/frontend/images/right-down.png" /> </button></Link>
                                            </div>




                                            <BlogCategorySlider data={categoryBlogs} catSlug={blog?.category?.slug} />






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
                                        sectionRef={sectionRef}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section >
        </>
    );
};

export default BlogDetails;
