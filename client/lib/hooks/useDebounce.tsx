import { useCallback, useEffect, useState } from "react";
// import { user_routes } from "../routePath";
// import { getCookie } from "../helpers";

export const useDebounce = ({
  searchquery,
  route,
  delayValue,
}: {
  searchquery: string;
  route: string;
  delayValue?: number;
}) => {
  const [debouncedValue, setDebouncedValue] = useState([]);

  const fetchData = useCallback(async () => {
    // const cookie = await getCookie("freightadmintoken");
    // const user_cookie = await getCookie("freightusertoken");
    // let final_cookie = cookie
    //   ? `freight_admin=${cookie}`
    //   : `freight_user=${user_cookie}`;
    // const res = await fetch(`${route}`, {
    //   next: {
    //     revalidate: 0,
    //     tags: ["add-user"],
    //   },
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${final_cookie}`,
    //   },
    // });
    // const data = await res.json();
    // setDebouncedValue(data);
  }, [route]);

  useEffect(() => {
    if (!searchquery) {
      setDebouncedValue([]);
      return;
    }
    const timeoutId = setTimeout(fetchData, delayValue ?? 5000);
    return () => clearTimeout(timeoutId);
  }, [fetchData, delayValue, searchquery]);
  return { debouncedValue };
};
