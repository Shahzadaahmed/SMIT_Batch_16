import mongoose from "mongoose";

/*** User Schema ***/
const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: String,
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
    },
    address: {
      type: String,
      default: null,
    },
  },
  {
    collection: "users-list",
    timestamps: true,
  },
);
const UserModal = mongoose.model("User", userSchema);
export default UserModal;
