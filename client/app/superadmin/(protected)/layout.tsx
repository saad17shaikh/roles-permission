import SideBar from "@/components/navigation-bar/sidebar";
import React from "react";
import { Playpen_Sans } from "next/font/google";
const playpen = Playpen_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function SuperAdminLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`flex bg-gray-200 ${playpen.className}`}>
      <SideBar data={[]} />
      <main className="w-full">{children}</main>
    </main>
  );
}
