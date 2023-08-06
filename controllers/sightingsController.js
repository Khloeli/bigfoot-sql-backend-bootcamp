const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  //findByPk is used to search for a single instance by its primary key.
  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId); // models are created and exported, they already have the Sequelize methods (such as findByPk()) attached to them
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create sightings
  async createSighting(req, res) {
    const { date, location, notes } = req.body;
    try {
      const sighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
      });
      console.log(this.model.location);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // edit Sightings
  async editSighting(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body;
    try {
      const sighting = await this.model.update(
        {
          date: date,
          location: location,
          notes: notes,
        },
        {
          where: {
            id: sightingId,
          },
        }
      );
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // get comments
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(comments);
      // return res.json({ msg: true });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create comment
  async createComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      console.log(this.commentModel.content);
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
