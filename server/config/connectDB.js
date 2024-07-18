import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((res) =>
      console.log(`DB CONNECTED TO HOST :: ${res.connection.host}`)
    )
    .catch((err) => console.log(`Error while connecting to db :: ${err}`));
};
