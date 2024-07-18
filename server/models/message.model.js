import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", MessageSchema);
