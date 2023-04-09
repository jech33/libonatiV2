/** Libraries **/
import { create } from 'zustand';

/** Functional **/
import { getEvents, getMembers, getPosts } from '@api/contentful/route';
import { ContentfulMember, ContentfulEvent } from '@shared/types/contentful';

export type LiboStoreState = {
  homeSection1: {
    title: string;
    subtitle: string;
    content: string;
  };
  homeSection2: {
    title: string;
    subtitle: string;
    content: string;
    youtubeId: string;
  };
  bandMembers: ContentfulMember[];
  events: ContentfulEvent[];
  fetchContentful: () => Promise<void>;
};

export const useLiboStore = create<LiboStoreState>((set) => ({
  homeSection1: {
    title: 'The Band',
    subtitle: '',
    content: '',
  },
  homeSection2: {
    title: 'History',
    subtitle: '',
    content: '',
    youtubeId: '',
  },
  events: [],
  bandMembers: [],
  fetchContentful: async () => {
    const bandMembers = await getMembers();
    const posts = await getPosts();
    const events = await getEvents();
    const homeSection1 = posts.find((post) => post.slug === 'the-band');
    const homeSection2 = posts.find((post) => post.slug === 'history');
    set({
      homeSection1,
      homeSection2,
      bandMembers,
      events,
    });
  },
}));
