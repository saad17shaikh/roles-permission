"use client";
import FormInput from "@/components/form-components/form-input";
import SubmitBtn from "@/components/form-components/submit-btn";
import { Form } from "@/components/ui/form";
import { authRoutes } from "@/lib/backend-routes";
import { authLoginWithToaster } from "@/lib/client-actions";
import useDynamicForm from "@/lib/hooks/useDynamicForm";
import { cn } from "@/lib/utils";
import { authLogin } from "@/lib/zodSchema";
import { time } from "console";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

interface userLoginProps {
  backend_route: string;
  className?: string;
  title: string;
}

const UserLogin: React.FC<userLoginProps> = ({
  backend_route,
  className,
  title,
}) => {
  const { form, isPending, startTransition } = useDynamicForm(authLogin, {
    email: "saad17shaikh@gmail.com",
    password: "saad",
  });
  const router = useRouter();
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

    // const id = toast.loading("Please wait...", {
    //   closeButton: true,
    // });

    // authLoginFunc({
    //   formData: values,
    //   method: "POST",
    //   url: authRoutes.user_login,
    // })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.success) {
    //       toast.update(id, {
    //         render: data.message,
    //         type: "success",
    //         isLoading: false,
    //         autoClose: 1000,
    //         closeButton: true,
    //       });
    //     } else {
    //       toast.update(id, {
    //         render: data.message,
    //         type: "error",
    //         isLoading: false,
    //         autoClose: 1000,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });
    authLoginWithToaster({
      values,
      url: backend_route,
      afterSuccess() {
        router.push("/superadmin/admins");
      },
    });
  };

  return (
    <main
      className={cn(
        "h-screen flex items-center justify-center bg-black",
        className
      )}
    >
      <section className=" w-[50%] border border-gray-300 rounded-lg p-10">
        <p className="text-white text-center text-2xl border-b font-extrabold tracking-wider">
          {title}
        </p>
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
