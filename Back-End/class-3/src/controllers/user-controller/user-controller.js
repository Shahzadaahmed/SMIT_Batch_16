// All user related controller functions are defined here...!

const welcomeToDB = (req, res) => {
  return res?.status(200).send({
    status: true,
    message: "Welcome to Node JS!",
  });
};

export { welcomeToDB };