
const User = require('./models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('Thought');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async putUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createFriend(req, res) {
    try {
      const friendId = req.body.friendId;

      const currentUser = await User.findById(req.params.userId);
      if (currentUser.friends.includes(friendId)) {
        return res.status(400).json({ error: 'User is already a friend' });
      }
      currentUser.friends.push(friendId);
      await currentUser.save();
      res.json(currentUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const currentUser = await User.findById(userId);

      if (!currentUser.friends.includes(friendId)) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      currentUser.friends.pull(friendId);
      await currentUser.save();
      res.json({ message: 'Friend deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

