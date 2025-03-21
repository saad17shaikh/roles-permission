"use client";
import React from "react";
// import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import SideBarLinks from "./sidebar-links";

interface SideBarDailyDevProps {
  data: any[];
}
const SideBar: React.FC<SideBarDailyDevProps> = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  return (
    <>
      <aside
        className={` ${
          isOpen ? "w-[15%]" : "w-[5%] "
        } min-h-screen  relative duration-300 transition-all border-r border-black`}
        onMouseLeave={() => setIsMouseOver(false)}
        onMouseOver={() => setIsMouseOver(true)}
      >
        <div
          className={` ${
            isOpen ? "max-h-screen overflow-y-scroll" : ""
          } scrollbar-hidden`}
        >
          <SideBarLinks isOpen={isOpen} />
        </div>

        <button
          className={`absolute z-10 -right-4 top-4 ${
            isMouseOver ? "opacity-100" : "opacity-0"
          } duration-300 transition-all`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-7 h-7 flex items-center justify-center bg-slate-300 rounded-xl cursor-pointer hover:bg-white duration-300">
            <FaChevronRight
              className={`w-3 h-3 text-black ${
                isOpen && "rotate-180"
              } duration-500`}
            />
          </div>
        </button>
      </aside>
    </>
  );
};

export default SideBar;
