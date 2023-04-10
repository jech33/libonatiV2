'use client';
/** Libraries **/
import { useEffect } from 'react';

/** Functional **/
import LogoLibonati from '@components/LogoLibonati';
import MainSection from '@components/MainSection';
import SectionTwo from '@components/SectionTwo';
import Shows from '@components/Shows';
import Navbar from '@components/Navbar';
import ScrollTopButton from '@components/ScrollTopButton';
import Footer from '@components/Footer';
import { useLiboStore } from '@store/liboStore';

export default function Home() {
  const separatorClassnames = `w-6/12 mx-auto border-0 mb-[4.5rem]
  h-[0.25rem] bg-libonatiGold
  lg:hidden`;

  const fetchContentful = useLiboStore((state) => state.fetchContentful);

  useEffect(() => {
    fetchContentful();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar hideHome />
      <main className={`text-libonatiGold`}>
        <ScrollTopButton />
        {/* Logo */}
        <div className="m-auto flex h-[100svh] items-center px-5 md:container">
          <LogoLibonati
            colorstroke="stroke-libonatiGold"
            colorfill="fill-libonatiGold"
            height="70svh"
            width="100%"
          />
        </div>

        {/* Content */}
        <div className="z-10 mb-36 w-full text-libonatiGold">
          {/* Separator on Mobile */}
          <hr className={separatorClassnames} />

          {/* The Band and Swiper Section */}
          <section className="mx-auto flex flex-col md:container lg:flex-row xl:px-10 2xl:px-0">
            <MainSection />
          </section>
        </div>

        {/* Separator on Mobile */}
        <hr className={separatorClassnames} />

        {/* History and Video */}
        <div className="w-full">
          <section className="mx-auto mb-24 flex flex-col items-center md:mb-36 xl:px-10 2xl:px-0">
            <SectionTwo />
          </section>
        </div>

        {/* Separator on Mobile */}
        <hr className={separatorClassnames} />

        {/* Shows */}
        <div className="w-full">
          <section className="mx-auto flex w-full flex-col">
            <Shows />
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
