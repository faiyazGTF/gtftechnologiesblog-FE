import React from "react";
import Section from "../utilities/Section";
import Container from "../utilities/Container";
import Link from "next/link";
import Image from "next/image";
import Pera from "../utilities/Pera";
import Heading from "../utilities/Heading";



const contactLink = [
  {
    link: "https://maps.app.goo.gl/MeK96x28vzsG7FHL9",
    target: "_blank",
    label: "Noida (Delhi NCR)",
    address: "3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301",
    icon: "/assets/icons/location.webp",
    mobile: "(+91) 9953 917 978",
    tel: ":+919953917978",
    area: "blue_area",
    alt: "Location",
  },
  {
    link: "https://maps.app.goo.gl/MeK96x28vzsG7FHL9",
    target: "_blank",
    label: "Gurgaon (Delhi NCR)",
    address: "715-713 DLF Galleria Towers, DLF Phase- IV, Gurugram, Haryana, India- 122001",
    icon: "/assets/icons/location.webp",
    mobile: "(+91) 9953 917 978",
    tel: ":+919953917978",
    area: "yellow_area",

    alt: "Location",
  },
  {
    link: "https://maps.app.goo.gl/MeK96x28vzsG7FHL9",
    target: "_blank",
    label: "Mumbai",
    address: "Teloz spaces Techniplex 2, 3rd Floor, SV Road, Malad West, Mumbai. 400104",
    icon: "/assets/icons/location.webp",
    mobile: "(+91) 9582 53 2488",
    tel: "+919582532488",
    area: "pink_area",

    alt: "Location",
  },
  {
    link: "https://maps.app.goo.gl/MeK96x28vzsG7FHL9",
    target: "_blank",
    label: "Pune",
    address: "9th floor office no. 11.16 Sadanand Business centre (SBC), Pashan Hwy Side Rd, Baner, Pune, Maharashtra 411045",
    icon: "/assets/icons/location.webp",
    mobile: "(+91) 9953 60 5303",
    tel: "+919953605303",
    alt: "Location",
    area: "black_area",

  },
  {
    link: "https://maps.app.goo.gl/MeK96x28vzsG7FHL9",
    target: "_blank",
    label: "Bangalore",
    address: "91 Springboard indiranagar, George Thangaiah Complex, 4th Floor, Kalyan Nagar, Indira Nagar 1st Stage, Bengaluru, Karnataka 560038",
    icon: "/assets/icons/location.webp",
    mobile: "(+91) 7838 800 248",
    tel: "+917838800248",
    alt: "Location",
    area: "green_area",

  },
  {
    link: "https://maps.app.goo.gl/MeK96x28vzsG7FHL9",
    target: "_blank",
    label: "Hyderabad",
    address: "Awfis Vasavi MPM Ameerpet. 4th Floor, Vasavi MPM Grand, Ameerpet, Yella Reddy Guda, Hyderabad, Telangana 500073",
    icon: "/assets/icons/location.webp",
    mobile: "(+91) 7838 500 356",
    tel: "+917838500356",
    alt: "Location",
    area: "red_area",
  }
];


