import React , { ReactNode } from "react";

const AppLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default AppLayout;