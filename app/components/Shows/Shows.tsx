'use client';
import SpotifyWidget from '@components/SpotifyWidget';
import flagImage from '@images/Flag-Mockup.png';
import { useLiboStore } from '@store/liboStore';

const Shows = () => {
  const events = useLiboStore((state) => state.events);
  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  } as const;
  const yearOptions = { year: 'numeric' } as const;

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-cover bg-scroll bg-center bg-no-repeat
      lg:bg-fixed"
      style={{
        backgroundImage: `url(${flagImage.src})`,
      }}
    >
      <div className="container z-10 mx-auto mt-20 flex flex-col items-center px-10 2xl:px-0">
        <div className="mb-20 flex w-full flex-col items-center rounded-xl bg-libonatiDarkBlack/80 px-10 py-10 backdrop-blur-xl lg:max-w-[70rem]">
          <h1 className="mb-7 text-heading text-libonatiWhiteFont">
            LIVE SHOWS
          </h1>
          <hr className="w-full border-libonatiGrayYellow" />
          {events.length &&
            events.map((event, idx) => (
              <div
                key={idx}
                className="flex w-full flex-col border-b-[0.065rem] border-libonatiGrayYellow py-3 sm:px-4 md:flex-row lg:max-w-[70rem]"
              >
                <div className="px-2 md:w-3/12 lg:w-2/12">
                  {event.date.toLocaleDateString('en-US', yearOptions)}
                  <br />
                  {event.date.toLocaleDateString('en-US', dateOptions)}
                </div>
                <div className="px-2 text-libonatiWhiteFont md:w-8/12 lg:w-9/12">
                  {event.name}
                </div>
                <div className="px-2 md:w-3/12 lg:w-3/12">{event.location}</div>
              </div>
            ))}
        </div>

        {/* Spotify */}
        <div className="z-10 mx-auto mb-20 w-full lg:max-w-[70rem]">
          <SpotifyWidget />
        </div>
      </div>
    </div>
  );
};

export default Shows;
