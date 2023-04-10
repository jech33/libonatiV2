'use client';

/** Libraries **/
import Image from 'next/image';
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper';

/** Functional **/
import { useLiboStore } from '@store/liboStore';

export default function SwiperHome({ id }: { id: string }) {
  const crew = useLiboStore((state) => state.bandMembers);
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
        className="user-select-none h-full w-full [&>*]:text-libonatiGold [&>.swiper-pagination>*]:bg-libonatiGold [&>.swiper-pagination>*]:shadow-2xl"
        // install Swiper modules
        modules={[Navigation, FreeMode, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        navigation
        pagination={{ clickable: true }}
      >
        {orderedCrew.map((crewMate) => (
          <SwiperSlide
            key={crewMate.nickname}
            className="[&>.swiper-button-next]:text-libonatiGold"
          >
            <div className="absolute h-screen w-full bg-gradient-to-t from-black px-20 py-10 opacity-90 lg:h-full lg:w-full" />
            <div className="relative flex h-full w-full flex-col justify-end py-10 text-center text-libonatiGold lg:h-full lg:w-full">
              <Image
                alt={`${crewMate.nickname} photo`}
                src={crewMate.mainPhoto}
                className={`object-cover`}
                fill
                priority
                quality={80}
              />
              <h2
                className={`user-select-none z-[1] mx-auto
                min-w-[25%] bg-black bg-opacity-70 p-2 px-5
                font-montserrat text-3xl text-libonatiGold backdrop-blur hover:cursor-default`}
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
