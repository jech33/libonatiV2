/** Functional **/
import LogoLibonati from '@components/LogoLibonati';
import MainSection from '@components/MainSection';
import SectionTwo from '@components/SectionTwo';
import Shows from '@components/Shows';

/** Assets **/
import ScrollTopButton from '@components/ScrollTopButton';
import Footer from '@components/Footer';

export default function Home() {
  const separatorClassnames = `w-6/12 mx-auto border-0 mb-[4.5rem]
  h-[0.25rem] bg-libonatiGold
  lg:hidden`;

  return (
    <main className={`text-libonatiGold z-10`}>
      <ScrollTopButton />
      {/* Logo */}
      <div className="flex m-auto md:container h-[100dvh] items-center px-5">
        <LogoLibonati
          colorstroke="stroke-libonatiGold"
          colorfill="fill-libonatiGold"
          height="70dvh"
          width="100%"
        />
      </div>

      {/* Content */}
      <div className="mb-36 w-full text-libonatiGold z-10">
        {/* Separator on Mobile */}
        <hr className={separatorClassnames} />

        {/* The Band and Swiper Section */}
        <section className="md:container mx-auto flex flex-col lg:flex-row xl:px-10 2xl:px-0">
          {/* @ts-expect-error Async Server Component */}
          <MainSection />
        </section>
      </div>

      {/* Separator on Mobile */}
      <hr className={separatorClassnames} />

      {/* History and Video */}
      <div className="w-full">
        <section className="flex flex-col items-center mx-auto mb-24 md:mb-36 xl:px-10 2xl:px-0">
          <SectionTwo />
        </section>
      </div>

      {/* Separator on Mobile */}
      <hr className={separatorClassnames} />

      {/* Shows */}
      <div className="w-full">
        <section className="flex flex-col mx-auto w-full">
          <Shows />
        </section>
      </div>
      <Footer />
    </main>
  );
}
