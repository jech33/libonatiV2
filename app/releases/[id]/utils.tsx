/** Assets **/
import {
  AmazonLogo,
  AppleLogo,
  FacebookLogo,
  InstagramLogo,
  LinkSimpleHorizontal,
  SoundcloudLogo,
  SpotifyLogo,
  TidalLogo,
  TiktokLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
/** Functional **/
import { splitCamelCase } from '@shared/functions';
import { ContentfulRelease } from '@shared/types/contentful';

export const formatReleaseLinks = (links: ContentfulRelease['links']) => {
  const formattedLinks = Object.keys(links).map((link) => {
    const linkName = link;
    const linksComponents = {
      spotify: {
        iconComponent: SpotifyLogo,
        iconClassName: 'text-green-500 group-hover:text-black',
        className: 'hover:bg-green-500 hover:text-black',
      },
      youtube: {
        iconComponent: YoutubeLogo,
        iconClassName: 'text-red-500 group-hover:text-white',
        className: 'hover:bg-red-500 hover:text-white',
      },
      apple: {
        iconComponent: AppleLogo,
        iconClassName: '',
        className: 'hover:bg-gray-700',
      },
      tiktok: {
        iconComponent: TiktokLogo,
        iconClassName: 'group-hover:text-white',
        className: 'hover:bg-purple-800',
      },
      amazonMusic: {
        iconComponent: AmazonLogo,
        iconClassName: 'group-hover:text-white',
        className: 'hover:bg-blue-600',
      },
      tidal: {
        iconComponent: TidalLogo,
        iconClassName: '',
        className: '',
      },
      soundcloud: {
        iconComponent: SoundcloudLogo,
        iconClassName: 'text-orange-500 group-hover:text-white',
        className: 'text-orange-500 group-hover:text-white',
      },
      facebook: {
        iconComponent: FacebookLogo,
        iconClassName: 'text-blue-700 group-hover:text-white',
        className: 'text-blue-700 group-hover:text-white',
      },
      instagram: {
        iconComponent: InstagramLogo,
        iconClassName: 'text-pink-600 group-hover:text-white',
        className: 'text-pink-600 group-hover:text-white',
      },
      default: {
        iconComponent: LinkSimpleHorizontal,
        iconClassName: '',
        className: 'hover:bg-black',
      },
    };

    const {
      iconComponent: LinkIcon,
      iconClassName: iconClassName,
      className: className = '',
    } = linksComponents[link as keyof typeof linksComponents] ||
    linksComponents.default;

    return {
      name: splitCamelCase(linkName),
      icon: <LinkIcon size={32} weight="fill" className={iconClassName} />,
      className: className,
      href: links[link as keyof ContentfulRelease['links']],
    };
  });

  return formattedLinks;
};
