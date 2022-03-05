const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const dateFormat = require("../utils/dateFormat");

// fix this
const cypherSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const Cypher = model("Cypher", cypherSchema);

module.exports = Cypher;