const Footer = () => {
  return (
    <Section as="footer">

      <div className="fixed_footer homepage">
        <footer className="footer pt_80 pt_sm_40 custom_section">
          <div className="container">
            <h2 className="footer_title">Let's Have a <span>Conversation!</span></h2>

            <div className="row mx_-60 mx_sm_-15 an_row ">

              <div className="col-md-8 px_60 px_sm_15 left_col order-md-1 fadeUp">

                <ul className="contact_addresses">
                  {contactLink.map((item, index) => (
                    <li key={index}>
                      <div className="single">
                        <h3 className={`title ${item.area}`}>{item.label}</h3>
                        <p>{item.address}</p>
                        <a href={`tel:${item.tel}`}>
                          <span className="icon">
                            <img src="assets/frontend/images/mobile.svg" alt="call-icon" />
                          </span>
                          ${item.mobile}
                        </a>
                      </div>
                    </li>
                  ))}


                </ul>


              </div>

              <div className="col-md-4 px_60 px_sm_15 right_col fadeUp">
                <div className="map">
                  <img src="/assets/frontend/images/map.svg" alt="gtf-technologies map image" className="img-fluid" />
                </div>

              </div>

            </div>

            <div className="footer_bottom fadeUp delay_03">
              <div className="logo d-flex justify-content-center align-items-center">
                <span><img src="assets/images/gtflogo-vector.svg" alt="gtf technologies logo" className="img-fluid" /></span>
                <span><img src="assets/frontend/images/google-partner.png" alt="gtf technologies logo" className="img-fluid" /></span>
                <span><img src="assets/frontend/images/global-partner.png" alt="gtf technologies logo" className="img-fluid" /></span>
              </div>

              <div className="right_content">
                <ul>
                  <li>
                    <a href="tel:+91-9958871603">
                      <img src="assets/frontend/images/smartphone.png" alt="gtf technologies icon" className="img-fluid" />
                      +91-9958-87-1603
                    </a>
                  </li>


                  <li>
                    <a href="mailto:hello@gtftechnologies.com">
                      <img src="assets/frontend/images/envelope-dark.png" alt="gtf technologies icon" className="img-fluid" />
                      hello@gtftechnologies.com
                    </a>
                  </li>

                  <li>
                    <a href="https://www.gtftechnologies.com/" target="_blank">
                      © <span className="currentYr">2026</span> GTF Technologies
                    </a>
                  </li>

                  <li>
                    <a href="https://gtftechnologies.com/privacy-policy.html" target="_blank">
                      Privacy Policy
                    </a>
                  </li>
                </ul>


              </div>
            </div>

          </div>
        </footer>

      </div>


      <div className="right_sidearea">
        <div className="btns btn_scrolled" top_pos="0">
          <button className="btn fb_btn" btn_at="fb_data" type="button">
            <span className="icon">
              <img src="assets/frontend/images/fb.png" alt="gtf technologies social icon" className="img-fluid social_icon" />
              <img src="assets/frontend/images/arrow.png" alt="gtf technologies social icon" className="img-fluid back_icon" />
            </span>
            <span className="text">
              Facebook
            </span>
          </button>

          <button className="btn pint_btn" btn_at="pt_data" type="button">
            <span className="icon">
              <img src="assets/frontend/images/pinterest.png" alt="gtf technologies social icon" className="img-fluid social_icon" />
              <img src="assets/frontend/images/arrow.png" alt="gtf technologies social icon" className="img-fluid back_icon" />
            </span>
            <span className="text">
              Pinterest
            </span>
          </button>

          <a className="btn linkedin_btn" btn_at="linkedin_data" href="https://in.linkedin.com/company/gtftechnologies" target="_blank">
            <span className="icon">
              <img src="assets/frontend/images/linkedin.png" alt="gtf technologies social icon" className="img-fluid social_icon" />
              <img src="assets/frontend/images/arrow.png" alt="gtf technologies social icon" className="img-fluid back_icon" />
            </span>
            <span className="text">
              Linkedin
            </span>
          </a>

          <a className="btn instagram_btn" btn_at="instagram_data" href="https://www.instagram.com/gtf_technologies/" target="_blank">
            <span className="icon">
              <img src="assets/frontend/images/instagram1.png" alt="gtf technologies social icon" className="img-fluid social_icon" />

            </span>
            <span className="text">
              Instagram
            </span>
          </a>

          <a className="btn youtube_btn" btn_at="youtube_data" href="https://www.youtube.com/@GTFTECHNOLOGIES" target="_blank">
            <span className="icon">
              <img src="assets/frontend/images/youtube.png" alt="gtf technologies social icon" className="img-fluid social_icon" />
            </span>
            <span className="text">
              Youtube
            </span>
          </a>

        </div>



      </div>

    </Section>
  );
};

export default Footer;
