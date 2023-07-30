const { User } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate([
        {
          path: 'friends',
          select: '-__v'
        },
        {
          path: 'thoughts',
          select: '-__v'
        }
      ]);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate([
        {
          path: 'friends',
          select: '-__v'
        },
        {
          path: 'thoughts',
          select: '-__v'
        }
      ]);

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      }

      user.friends.forEach(async (friendId) => {
        await User.updateOne(
          { _id: friendId },
          { $pull: { friends: user._id } }
        );
      });

      res.json({ message: "User deleted and friends removed!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getFriends(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('friends')
        .select('-__v');
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
  
      res.json(user.friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend (req, res) {
    try {
      const user = await User.updateOne(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No student user with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.updateOne(
        { _id: req.params.userId },
        { $pull: {friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};