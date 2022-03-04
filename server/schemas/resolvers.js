const { AuthenticatioError } = require("apollo-server-express");
const { User, Cypher } = require("../models");
const { signToken } = require("../utils/auth");
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const NEW_CYPHER_USER = "NEW_USER";
const NEW_MESSAGE = "NEW_MESSAGE";
const NEW_CYPHER = "NEW_CYPHER"


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ userId: context.user_id });
        return userData;
      }
      throw new AuthenticatioError("You need to be logged in!");
    },
    cyphers: async (parent, { _id }) => {
      // may want to flip to a possitive number depending on how it is returned
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Subscription: {
    newCypherUser: {
      subscribe: () => pubsub.asyncIterator([NEW_CYPHER_USER]),
    },
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE])
    },
    newCypher: {
      subscribe: () => pubsub.asyncIterator([NEW_CYPHER])
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticatioError(
          "No user found with matching email address!"
        );
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticatioError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addCypher: async (parent, { userId }) => {
      await Cypher.create({ userId });
      return pubsub.publish(NEW_CYPHER, { userId })
    },
    addMessage: async (parent, { _id, messageText, messageAuthor, userId }) => {
      await Cypher.findOneAndUpdate(
        { _id },
        {
          // we will want to find userName from the userId.
          $addToSet: { messages: { messageText, messageAuthor, userId } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return pubsub.publish(NEW_MESSAGE, { _id, messageText, messageAuthor, userId })
    },
    addCypherUser: async (parent, { userId, _id }) => {
      await Cypher.findOneAndUpdate(
        { _id },
        {
          // we might want to update this to include username and userId
          $addToSet: { User: { userId } },
        }
      );
      return pubsub.publish(NEW_CYPHER_USER, { userId, _id })
    },
  },
};
module.exports = resolvers;
