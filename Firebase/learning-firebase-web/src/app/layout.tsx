"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const fetchAuthUser = () => {
    onAuthStateChanged(auth, async (user) => {
      console.log('User: ', user);
      console.log(user?.uid)

      const fbToken = await user?.getIdToken();
      console.log('Token: ' , fbToken);

      // if (user) {
      //   const uid = user.uid;
      // }

      // else {
      // }
    });
  };

  // Mounted hook..!
  useEffect(() => {
    fetchAuthUser();
  }, []);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
