'use client';
/** Functional **/
import SwiperHome from './SwiperHome';
import { useLiboStore } from '@store/liboStore';

// It should have all text on a json file
const MainSection = () => {
  const post = useLiboStore((state) => state.homeSection1);
  return (
    <>
      <article className="text-libonatiGold w-12/12 flex flex-col p-3 pb-8 text-center lg:w-6/12 lg:pb-0 lg:pr-10 lg:text-left">
        <h1 className={`text-heading mb-10 text-center lg:mb-5 lg:text-left`}>
          {post.title.toUpperCase()}
        </h1>
        <h3 className={`text-subheading font-lora text-libonatiGrayYellow`}>
          {post.subtitle}
        </h3>
        <br />
        <p className="text-body1 font-roboto text-libonatiGrayYellow">
          {post.content}
        </p>
      </article>
      <figure className="flex h-screen max-h-screen min-h-[30rem] w-full md:h-full lg:w-6/12 lg:border-l-4 lg:border-t-4 lg:border-libonatiGold">
        <div
          className="shadow-gray flex w-full shadow-xl
            sm:justify-items-center md:mb-2
            md:pl-2 md:pt-2"
        >
          <SwiperHome id="Home" />
        </div>
      </figure>
    </>
  );
};

export default MainSection;
