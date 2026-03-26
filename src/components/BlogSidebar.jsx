import React, { useState } from "react";
import NavLink from "@/components/utilities/NavLink";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "./admin/InputFiels";
import axiosAdmin from "@/login/axiosAdmin";
import axios from "axios";
import WebsiteInputFields from "./WebsiteInputFields";

const BlogSidebar = ({ filtercategories, data, checkCategories, handleCategoryToggle, filter }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        trigger,
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        await axios.post(
            `https://api2.gtftech.com/AjaxHelper/AgentInstantQuerySetter.aspx?qAgentID=4587&qSenderName=${data.name}&qMobileNo=${data.phone}&qQueryMessage=${data.message}&qProjectName=GTF BLOG&qEmailID=${data.email}`,
        );
        toast.success('Form Submitted successfully!');
        reset();
        setIsSubmitting(false);

    };

    const fields = [

        { label: '', name: 'name', placeholder: 'Enter Name', col: 'md:col-span-12 lg:col-span-12' },
        { label: '', name: 'email', placeholder: 'Enter Email', col: 'md:col-span-12 lg:col-span-12', type: 'text' },
        { label: '', name: 'phone', placeholder: 'Enter Phone', col: 'md:col-span-12 lg:col-span-12', type: 'text' },
        { label: '', name: 'message', placeholder: 'Enter Message', col: 'md:col-span-12 lg:col-span-12', type: 'text' },
    ];



    // data is expected to be an array of blogs
    const blogs = data || [];

    return (<>
        <div id="accordion">
            {filter && (
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
                                    {filtercategories && filtercategories.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <input
                                                    type="checkbox"
                                                    id={`cat-${index}`}
                                                    name="categories"
                                                    value={item.id}
                                                    checked={checkCategories ? checkCategories.includes(item.id) : false}
                                                    onChange={() => handleCategoryToggle && handleCategoryToggle(item.id)}
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
            )}

            <div className="gap"></div>

            {blogs.length > 0 && (
                <div id="accordion-popular" role="tablist" aria-multiselectable="true">
                    <div className="card">
                        <div className="card-header" role="tab" id="accordionHeadingTwo">
                            <div className="mb-0 row">
                                <div className="col-12 no-padding accordion-head">
                                    <a data-toggle="collapse" data-parent="#accordion-popular" href="#accordionBodyTwo" aria-expanded="false" aria-controls="accordionBodyTwo"
                                        className="collapsed">
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                        <h5>Popular Posts</h5>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div id="accordionBodyTwo" className="collapse show visible" role="tabpanel" aria-labelledby="accordionHeadingTwo" aria-expanded="false" data-parent="accordion-popular">
                            <div className="card-block col-12">
                                <ul>
                                    {blogs.map((blogitem, index) => (
                                        <li key={index} >
                                            <a className="text-capitalize" href={`/blog/${blogitem.slug}`}>{blogitem.heading}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="gap"></div>
            <div class="form-box">
                <h4>Get in Touch</h4>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="">
                        {fields.map((field) => (
                            <WebsiteInputFields
                                key={field.name}
                                {...field}
                                register={register}
                                placeholder={field.placeholder}
                                error={errors[field.name]}
                            />
                        ))}
                    </div>

                    <button type="submit" class="btn btn-primary" disabled={isSubmitting}> {isSubmitting ? 'Submit...' : 'Submit'}</button>
                </form>

            </div>
        </div>
    </>)
}

export default BlogSidebar;
