import React from "react";
import {
  FaHome,
  FaChartPie,
  FaUsers,
  FaEnvelope,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import {
  MdSettings,
  MdNotifications,
  MdHelp,
  MdDashboard,
} from "react-icons/md";
import { IoIosStats } from "react-icons/io";

import SideBarItem from "./sidebar-item";
import { FaPhone } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";

interface SideBarLinksProps {
  isOpen: boolean;
}
const SideBarLinks: React.FC<SideBarLinksProps> = ({ isOpen }) => {
  return (
    <>
      <div className="flex-col space-y-4 h-full w-full cursor-pointer py-14">
        {/* Profile Section */}
        <div>
          <SideBarItem
            icon={
              <div className="w-6 h-6 flex items-center justify-center bg-green-700 rounded-full text-sm">
                S
              </div>
            }
            text="Saad"
            isOpen={isOpen}
          />
        </div>

        {/* Main Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Main
          </p>
          <SideBarItem
            icon={<MdDashboard className="w-5 h-5 text-blue-500" />}
            text="Dashboard"
            isOpen={isOpen}
          />
          <SideBarItem
            icon={<IoIosStats className="w-5 h-5 text-green-500" />}
            text="Statistics"
            isOpen={isOpen}
          />
        </div>

        {/* Analytics Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Analytics
          </p>
          <SideBarItem
            icon={<FaChartPie className="w-5 h-5 text-purple-500" />}
            text="Reports"
            isOpen={isOpen}
          />
          <SideBarItem
            icon={<IoIosStats className="w-5 h-5 text-teal-500" />}
            text="Trends"
            isOpen={isOpen}
          />
        </div>

        {/* Projects Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Projects
          </p>
          <SideBarItem
            icon={<FaProjectDiagram className="w-5 h-5 text-indigo-500" />}
            text="All Projects"
            isOpen={isOpen}
          />
          <SideBarItem
            icon={<MdDashboard className="w-5 h-5 text-blue-400" />}
            text="Active Projects"
            isOpen={isOpen}
          />
        </div>

        {/* Team Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Team
          </p>
          <SideBarItem
            icon={<FaUsers className="w-5 h-5 text-orange-500" />}
            text="Users"
            isOpen={isOpen}
          />
          <SideBarItem
            icon={<FaEnvelope className="w-5 h-5 text-yellow-500" />}
            text="Messages"
            isOpen={isOpen}
          />
        </div>

        {/* Billing Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Billing
          </p>
          <SideBarItem
            icon={<FaFileInvoiceDollar className="w-5 h-5 text-red-500" />}
            text="Invoices"
            isOpen={isOpen}
          />
          <SideBarItem
            icon={<MdOutlinePayment className="w-5 h-5 text-sky-600" />}
            text="Payment Methods"
            isOpen={isOpen}
          />
        </div>

        {/* Notifications Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Notifications
          </p>
          <SideBarItem
            icon={<MdNotifications className="w-5 h-5 text-pink-500" />}
            text="Notifications"
            isOpen={isOpen}
          />
        </div>

        {/* Help Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Help
          </p>
          <SideBarItem
            icon={<MdHelp className="w-5 h-5 text-cyan-500" />}
            text="Help Center"
            isOpen={isOpen}
          />
          <SideBarItem
            icon={<FaPhone className="w-5 h-5 text-blue-600" />}
            text="Contact Support"
            isOpen={isOpen}
          />
        </div>

        {/* Settings Section */}
        <div className="space-y-1">
          <p
            className={`text-xs text-gray-400 font-semibold tracking-wider ${
              isOpen ? "block" : "hidden"
            } px-5`}
          >
            Settings
          </p>
          <SideBarItem
            icon={<MdSettings className="w-5 h-5 text-gray-600" />}
            text="Settings"
            isOpen={isOpen}
          />
        </div>
      </div>
    </>
  );
};

export default SideBarLinks;
