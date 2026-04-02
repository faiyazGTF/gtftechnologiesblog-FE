import Image from "next/image";
import React from "react";
import Heading from "./Heading";
import Link from "next/link";

const Card = ({ data, catSlug }) => {

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

    <Link href={`/${catSlug}/${data.slug}`} className="card-link">
      <div className=" inner-smb ">
        <img src={data.feature_image} width="100%" alt={data.heading} />
        <div className="content">
          <span className="catogories two-line-text mb-0">{data.heading}</span>
          <p className="main-text two-line-text">{data.short_description}</p>
          <p className="btn-action">
            <span className="calander d-flex align-items-center">
              <img src="/assets/frontend/images/check-mark.png" width="16px" alt="check" /> {changeDateFormate(data.date_at)}
            </span>

            <span className="link-arrow"><img src="/assets/frontend/images/right-ar.png" width="16px" alt="arrow" /> </span>

          </p>
        </div>
      </div >
    </Link>

  );
};

export default Card;
