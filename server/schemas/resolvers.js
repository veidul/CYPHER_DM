const { AuthenticationError } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { User, Cypher, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Subscription: {
    newCypherUser: {
      subscribe: () => PubSub.asyncIterator([])
    }
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
      console.log(data);
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
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addCypher: async (parent, input, context) => {
      const user = await User.findOne({ _id: context.user._id });

      //if there's a user, create cypher, else return
      const cypher = await Cypher.create({ users: [user._id], messages: [] });
      return await cypher.populate("users");
    },
    addMessage: async (parent, { _id, messageText, context }) => {
      const user = await User.findOne({ _id: context.user._id });
      return Cypher.findOneAndUpdate(
        { _id },
        {
          // we will want to find userName from the userId.
          $addToSet: { messages: { messageText, user } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addCypherUser: async (parent, _id, context) => {
      const user = await User.findOne({ _id: context.user._id });
      return Cypher.findOneAndUpdate(
        { _id },
        {
          // we might want to update this to include username and userId
          $addToSet: { users: { user } },
        }
      );
    },
  },
};
module.exports = resolvers;
