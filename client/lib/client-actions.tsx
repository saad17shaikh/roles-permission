"use client";
export const authLoginFunc = async ({
  url,
  method,
  formData,
}: {
  url: string;
  method: string;
  formData: any;
}) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },

    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  return data;
};
