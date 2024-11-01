"use client";

import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      {" "}
      <button onClick={() => toast("Wow so easy!")}>Notify me</button>
    </>
  );
}
