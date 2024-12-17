"use client";
import React from "react";
import DialogBox from "@/components/other-components/dialog-box";
import useDynamicForm from "@/lib/hooks/useDynamicForm";
import { AdminSchema } from "@/lib/zodSchema";
import { Form } from "@/components/ui/form";
import SubmitBtn from "@/components/form-components/submit-btn";
import { z } from "zod";
import { FormDynamicFields } from "@/components/form-components/form-dynamic-fields";
import { DynamicFormFieldType } from "@/lib/type";
import { authLoginWithToaster } from "@/lib/client-actions";
import { superAdminRoutes } from "@/lib/backend-routes";

const AddAdmin = () => {
  const { form, open, setOpen } = useDynamicForm(AdminSchema, {
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });
  const onSubmit = (values: z.infer<typeof AdminSchema>) => {
    console.log({ values });
    authLoginWithToaster({
      values,
      url: superAdminRoutes.add_admin,
      afterSuccess: () => {
        console.log("Login successful!");
        // setOpen(false);

        form.reset();
      },
    });
  };
  const demoData = [
    {
      id: "afdjkldf",
      name: "Saad",
    },
    {
      id: "1241121",
      name: "Shaikh",
    },
  ];
  const fields: DynamicFormFieldType[] = [
    {
      label: "Name",
      name: "name",
      placeholder: "name",
      type: "text",
      input_type: "input",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "password",
      type: "text",
      input_type: "input",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "email",
      type: "text",
      input_type: "input",
    },
    {
      label: "Address",
      name: "address",
      placeholder: "address",
      type: "text",
      input_type: "input",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "phone",
      type: "number",
      input_type: "input",
    },
    // {
    //   label: "Phone",
    //   name: "name",
    //   placeholder: "phone",
    //   type: "number",
    //   input_type: "select",
    //   select_comp_data: demoData,
    //   select_comp_value: "id",
    //   select_comp_label: "name",
    // },
  ];

  return (
    <>
      <DialogBox
        dialogTitle="Add Admin"
        triggerType="add"
        dialogDesc="Add admins for your project"
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-5">
              <FormDynamicFields fields={fields} form={form} />
            </div>
            <SubmitBtn />
          </form>
        </Form>
      </DialogBox>
    </>
  );
};

export default AddAdmin;
