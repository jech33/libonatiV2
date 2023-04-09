'use client';
import { useLiboStore } from '@store/liboStore';

const SectionTwo = () => {
  const post = useLiboStore((state) => state.homeSection2);
  return (
    <div className="flex flex-col-reverse border-libonatiGold text-center md:container lg:flex-row">
      <div
        className="h-screen
          min-h-[30rem] w-full md:h-[30rem] md:p-2 lg:w-6/12
          lg:border-r-4 lg:border-t-4 lg:border-libonatiGold"
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${post.youtubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <article
        className="flex w-full
          flex-col px-8
          py-3 pb-8 text-center md:px-3
          lg:w-6/12 lg:pb-0
          lg:pl-10 lg:text-left"
      >
        <h1
          className={`text-heading text-libonatiGold mb-10 text-center lg:mb-5 lg:text-right`}
        >
          {post.title.toUpperCase()}
        </h1>
        <h3
          className={`text-subheading font-lora text-center text-libonatiGrayYellow lg:text-right`}
        >
          {post.subtitle}
        </h3>
        <br />
        <p
          className={`text-body1 font-roboto text-center text-libonatiGrayYellow lg:text-right`}
        >
          {post.content}
        </p>
      </article>
    </div>
  );
};

export default SectionTwo;
