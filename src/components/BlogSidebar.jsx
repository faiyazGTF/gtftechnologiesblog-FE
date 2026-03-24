import React from "react";
import NavLink from "@/components/utilities/NavLink";

const BlogSidebar = ({ filtercategories, data, checkCategories, handleCategoryToggle, filter }) => {
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
        </div>
    </>)
}

export default BlogSidebar;
