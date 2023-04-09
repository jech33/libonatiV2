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
