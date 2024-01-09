import { Globe, SoundcloudLogo, SpotifyLogo, YoutubeLogo } from "@phosphor-icons/react";
import { song } from "../../../common/interfices";

interface SocialsProps {
  data: song;
}
const Socials = ({ data }: SocialsProps) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col gap-2 bg-dark text-light px-6 py-4 rounded-lg">
      {data.spotifyUrl ? (
        <a
          href={data.spotifyUrl}
          target="_blank"
          onClick={handleLinkClick}
          className="flex items-center gap-2 text-light hover:text-[#fcc46a]"
        >
          <span>
            <SpotifyLogo size={28} />
          </span>
          <span>Spotify</span>
        </a>
      ) : null}

      {data.youtubeUrl ? (
        <a
          href={data.youtubeUrl}
          target="_blank"
          onClick={handleLinkClick}
          className="flex items-center gap-2 text-light hover:text-[#fcc46a]"
        >
          <span>
            <YoutubeLogo size={28} />
          </span>
          <span>Youtube</span>
        </a>
      ) : null}

      {data.soundcloudUrl ? (
        <a
          href={data.soundcloudUrl}
          target="_blank"
          onClick={handleLinkClick}
          className="flex items-center gap-2 text-light hover:text-[#fcc46a] "
        >
          <span>
            <SoundcloudLogo size={28} />
          </span>
          <span>Soundcloud</span>
        </a>
      ) : null}

      {data.webUrl ? (
        <a
          href={data.webUrl}
          target="_blank"
          onClick={handleLinkClick}
          className="flex items-center gap-1 text-light hover:text-[#fcc46a]"
        >
          <Globe size={28} />
          <span></span>
          <span>Other</span>
        </a>
      ) : null}
    </div>
  );
};

export default Socials;
