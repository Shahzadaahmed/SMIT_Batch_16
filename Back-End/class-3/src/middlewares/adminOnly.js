import mongoose from "mongoose";
import UserModal from "../models/user-model/user-model.js";

const adminOnly = async (req, res, next) => {
  const { adminId } = req.params;
  console.log(`Admin Id: ${adminId}`);

  try {
    // 400:
    if (!adminId) {
      return res?.status(400).send({
        stats: false,
        message: "Admin id is required",
      });
    }

    // 404:
    const isAdminExist = await UserModal.findById(adminId);
    console.log(`Admin: ${isAdminExist}`);

    if (!isAdminExist) {
      return res?.status(404).send({
        stats: false,
        message: "Admin not found",
      });
    }

    if (isAdminExist.role != "admin") {
      return res?.status(404).send({
        stats: false,
        message: "You are not authorize to access this resource",
      });
    }

    // 200:
    next();
  } catch (error) {
    console.log("Err in admin only middleware: ", error);
  }
};

export default adminOnly;
