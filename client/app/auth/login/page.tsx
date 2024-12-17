import React from "react";
import UserLogin from "./user-login";
import { authRoutes } from "@/lib/backend-routes";

const page = () => {
  return (
    <div>
      <UserLogin backend_route={authRoutes.user_login} title="User Login" />
    </div>
  );
};

export default page;
