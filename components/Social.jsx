import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

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

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link href={item.url} key={index} className={iconStyles} target="_blank">
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Social