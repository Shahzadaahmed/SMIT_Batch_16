import React from "react";
import Link from "next/link";

// window.scrollX()

const Navbar = () => {
  return (
    <ul>
      <li>
        {" "}
        <Link href={"/"}> Dashboard </Link>{" "}
      </li>
      <li>
        {" "}
        <Link href={"/home"}> Home </Link>{" "}
      </li>
      <li>
        {" "}
        <Link href={"/about"}> About </Link>{" "}
      </li>
      <li>
        {" "}
        <Link href={"/users"}> Users </Link>{" "}
      </li>
      {/* <li> <Link href={'./about/profile'}> Profile </Link> </li> */}
    </ul>
  );
};

export default Navbar;
