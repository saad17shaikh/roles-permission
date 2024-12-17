"use client";
import DataTable from "@/components/other-components/data-table";
import React from "react";
import { columns } from "./column";

const ViewAdmins = () => {
  return (
    <div>
      {" "}
      <DataTable
        columns={columns}
        data={[{ name: "Saad" }]}
        showColDropDowns
        showPageEntries
        key={"add-admins"}
        selectionKey="name"
      />
    </div>
  );
};

export default ViewAdmins;
