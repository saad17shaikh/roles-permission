import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}
const Wrapper: React.FC<WrapperProps> = ({ children, title, description }) => {
  return (
    <>
      <nav className=" w-full px-5 py-3">Saad</nav>
      <section className="m-5 p-6 rounded-lg bg-white ">
        <p className="text-xl tracking-wider font-bold">{title}</p>
        <p className="text-sm tracking-wide">{description}</p>
        {children}
      </section>
    </>
  );
};

export default Wrapper;
