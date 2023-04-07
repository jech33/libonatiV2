import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string, // ID of a Compose-compatible space to be used \
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string, // delivery API key for the space \
});

type GetPageParams = {
  pageContentType?: string;
  locale?: string;
};

export async function getContentful(params: GetPageParams) {
  const { pageContentType = '', locale = 'en-US' } = params;
  const query = {
    content_type: pageContentType,
    locale,
  };
  const { items } = await client.getEntries(query);
  const members = transformContentfulMembers(items);
  return members || null;
}

function transformContentfulMembers(members: unknown[]) {
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
