import React from "react";

interface SideBarItemProps {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}
const SideBarItem: React.FC<SideBarItemProps> = ({ icon, text, isOpen }) => {
  return (
    <>
      <div
        className={`flex duration-300 ${
          isOpen ? " items-center  gap-3 px-4" : "justify-center px-3"
        } py-1 hover:bg-white/15 w-full h-full  relative group`}
      >
        {/* <FaUserTie className="w-4 h-4 text-green-400" /> */}
        {icon}
        {text && (
          <span
            className={` hidden whitespace-nowrap ${
              !isOpen && "group-hover:block"
            }  absolute left-16 top-1 text-xs bg-white text-black  px-3 py-1 rounded-lg border-gray-700 tracking-wider =`}
          >
            {text}
            <span className="p-1 bg-inherit absolute rotate-45 top-1/2 -translate-y-1/2 -left-0.5"></span>
          </span>
        )}

        <p className={`${isOpen ? "block text-sm tracking-wider" : "hidden"}`}>
          {text}
        </p>
      </div>
    </>
  );
};

export default SideBarItem;
