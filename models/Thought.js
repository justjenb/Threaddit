const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: [1, 'Thought must be between 1 and 280 characters'],
    maxlength: [280, 'Thought must be between 1 and 280 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
  },
  reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema );

module.exports = Thought;
