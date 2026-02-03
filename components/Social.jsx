import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { memo } from "react";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/petar97",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/petar-milovanovic-899a02157/",
    icon: <FaLinkedin />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/petar_milovanovic_/",
    icon: <FaInstagram />,
  },
];

const Social = memo(({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item) => {
        return (
          <Link href={item.url} key={item.name} className={iconStyles} target="_blank" rel="noopener noreferrer">
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
});

Social.displayName = 'Social';

export default Social