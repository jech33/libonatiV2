/** Libraries **/
import { createClient } from 'contentful';

/** Functional **/
import {
  sanitizeContentfulMembers,
  sanitizeEvents,
  sanitizePosts,
  sanitizeRelease,
} from './utils';
import { ContentfulRelease } from '@shared/types/contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string, // ID of a Compose-compatible space to be used \
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string, // delivery API key for the space \
});

type GetPageParams = {
  pageContentType?: string;
  locale?: string;
  order?: string;
  limit?: number;
  skip?: number;
  [attribute: string]: string | number | undefined;
};

export async function getContentful(params: GetPageParams) {
  const { pageContentType = '', locale = 'en-US', ...options } = params;
  const query = {
    ...options,
    content_type: pageContentType,
    locale,
  };
  const { items } = await client.getEntries(query);
  return items;
}

export const getPosts = async () => {
  try {
    const data = await getContentful({
      pageContentType: 'post',
    });
    const posts = sanitizePosts(data);
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMembers = async () => {
  try {
    const data = await getContentful({
      pageContentType: 'bandMembers',
    });
    const members = sanitizeContentfulMembers(data);
    return members;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEvents = async () => {
  try {
    const data = await getContentful({
      pageContentType: 'events',
      limit: 10,
      order: '-fields.date',
    });
    const events = sanitizeEvents(data);
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRelease = async (id: string) => {
  try {
    const data = await getContentful({
      pageContentType: 'releases',
      limit: 1,
      order: '-fields.releaseDate',
      'fields.id': id,
    });
    const release = sanitizeRelease(data[0]);
    return release as ContentfulRelease;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLatestRelease = async () => {
  try {
    const data = await getContentful({
      pageContentType: 'releases',
      order: '-fields.releaseDate',
    });
    const latestRelease = sanitizeRelease(data[0]);
    return latestRelease as ContentfulRelease;
  } catch (error) {
    console.error(error);
    return null;
  }
};
