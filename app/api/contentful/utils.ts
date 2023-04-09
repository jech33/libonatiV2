import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export function sanitizeContentfulMembers(members: unknown[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return members.map((member: any) => {
    const { fields } = member;
    return {
      id: fields.id,
      nickname: fields.nickname,
      name: fields.name,
      lastName: fields.lastName,
      mainPhoto: fields.mainPhoto.fields.file.url,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      photos: fields.photos.map((photo: any) => photo.fields.file.url),
      active: fields.active,
    };
  });
}

export function sanitizePosts(posts: unknown[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post: any) => {
    const { fields } = post;
    return {
      ...fields,
      subtitle: documentToPlainTextString(fields.subtitle),
      content: documentToPlainTextString(fields.content),
    };
  });
}

export function sanitizeEvents(events: unknown[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return events.map((event: any) => {
    const { fields } = event;
    return {
      name: fields.name,
      location: `${fields.city}, ${fields.country}`,
      date: new Date(fields.date),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      media: fields.media?.map((photo: any) => photo.fields.file.url) || [],
    };
  });
}
