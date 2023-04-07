'use client';

/** Libraries **/
import Image from 'next/image';
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper';
// import Swiper and modules styles

/** Functional **/
import { ContentfulMember } from '@shared/types/contentful';
import { typography } from '@shared/fonts';

export default function SwiperHome({
  id,
  crew,
}: {
  id: string;
  crew: ContentfulMember[];
}) {
  const orderedCrew = crew.sort((a, b) => {
    if (a.nickname < b.nickname) {
      return -1;
    }
    if (a.nickname > b.nickname) {
      return 1;
    }
    return 0;
  });
  return (
    <>
      <Swiper
        id={id}
        className="w-full h-full [&>*]:text-libonatiGold [&>.swiper-pagination>*]:bg-libonatiGold [&>.swiper-pagination>*]:shadow-2xl"
        // install Swiper modules
        modules={[Navigation, FreeMode, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        freeMode
        loop
        navigation
        pagination={{ clickable: true }}
      >
        {orderedCrew.map((crewMate) => (
          <SwiperSlide
            key={crewMate.nickname}
            className="[&>.swiper-button-next]:text-libonatiGold"
          >
            <div
              className="absolute px-20 py-10
            h-screen w-full lg:h-full lg:w-full
            bg-gradient-to-t from-black opacity-90"
            />
            <div
              className="relative flex flex-col justify-end py-10
            h-full w-full lg:h-full lg:w-full
            text-libonatiGold text-center"
            >
              <Image
                alt={`${crewMate.nickname} photo`}
                src={`https:${crewMate.mainPhoto}?fit=fill&fm=webp&f=face&w=1000&h=1080`}
                className={`object-cover`}
                fill
                priority
                quality={80}
              />
              <h2
                className={`${typography.h2} 
                bg-black bg-opacity-70 backdrop-blur 
                w-2/6 p-2 mx-auto z-[1]`}
              >
                {crewMate.nickname.toUpperCase()}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
