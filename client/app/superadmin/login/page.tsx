import UserLogin from "@/app/auth/login/user-login";
import { authRoutes } from "@/lib/backend-routes";
import React from "react";

const page = () => {
  return (
    <>
      <UserLogin
        backend_route={authRoutes.super_admin_login}
        title="Super Admin Login"
      />
    </>
  );
};

export default page;
