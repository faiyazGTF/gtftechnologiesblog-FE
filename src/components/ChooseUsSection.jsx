import React from "react";
import Section from "./utilities/Section";
import Container from "./utilities/Container";
import Heading from "./utilities/Heading";
import Image from "next/image";
import Pera from "./utilities/Pera";
import CustomImage from "./utilities/CustomImage";

const data = [
  {
    title: "Comprehensive Turnkey Solutions",
    desc: "Our holistic approach encompasses every facet of interior design—from meticulous space planning and stringent quality control to budget monitoring and bespoke designing.",
  },
  {
    title: " Professional Approach",
    desc: "We adhere to a structured methodology that includes in-depth discussions, precise execution, and iterative improvements based on client feedback. ",
  },
  {
    title: "Bespoke Solutions",
    desc: "Recognizing the uniqueness of each client, we craft tailor-made strategies that align with individual preferences and requirements.",
  },
  {
    title: "Expert Team",
    desc: "Our team of seasoned professionals brings a wealth of industry knowledge and a keen eye for contemporary design trends.",
  },
  {
    title: "Timely Delivery with Transparent Pricing",
    desc: "We are dedicated to delivering projects on schedule, regardless of scale, through disciplined project management.",
  },
];

const ChooseUsSection = () => {
  return (
    <Section
      id="chooseUS"
      className="overflow-hidden bg-[var(--background-secondary)]"
    >
      <Container className="lg:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[50px]">
          <div className="md:col-span-5">
            <Heading animation="fade-up" className="uppercase mb-[50px]">
              Why you should choose us?
            </Heading>
            <div
              data-aos="fade-right"
              className="relative w-full max-w-[500px] h-[350px] lg:h-[475px] 2xl:h-[575px] rounded-[10px] overflow-hidden"
            >
              <CustomImage
                src="/assets/images/choose-us.webp"
                mobileSrc="/assets/images/choose-us-mobile.webp"
                alt="Choose Us"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <ul>
              {data.map((data, index) => (
                <li
                  data-aos="fade-up"
                  key={index}
                  className="border-b border-[var(--text-primary)] pb-[15px] mb-[20px] 2xl:mb-[50px] last:mb-0"
                >
                  <div className="block md:flex justify-between gap-[50px]">
                    <div className="w-full md:w-[55%] flex gap-[10px] 2xl:block">
                      <span className="w-[28px] h-[28px] 2xl:w-[35px] 2xl:h-[35px] rounded-full mb-[15px] flex items-center justify-center bg-[var(--text-primary)] text-white text-[12px] 2xl:text-[14px]">
                        {index + 1}
                      </span>
                      <Heading className="text-[16px] md:!text-[18px] 2xl:!text-[20px] w-[90%]">
                        {data.title}
                      </Heading>
                    </div>
                    <Pera className="w-full md:w-[45%] text-justify !text-[12px] !leading-[20px] font-[300] !text-[#414141]">
                      {data.desc}
                    </Pera>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ChooseUsSection;
