import Wrapper from "@/components/other-components/wrapper";
import React from "react";
import { columns } from "./column";
import ViewAdmins from "./view-admins";
import AddAdmin from "./add-admin";
import { fetchDataSuperAdmin } from "@/lib/server-actions";
import { superAdminRoutes } from "@/lib/backend-routes";

const page = async () => {
  const all_admins = await fetchDataSuperAdmin({
    url: superAdminRoutes.get_admins,
  });
  console.log(all_admins.data);
  return (
    <Wrapper title="Create Admins">
      <section className="space-y-4">
        <div className="w-full flex justify-end">
          <AddAdmin />
        </div>
        <ViewAdmins data={all_admins.data} />
      </section>
    </Wrapper>
  );
};

export default page;
