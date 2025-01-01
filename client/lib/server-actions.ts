"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getCookie = (cookieName: string) => {
  const cookie = cookies().get(cookieName);
  if (cookie) {
    return cookie.value;
  }
};

export const removeCookie = (cookieToBeDeleted: any) => {
  const cookie = cookies().get(cookieToBeDeleted);
  if (cookie) {
    cookies().delete(cookieToBeDeleted);
  }
};

export const formSubmit = async ({
  url,
  method,
  formData,
  revPath,
}: {
  url: string;
  method: string;
  formData: any;
  revPath?: string;
}) => {
  const super_admin_cookie = await getCookie("superadmintoken");

  const user_cookie = await getCookie("token");
  let final_cookie = user_cookie ? `${user_cookie}` : `${super_admin_cookie}`;
  const res = await fetch(url, {
    next: {
      revalidate: 0,
      tags: ["add-user"],
    },
    method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${final_cookie}`,
    },

    credentials: "include",
    body: JSON.stringify(formData),
  });
  revPath && revalidatePath(revPath);
  const data = await res.json();

  return data;
};

export const formSuperAdminSubmit = async ({
  url,
  request,
  formData,
  revPath,
}: {
  url: any;
  request: string;
  formData: any;
  revPath?: string;
}) => {
  const cookie = await getCookie("superadmintoken");
  const res = await fetch(url, {
    next: {
      revalidate: 0,
      tags: ["add-user"],
    },
    method: request,

    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${cookie}`,
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  revPath && revalidatePath(revPath);
  const data = await res.json();

  return data;
};

export const deleteRow = async (url: string, revPath: string) => {
  const cookie = await getCookie("freightadmintoken");

  const user_cookie = await getCookie("freightusertoken");
  let final_cookie = cookie
    ? `freight_admin=${cookie}`
    : `freight_user=${user_cookie}`;
  const res = await fetch(url, {
    cache: "reload",
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${final_cookie}`,
    },
  });
  revalidatePath(revPath);
  const data = await res.json();
  return data;
};

export const deleteRowSuperAdmin = async (url: string, revPath: string) => {
  const cookie = await getCookie("superadmintoken");

  const res = await fetch(url, {
    cache: "reload",
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${cookie}`,
    },
  });
  revalidatePath(revPath);
  const data = await res.json();
  return data;
};

export const fetchDataSuperAdmin = async ({ url }: { url: any }) => {
  const cookie = await getCookie("superadmintoken");
  const res = await fetch(url, {
    next: {
      revalidate: 0,
      tags: ["add-user"],
    },
    method: "GET",

    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${cookie}`,
    },
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  return data;
};
