import React, { ReactNode } from "react";
import Navbar from "./src/components/navbar/navbar";

const AppLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default AppLayout;
