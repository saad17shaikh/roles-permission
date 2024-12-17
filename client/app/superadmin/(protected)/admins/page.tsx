import Wrapper from "@/components/other-components/wrapper";
import React from "react";
import { columns } from "./column";
import ViewAdmins from "./view-admins";
import AddAdmin from "./add-admin";

const page = () => {
  return (
    <Wrapper title="Create Admins">
      <section className="space-y-4">
        <div className="w-full flex justify-end">
          <AddAdmin />
        </div>
        <ViewAdmins />
      </section>
    </Wrapper>
  );
};

export default page;
