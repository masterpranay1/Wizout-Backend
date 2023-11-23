import TripService from "../services/tripService.js";

class TravelController {
  async createTrip(req, res) {
    const { description, startDate, endDate, destination, budget } = req.body;
    const { userId } = req.body;
    const trip = {
      description,
      startDate,
      endDate,
      destination,
      userId,
      budget,
    };
    try {
      const newTrip = await TripService.addTrip(trip);
      res.status(201).json(newTrip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTripsId(req, res) {
    try {
      const tripsId = await TripService.getAllTripsId();
      res.status(200).json(tripsId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTripsIdOfUser(req, res) {
    const { userId } = req.body;
    try {
      const trips = await TripService.getAllTripsId({ userId });
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTripById(req, res) {
    const { id } = req.body;
    try {
      const trip = await TripService.getTripById(id);
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async sendRequest(req, res) {
    const { userId, tripId } = req.body;
    try {
      const isOwner = await TripService.isOwner(userId, tripId);
      if (isOwner) {
        throw new Error("You are the owner of this trip");
      }
      const trip = await TripService.sendRequest(userId, tripId);
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRequests(req, res) {
    const { tripId, userId } = req.body;
    try {
      if (!(await TripService.isOwner(userId, tripId))) {
        throw new Error("You are not the owner of this trip");
      }
      const requests = await TripService.getAllRequests(tripId);
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async acceptRequest(req, res) {
    const { tripId, userId, acceptId } = req.body;
    try {
      if (!(await TripService.isOwner(userId, tripId))) {
        throw new Error("You are not the owner of this trip");
      }
      const trip = await TripService.acceptRequest(acceptId, tripId);
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async rejectRequest(req, res) {
    const { tripId, userId, acceptId } = req.body;
    try {
      if (!(await TripService.isOwner(userId, tripId))) {
        throw new Error("You are not the owner of this trip");
      }
      const trip = await TripService.rejectRequest(acceptId, tripId);
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TravelController();
