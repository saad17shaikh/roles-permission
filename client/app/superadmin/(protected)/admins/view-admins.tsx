"use client";
import DataTable from "@/components/other-components/data-table";
import React from "react";
import { columns } from "./column";

const ViewAdmins = ({data}:any) => {
  return (
    <>
      {" "}
      <DataTable
        columns={columns}
        data={data}
        showColDropDowns
        showPageEntries
        key={"add-admins"}
        selectionKey="name"
      />
    </>
  );
};

export default ViewAdmins;
