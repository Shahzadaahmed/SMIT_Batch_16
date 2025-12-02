// Auth action functions are defined here...!

import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

interface UserData {
  name: string;
  email: string;
  password: string;
}

const signUpUser = (userData: UserData) => {
  return async () => {
    console.log("User: ", userData);

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        userData?.email,
        userData?.password
      );
      console.log(createUser);

      const saveUserData = {
        ...userData,
        uid : createUser?.user?.uid
      }

      if (createUser) {
        // Note: Saving data in DB...!
        const firebaseDocRef = await addDoc(collection(db, "Users"), saveUserData);
        console.log("Saved data in DB: ", firebaseDocRef);
      }
    } catch (error: any) {
      console.log("Something wnet wrong while creating user: ", error.message);
    }
  };
};

export { signUpUser };

// createUser && alert("User created successfully!");
