const { Schema, model } = require("mongoose");

const messageSchema = require("./Message");

const cypherSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  messages: [
    {
      messageText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 500,
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
