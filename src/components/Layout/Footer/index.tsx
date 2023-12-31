import { SoundcloudLogo, SpotifyLogo, YoutubeLogo } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="bg-dark flex justify-between px-16 py-4">
      <h1 className="text-3xl font-coustard text-light">yLLop © 2023</h1>
      <div className="flex items-center">
        <ul className="text-white text-lg flex gap-4">
          <li>
            <a href="https://open.spotify.com/artist/3xVMQnRMwi2bL5pzSpBL0H?si=lBFdneLySYaKDS4CbwKlYw" target="_blank">
              <SpotifyLogo size={28} className="text-light hover:text-[#fcc46a]" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@yllopmusic6770" target="_blank">
              <YoutubeLogo size={28} className="text-light hover:text-[#fcc46a]" />
            </a>
          </li>
          <li>
            <a href="https://soundcloud.com/yllop" target="_blank">
              <SoundcloudLogo size={28} className="text-light hover:text-[#fcc46a]" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
