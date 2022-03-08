const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: { type: Schema.Types.ObjectId, ref: "User" },
  messageText: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 500,
  },
});
const Message = model("Message", messageSchema);
module.exports = Message;
