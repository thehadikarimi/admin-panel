import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  phoneNumber: String,
  birthDate: String,
  category: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  payment: [
    {
      year: String,
      data: [
        {
          month: String,
          status: String,
        },
      ],
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
