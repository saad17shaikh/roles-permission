"use client";
import FormInput from "@/components/form-components/FormInput";
import SubmitBtn from "@/components/form-components/SubmitBtn";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authRoutes } from "@/lib/backend-routes";
import { authLoginFunc } from "@/lib/client-actions";

import useDynamicForm from "@/lib/hooks/useDynamicForm";
import { formSubmit } from "@/lib/server-actions";
import { authLogin } from "@/lib/zodSchema";
import React from "react";
import { toast } from "react-toastify";
import { z } from "zod";

// export const authLoginFunc = async ({
//   url,
//   method,
//   formData,
// }: {
//   url: string;
//   method: string;
//   formData: any;
// }) => {
//   const res = await fetch(url, {
//     method,
//     headers: {
//       "Content-type": "application/json",
//     },

//     credentials: "include",
//     body: JSON.stringify(formData),
//   });

//   const data = await res.json();

//   return data;
// };

const UserLogin = () => {
  const { form, isPending, startTransition } = useDynamicForm(authLogin, {
    email: "saad17shaikh@gmail.com",
    password: "saad",
  });
  // console.log(form.formState.errors);
  const handleSubmit = async (values: z.infer<typeof authLogin>) => {
    // console.log({ values });
    // toast(values.email);
    // const resolveAfter3Sec = new Promise((resolve) =>
    //   setTimeout(resolve, 3000)
    // );
    // startTransition(() => {
    //   authLoginFunc({
    //     formData: values,
    //     url: authRoutes.user_login,
    //     method: "POST",
    //   }).then((data) => {
    //     console.log(data);
    //     toast(data.message);
    //   });
    // });
    startTransition(() => {
      const id = toast.loading("Please wait...");

      authLoginFunc({
        formData: values,
        method: "POST",
        url: authRoutes.user_login,
      })
        .then((data) => {
          console.log(data);
          if (data.success) {
            toast.update(id, {
              render: data.message,
              type: "success",
              isLoading: false,
              autoClose: 1000,
              closeButton: true,
            });
          } else {
            toast.update(id, {
              render: data.message,
              type: "error",
              isLoading: false,
              autoClose: 1000,
            });
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    });
  };
  return (
    <main className="h-screen flex items-center justify-center bg-black ">
      <section className=" w-[50%] border border-gray-300 rounded-lg p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput
              form={form}
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
            />
            <FormInput
              form={form}
              label="Password"
              name="password"
              placeholder="password"
              type="password"
            />
            <SubmitBtn isSubmitting={isPending} text={"Login"} />
            {/* <Button type="submit">Login</Button> */}
          </form>
        </Form>
      </section>
    </main>
  );
};

export default UserLogin;
