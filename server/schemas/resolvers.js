const { AuthenticatioError } = require("apollo-server-express");
const { User, Cypher } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user_id });
        return userData;
      }
      throw new AuthenticatioError("You need to be logged in!");
    },
    cyphers: async () => {
      // may want to flip to a possitive number depending on how it is returned
      return Cypher.find().sort({ createdAt: -1 });
    },
    cypher: async (parent, { cypherId }) => {
      return Cypher.findOne({ _id: cypherId });
    },
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
      return Cypher.create({ userId });
    },
    addMessage: async (parent, { userId, cypherId, messageText }) => {
      return Cypher.findOneAndUpdate(
        { _id: cypherId },
        {
          // we will want to find userName from the userId.
          $addToSet: { comments: { commentText }, user: { userId } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addCypherUser: async (parent, { userId, cypherId }) => {
      return Cypher.findOneAndUpdate(
        { _id: cypherId },
        {
          // we might want to update this to include username and userId
          $addToSet: { User: { userId } },
        }
      );
    },
  },
};
module.exports = resolvers;
