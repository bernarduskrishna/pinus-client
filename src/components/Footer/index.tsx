import React from "react";
import Image from "next/image";
import Column from "./Column";
import { columns } from "./columns";

const Footer: React.FC = () => {
  return (
    <div
      className={`flex flex-row justify-between items-start bg-secondary font-sans w-screen h-96 p-12`}
    >
      <div className={`flex flex-col justify-between h-full`}>
        <div className={`flex flex-row justify-start items-center`}>
          <Image
            src="/assets/icons/pinus.png"
            alt="PINUS footer logo"
            height={70}
            width={70}
          />
          <p className={`text-3xl font-bold ml-5`}>PINUS</p>
        </div>
        <p className={`text-sm text-gray-400`}>
          ©2021 Perhimpunan Indonesia NUS. All Rights Reserved.
        </p>
      </div>
      <div className={`flex flex-row justify-between`}>
        {columns.map((column, index) => {
          return (
            <div className={`w-content mr-16`} key={`${column.title}-${index}`}>
              <Column title={column.title} pages={column.pages} />
            </div>
          );
        })}
      </div>
      <div className={`w-64`}>
        <p className={`font-bold mb-5`}>Contact Us</p>
        <p className={`text-xs mb-10`}>
          Feel free to drop us a message. We would love to hear from you!
        </p>
        <div className={`flex flex-row w-14 justify-between`}>
          <Image
            className={`cursor-pointer`}
            alt="Facebook profile"
            src="/assets/icons/fb.png"
            height={20}
            width={20}
          />
          <Image
            className={`cursor-pointer`}
            alt="Instagram profile"
            src="/assets/icons/ig.png"
            height={20}
            width={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
