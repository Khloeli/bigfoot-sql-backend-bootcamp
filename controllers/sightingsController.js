const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  //findByPk is used to search for a single instance by its primary key. PK is short for Primary Key, a unique identifier for each record in a database table. In your code, sightingId is used as the primary key to find a specific sighting.
  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
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
}

module.exports = SightingsController;
