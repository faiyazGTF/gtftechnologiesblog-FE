"use client";

import Hero from "@/components/Hero";
import Button from "@/components/utilities/Button";
import Container from "@/components/utilities/Container";
import Heading from "@/components/utilities/Heading";
import Pera from "@/components/utilities/Pera";
import Section from "@/components/utilities/Section";
import ContactSection from "@/components/ContactSection";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getProjectImages } from "@/components/utilities/getProjectImages";
import Head from "next/head";
import CustomImage from "@/components/utilities/CustomImage";

const data = [
  {
    title: "parx laureate Cedar",
    desc: "Rooted in nature, rising in style — Cedar Tower redefines modern warmth.",
    location: "sector 108 Noida",
    images: getProjectImages("parx-laureate", 11),
  },
  {
    title: "sunworld arista",
    desc: "Designing joyful spaces where every corner feels like home.",
    location: "sector 168 Noida",
    images: getProjectImages("sunworld-arista", 16),
  },
  {
    title: "ELITE GOLF GREENS",
    desc: "Where soft tones meet timeless elegance — welcome to the Beige House.",
    location: "sector 79 Noida",
    images: getProjectImages("elite-golf-greens", 17),
  },
  {
    title: "IENERGIZER OFFICE",
    location: "sector 60 Noida",
    desc: "Elevating workspaces with smart design and professional elegance.",
    images: getProjectImages("ienergizer-office", 8),
  },
  {
    title: "ATS Happy trails",
    desc: "Crafting personalized spaces that tell your unique story.",
    location: "Noida Extension",
    images: getProjectImages("ats-happy-trails", 10),
  },
  {
    title: "CLEO COUNTY",
    desc: "Elegant living, thoughtfully crafted — interiors that echo Cleo County’s charm.",
    location: "sector 121 Noida",
    images: getProjectImages("cleo-county", 9),
  },
];

const Projects = ({ openModal }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [lightboxImages, setLightboxImages] = useState([]);

  const formatSlidesForLightbox = (images) =>
    images.map((item) => ({
      src: item.src,
      mobileSrc: item.mobileSrc,
      alt: item.alt,
    }));

  return (
    <>
      <Head>
        <title>Liv Interio - Interior Design Excellence</title>
      </Head>
      <Hero
        imageSrc="/assets/images/projects/desktop/banner.webp"
        mobileSrc="/assets/images/projects/mobile/banner.webp"
        title="Our Projects"
      />

      {data.map((item, projectIndex) => (
        <Section
          key={item.title}
          className="project-separator"
        >
          <Container className="lg-w-85 w-2xl-80">
            <div className="grid col-12 md-grid-cols-12 gap-30 md-gap-50">
              <div className="md-col-span-4" data-aos="fade-up-right">
                <Heading className="uppercase mt-0 md-mt-50 text-2xl-24">
                  {item.title}
                </Heading>
                <Pera className="text-14 mb-10 md-mb-20 capitalize">
                  {item.location}
                </Pera>
                <Pera className="text-12 text-2xl-13">
                  {item.desc}
                </Pera>
                <Button
                  href="/project"
                  className="bg-white mt-30 md-mt-50 mt-2xl-70 w-fit block text-primary"
                  onOpen={openModal}
                  button={true}
                >
                  Explore project
                </Button>
              </div>
              <div className="md-col-span-8" data-aos="fade-up-left">
                <div className="w-full h-full">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    className="customSwiper"
                  >
                    {item.images.map((img, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="pb-30 pb-2xl-50"
                        onClick={() => {
                          setLightboxImages(
                            formatSlidesForLightbox(item.images)
                          );
                          setLightboxIndex(idx);
                        }}
                      >
                        <div className="relative w-full h-300 md-h-400 h-2xl-450 rounded-15 overflow-hidden cursor-pointer">
                          <CustomImage
                            src={img.src}
                            mobileSrc={img.mobileSrc}
                            alt={img.alt}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={lightboxImages}
        index={lightboxIndex}
      />

      <ContactSection onOpen={openModal} />
    </>
  );
};

export default Projects;
