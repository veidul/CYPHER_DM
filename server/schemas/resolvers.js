const { AuthenticationError } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { User, Cypher, Message } = require("../models");
const { signToken } = require("../utils/auth");
const pubsub = new PubSub();
const NEW_CYPHER_USER = "NEW_USER";
const NEW_MESSAGE = "NEW_MESSAGE";
const NEW_CYPHER = "NEW_CYPHER";

const resolvers = {
  Subscription: {
    newCypherUser: {
      subscribe: () => pubsub.asyncIterator([NEW_CYPHER_USER]),
    },
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    },
    newCypher: {
      subscribe: () => pubsub.asyncIterator([NEW_CYPHER]),
    },
  },
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    cyphers: async () => {
      // may want to flip to a possitive number depending on how it is returned
      // searching for user object may not work
      const data = await Cypher.find({}).populate("users").populate("messages");
      return data;
    },
    cypher: async (parent, { _id }) => {
      // may want to flip to a possitive number depending on how it is returned
      // searching for user object may not work
      const data = await Cypher.find({ _id })
        .populate("users")
        .populate("messages");
      return data;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError(
          "No user found with matching email address!"
        );
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      console.log("payload received", username);
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (e) {
        console.log(e);
      }
    },
    addCypher: async (parent, input, context) => {
      const user = await User.findOne({ _id: context.user._id });

      //if there's a user, create cypher, else return
      const cypher = await Cypher.create({ users: [user._id], messages: [] });
      const data = await cypher.populate("users");
      pubsub.publish(NEW_CYPHER, data);
      return data;
    },
    addMessage: async (parent, { cypherId, messageText }, context) => {
      const user = await User.findOne({ _id: context.user._id });
      const username = user.username;
      const messageData = await Message.create({
        username,
        messageText,
        cypherId,
      });
      await Cypher.findOneAndUpdate(
        { _id: cypherId },
        {
          // we will want to find userName from the userId.
          $addToSet: { messages: [messageData] },
        }
      );
      const data = await Cypher.findOne({ _id: cypherId })
        .populate("users")
        .populate("messages");
      return data;
    },
    addCypherUser: async (parent, _id, context) => {
      const user = await User.findOne({ _id: context.user._id });
      await Cypher.findOneAndUpdate(
        { _id: _id },
        {
          // we might want to update this to include username and userId
          $addToSet: { users: [user._id] },
        }
      );
      const data = await Cypher.findOne({ _id: _id })
        .populate("users")
        .populate("messages");
      return data;
    },
  },
};
module.exports = resolvers;
