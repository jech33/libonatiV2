'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import SpotifyWidget from '@components/SpotifyWidget';
import flagImage from '@images/Flag-Mockup.png';
import { useLiboStore } from '@store/liboStore';

const Shows = () => {
  const events = useLiboStore((state) => state.events);

  const [eventsConverted, setEventsConverted] = useState<any[]>([]);

  const convertShows = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const year = { year: 'numeric' };

    const formattedEvents = events.map((event: any) => {
      event.year = event.date.toLocaleDateString('en-US', year);
      event.date = event.date.toLocaleDateString('en-US', options); // Saturday, September 17, 2016
      return event;
    });
    setEventsConverted(formattedEvents);
  };

  useEffect(() => {
    convertShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-scroll bg-cover bg-no-repeat bg-center
      lg:bg-fixed"
      style={{
        backgroundImage: `url(${flagImage.src})`,
      }}
    >
      <div className="flex flex-col container mx-auto mt-20 px-10 2xl:px-0 items-center z-10">
        <div
          className="w-full lg:max-w-[70rem]
      flex flex-col items-center
      py-10 px-10 mb-20
      bg-libonatiDarkBlack/80 rounded-xl backdrop-blur-xl"
        >
          <h1 className={`text-heading text-libonatiWhiteFont mb-7`}>
            LIVE SHOWS
          </h1>
          <hr className="border-libonatiGrayYellow w-full" />
          {eventsConverted.map((event: any, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row w-full lg:max-w-[70rem]
            py-3 sm:px-4
            border-b-[0.065rem] border-libonatiGrayYellow"
            >
              <div className="px-2 md:w-3/12 lg:w-2/12">
                {event.date.toString()}
                <br />
                {event.year.toString()}
              </div>
              <div className="px-2 md:w-8/12 lg:w-9/12 text-libonatiWhiteFont">
                {event.name}
              </div>
              <div className="px-2 md:w-3/12 lg:w-3/12">{event.location}</div>
            </div>
          ))}
        </div>

        {/* Spotify */}
        <div
          className="w-full z-10 mx-auto mb-20
        lg:max-w-[70rem]"
        >
          <SpotifyWidget />
        </div>
      </div>
    </div>
  );
};

export default Shows;
