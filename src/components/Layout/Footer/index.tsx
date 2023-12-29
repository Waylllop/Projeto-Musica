import { SoundcloudLogo, SpotifyLogo, YoutubeLogo } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="bg-dark p-8 flex justify-between px-16">
      <h1 className="text-3xl font-bold text-white">Yllop©2023</h1>
      <div>
        <ul className="text-white text-lg flex gap-4">
          <li>
            <a href="https://open.spotify.com/artist/3xVMQnRMwi2bL5pzSpBL0H?si=lBFdneLySYaKDS4CbwKlYw" target="_blank">
              <SpotifyLogo size={28} color="#e6e6e6" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@yllopmusic6770" target="_blank">
              <YoutubeLogo size={28} color="#e6e6e6" />
            </a>
          </li>
          <li>
            <a href="https://soundcloud.com/yllop" target="_blank">
              <SoundcloudLogo size={28} color="#e6e6e6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
