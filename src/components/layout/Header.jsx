import React, { useEffect, useState } from "react";




const Header = ({ onOpen }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 400) {
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowHeader(true);
        } else {
          // Scrolling down
          setShowHeader(false);
        }
      } else {
        // At top, don't show fixed header
        setShowHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scroll
      document.body.style.overflow = '';
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <div id="mySidenav" className="sidenav">
        <div className="inner-nav">
          <img className="brand-logo" src="images/gtflogo-vector.svg" />

          <div className="inner-menu">

            <div className="sidebar">

              <a href="https://gtftechnologies.com/home/index">HOME</a>

              <a data-toggle="collapse" className="active" href="#whoWeAre" role="button">
                WHO WE ARE
                <span className="arrow">&#8250;</span>
              </a>

              <div className="collapse submenu inner-sub" id="whoWeAre">
                <a href="https://gtftechnologies.com/about-gtf">About Us</a>
                <a href="https://gtftechnologies.com/home/partners_tools">Partners & Tools</a>
              </div>

              <a data-toggle="collapse" href="#howWork">
                HOW WE WORK
                <span className="arrow">&#8250;</span>
              </a>
              <div className="collapse submenu inner-sub" id="howWork">
                <a href="https://gtftechnologies.com/home/SEO_keyword_research">Research</a>
                <a href="https://gtftechnologies.com/home/digital_media_planning">Digital Media Planning</a>
                <a href="https://gtftechnologies.com/home/contentcreative">Concept Content & Creative</a>
                <a href="https://gtftechnologies.com/home/data_analysis_roi">Data Analysis & ROI</a>
              </div>

              <a data-toggle="collapse" href="#services">
                SERVICES
                <span className="arrow">&#8250;</span>
              </a>
              <div className="collapse submenu inner-sub" id="services">
                <a href="https://gtftechnologies.com/brand-strategy.html">Brand Strategy</a>
                <a href="https://gtftechnologies.com/creative.html">Creative</a>
                <a href="https://gtftechnologies.com/communication.html">Communication</a>
                <a href="https://gtftechnologies.com/home/website_design_development">Website Design & Development</a>
                <a href="https://gtftechnologies.com/web-&-mobile-app-testing.html">Web & Mobile App Testing</a>
                <a href="https://gtftechnologies.com/home/website_annual_maintenance">Website’s Annual Maintenance</a>
                <a href="https://gtftechnologies.com/home/search_engine_optimization">Search Engine Optimization</a>
                <a href="https://gtftechnologies.com/home/paid_ads">Google Ads</a>
                <a href="https://gtftechnologies.com/home/display_marketing">Display Marketing</a>
                <a href="https://gtftechnologies.com/home/youtube_marketing">YouTube Marketing</a>
                <a href="https://gtftechnologies.com/home/social_media_optimization">Social Media Optimization</a>
                <a href="https://gtftechnologies.com/home/social_media_marketing">Social Media Marketing</a>
                <a href="https://gtftechnologies.com/home/online_reputation_management_marketing">Online Reputation Management Marketing</a>
              </div>

              <a data-toggle="collapse" href="#work">
                WORK
                <span className="arrow">&#8250;</span>
              </a>


              <div className="collapse submenu inner-sub" id="work">
                <a data-toggle="collapse" href="#portfolioSub">
                  Portfolio
                  <span className="arrow">&#8250;</span>
                </a>

                <div className="collapse submenu inner-sub" id="portfolioSub">
                  <a href="https://gtftechnologies.com/home/websites_landing_pages">Web Design</a>
                  <a href="https://gtftechnologies.com/home/creatives">Creatives</a>
                  <a href="https://gtftechnologies.com/home/logos">logos</a>
                </div>


                <a href="https://gtftechnologies.com/home/case_studies">Case Studies</a>
                <a href="https://gtftechnologies.com/home/clients">Clients</a>
                <a href="https://gtftechnologies.com/home/client_testimonials">Client Testimonials</a>
              </div>

              <a data-toggle="collapse" href="#hr">
                HUMAN RESOURCE
                <span className="arrow">&#8250;</span>
              </a>
              <div className="collapse submenu inner-sub" id="hr">
                <a href="https://gtftechnologies.com/home/work_culture">Work Culture</a>
                <a href="https://gtftechnologies.com/home/work_with_us">Work With Us</a>
                <a href="https://gtftechnologies.com/home/life_at_gtf">Life At GTF Technologies</a>
              </div>

              <a data-toggle="collapse" href="#contact">
                CONTACT
                <span className="arrow">&#8250;</span>
              </a>
              <div className="collapse submenu inner-sub" id="contact">
                <a href="https://gtftechnologies.com/home/request_quote">Request For Quote</a>
                <a href="https://gtftechnologies.com/home/say_hello">Say Hello!</a>
              </div>

            </div>

            <div className="contact_details bottom">


              <div className="tab-content">
                <h5 className="state"><a className="state_url" href="https://www.gtftechnologies.com/delhi-ncr"> Delhi NCR </a></h5>
                <a className="num-call" href="tel:+91-9953917978">+91-9953-91-7978</a>
              </div>

              <div className="tab-content">
                <h5 className="state"><a className="state_url" href="https://www.gtftechnologies.com/mumbai/">Mumbai</a></h5>
                <a className="num-call" href="tel:+91-9582532488">+91-9582-53-2488</a>
              </div>

              <div className="tab-content">
                <h5 className="state"><a className="state_url" href="https://www.gtftechnologies.com/pune">Pune</a></h5>
                <a className="num-call" href="tel:+91-9953605303">+91-9953-60-5303</a>
              </div>

              <div className="tab-content">
                <h5 className="state"><a className="state_url" href="https://www.gtftechnologies.com/bangalore/">Bangalore</a></h5>
                <a className="num-call" href="tel:+91-7838800248">+91-7838-80-0248</a>
              </div>

              <div className="tab-content">
                <h5 className="state"><a className="state_url" href="https://www.gtftechnologies.com/hyderabad/">Hyderabad</a></h5>
                <a className="num-call" href="tel:+91-7838500356">+91-7838-50-0356</a>
              </div>

              <div className="tab-content" id="myTabContent">
                <h5 className="state">Email</h5>
                <a className="num-call" href="mailto:hello@gtftechnologies.com">hello@gtftechnologies.com</a>
              </div>

              <ul className="social_icons inline">
                <li>
                  <a href="https://in.linkedin.com/company/gtftechnologies" className="linkedin-color" target="_blank">in</a>
                </li>
                <li>
                  <a href="https://twitter.com/gtfTechnologies" className="twitter-color" target="_blank">tw</a>
                </li>
                <li>
                  <a href="https://www.facebook.com/Gtftechnologiesindia/" className="facebook-color" target="_blank">fb</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/gtf_technologies/" className="instagram-color" target="_blank">insta</a>
                </li>
                <li>
                  <a href="https://in.pinterest.com/GTFTechnologies/" className="pinterest-color" target="_blank">pi</a>
                </li>
              </ul>

              <ul className="other_links">
                <li>
                  <a href="/home/privacy_policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/sitemap.xml">Sitemap</a>
                </li>
              </ul>
            </div>







          </div>
        </div>

        <div id="mySidenavoff" className="sidenavoff">
          <div className="inner-off">
            <div className="logo">
              <img src="assets/images/gtf-logo.svg" width="100%" />
            </div>
            <div className="mail">
              <span>Make An Enquiry</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
