export type ContentfulMember = {
  id: string;
  nickname: string;
  name: string;
  lastName: string;
  mainPhoto: string;
  photos: string[];
  active: boolean;
};

export type ContentfulEvent = {
  name: string;
  location: string;
  date: Date;
  media: string[];
};

export type ContentfulRelease = {
  id: string;
  name: string;
  image: string;
  releaseDate: string;
  active: string;

  // Platforms
  links: {
    amazonMusic: string;
    apple: string;
    deezer: string;
    instagram: string;
    soundcloud: string;
    spotify: string;
    tidal: string;
    tiktok: string;
    youtube: string;
  };
};
