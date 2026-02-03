// All user related controller functions are defined here...!

import UserModal from "../../models/user-model/user-model.js";

const welcomeToDB = (req, res) => {
  return res?.status(200).send({
    status: true,
    message: "Welcome to Node JS!",
  });
};

// Create or save user in DB
const createUser = async (req, res) => {
  console.log(`Body: ${JSON.stringify(req.body)}`);

  try {
    // 400:
    const bodyValues = Object.values(req.body);
    const isValidate = bodyValues?.some((item) => {
      return item == "";
    });

    if (isValidate) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    // 200:
    const newUser = new UserModal(req.body);
    const saveUser = await newUser.save();

    if (saveUser) {
      return res.status(200).send({
        status: true,
        message: "User saved successfully",
        data: newUser,
      });
    }
  } catch (error) {
    // 500:
    console.log("Err from server side: ", error);

    return res.status(500).send({
      status: false,
      message: "Err from server side",
      serverErrMsg: error,
    });
  }
};

export { welcomeToDB , createUser };
