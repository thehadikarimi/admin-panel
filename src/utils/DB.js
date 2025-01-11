import { mongoose } from "mongoose";

export async function DB_IsConnected() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to DB");
    return "connected";
  } catch (err) {
    console.log(err);
    return "not-connected";
  }
}
