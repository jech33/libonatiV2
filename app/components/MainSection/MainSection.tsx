import { typography } from '@shared/fonts';
import SwiperHome from './SwiperHome';
import { getContentful } from '@api/contentful/route';

const getMembers = async () => {
  const data = await getContentful({
    pageContentType: 'bandMembers',
  });
  return data;
};

// It should have all text on a json file
const MainSection = async () => {
  const members = (await getMembers()) || [];
  return (
    <>
      <article
        className="flex flex-col pb-8 text-center
          sm:w-12/12 lg:w-6/12
          lg:pr-10 p-3 lg:pb-0 lg:text-left"
      >
        <h1
          className={`${typography.h1} text-center lg:text-left mb-10 lg:mb-5`}
        >
          THE BAND
        </h1>
        <h3 className={`${typography.h3} text-libonatiGrayYellow`}>
          Vestibulum in facilisis lectus. Praesent sit amet urna pulvinar,
          gravida magna commodo, molestie purus. Cras laoreet vitae risus vel...
        </h3>
        <br />
        <p className="text-libonatiGrayYellow">
          Vestibulum in facilisis lectus. Praesent sit amet urna pulvinar,
          gravida magna commodo, molestie purus. Cras laoreet vitae risus vel
          laoreet. Suspendisse dignissim efficitur urna nec elementum. Duis
          faucibus neque ac erat finibus, bibendum ullamcorper quam egestas.
          Quisque non felis ex. Aenean id metus nec quam facilisis vulputate.
          Quisque sem mauris, tempor ac dui eget, fringilla luctus velit. Ut
          dignissim in diam a tincidunt. Curabitur id neque urna. Nulla laoreet
          mi sed neque efficitur ultrices. Suspendisse quis mattis urna, vitae
          pellentesque ex.
        </p>
      </article>
      <figure
        className="flex w-full h-screen max-h-screen min-h-[30rem]
           md:h-full
           lg:w-6/12 lg:border-l-4 lg:border-t-4 lg:border-libonatiGold"
      >
        <div
          className="w-full md:pl-2 md:pt-2 md:mb-2
            flex sm:justify-items-center
            shadow-gray shadow-xl"
        >
          <SwiperHome id="Home" crew={members} />
        </div>
      </figure>
    </>
  );
};

export default MainSection;
