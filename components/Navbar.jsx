"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./";
import Image from "next/image";
import images from "../public/assets"

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/creatednfts";
      case 2:
        return "mynfts";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          onClick={() => setActive(item)}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
              ${
                active === item
                  ? "dark:text-white text-nft-black-1"
                  : "dark:text-nft-gray-3 text-nft-gray-2"
              }
            `}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;

  return hasConnected ? (
    <Button
      btnName="Create"
      handleClick={() => {
        setActive("");

        router.push("/createnft");
      }}
      classStyles="mx-2 rounded-xl"
    />
  ) : (
    <Button
      btnName="Connect"
      handleClick={() => {}}
      classStyles="mx-2 rounded-xl"
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <i className="fas fa-sailboat" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              Oqensea
            </p>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="hidden md:flex" onClick={() => {}}>
            <i className="fas fa-sailboat" />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {isOpen
          ? (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(false)}
              className={theme === 'light' ? 'filter invert' : ''}
            />
          ) : (
            <Image
              src={images.menu}
              objectFit="contain"
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(true)}
              className={theme === 'light' ? 'filter invert' : ''}
            />
          )}
        {isOpen && (
        <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
          <div className="flex-1 p-4">
            <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
          </div>
          <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
            <ButtonGroup router={router} setActive={setActive} setIsOpen={setIsOpen} />
          </div>
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
