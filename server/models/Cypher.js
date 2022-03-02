const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const cypherSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  users: [
    {
      userId: {
        type: String,
        unique: true,
      },
    },
  ],
  messages: [
    {
      messageText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 500,
      },
      messageAuthor: {
        type: String,
        require: true,
      },
      userId: {
        type: String,
        require: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Cypher = model("Cypher", cypherSchema);

module.exports = Cypher;
