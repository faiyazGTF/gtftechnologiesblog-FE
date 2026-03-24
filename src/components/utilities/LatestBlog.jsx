import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Link from "next/link";
import axios from "axios";

const LatestBlog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}website/blog`);
        setLatestBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <>
      <Heading animation="fade-up" className="!text-black !text-left">
        Latest Blogs
      </Heading>
      <ul className="mt-[20px]">
        {latestBlogs.map((data, index) => (
          <li
            data-aos="fade-up"
            key={data.slug || index}
            className="pb-[10px] mb-[20px] border-b border-[var(--text-primary)]"
          >
            <Link
              href={`/blog/${data.slug}`}
              className="text-[var(--text-primary)] !text-[13px]"
            >
              {data.heading}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LatestBlog;
