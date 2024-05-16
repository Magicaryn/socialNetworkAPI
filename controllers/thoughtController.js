
//// need to adjust models will have to correct code after

const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const Thoughts = await Thought.find();
      res.json(Thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.ThoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { Thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async putThought(req, res){
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res){
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
          return res.status(404).json({ error: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
/// reaction functionality not working models not in tact. 
///things below are copy and pasted from above and need to be adjusted to make the reaction

    async createReaction(req, res) {
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { Thoughts: thought._id } },
          { new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' });
        }
  
        res.json('Created the thought 🎉');
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async deleteReaction(req, res){
      try {
          const deletedThought = await Thought.findByIdAndDelete(req.params.id);
          if (!deletedThought) {
            return res.status(404).json({ error: 'Thought not found' });
          }
          res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
};
