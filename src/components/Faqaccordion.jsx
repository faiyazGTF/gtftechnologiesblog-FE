import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function FAQAccordion({ blog_id }) {
    const [openIndex, setOpenIndex] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBlogFaq = async (id) => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}website/blog-faq?blog_id=${id}`);
            setData(res?.data?.data || []);
        } catch (err) {
            console.error("Failed to fetch blog FAQs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (blog_id) fetchBlogFaq(blog_id);
    }, [blog_id]);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="faq-wrapper text-center py-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (!data.length) return null;

    return (
        <>

            <style>{`
                .faq-wrapper {
                   
                    font-family: 'Segoe UI', sans-serif;
                }

                .faq-item {
                    border-bottom: 1px solid #dee2e6;
                }

                .faq-item:first-child {
                    border-top: 1px solid #dee2e6;
                }

                .faq-btn {
                    width: 100%;
                    background: none;
                    border: none;
                    outline: none;
                    text-align: left;
                    padding: 0px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    gap: 16px;
                }

                .faq-btn:focus {
                    outline: none;
                    box-shadow: none;
                }

                .faq-question {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    line-height: 1.4;
                    margin: 0;
                }

                .faq-icon {
                    flex-shrink: 0;
                    font-size: 1.25rem;
                    color: #1a1a1a;
                    font-weight: 300;
                    line-height: 1;
                    user-select: none;
                    transition: transform 0.25s ease;
                }

                .faq-icon.open {
                    transform: rotate(180deg);
                }

                .faq-body {
                    overflow: hidden;
                    max-height: 0;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    padding: 0 8px;
                }

                .faq-body.open {
                    max-height: 300px;
                    padding-bottom: 20px;
                }

                .faq-answer {
                    font-size: 0.97rem;
                    color: #555;
                    line-height: 1.7;
                    margin: 0;
                }
            `}</style>

            <div className="faq-wrapper">
                <h2 class="text-center mb-4 font-weight-bold">FAQ</h2>
                {data.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div className="faq-item" key={index}>
                            <button
                                className="faq-btn"
                                onClick={() => toggle(index)}
                                aria-expanded={isOpen}
                            >
                                <span className="faq-question">{faq.question}</span>
                                <span className={`faq-icon ${isOpen ? "open" : ""}`}>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                            <div className={`faq-body ${isOpen ? "open" : ""}`}>
                                <p className="faq-answer">{faq.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}