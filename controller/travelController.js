import TripService from "../services/tripService.js";
import UserService from "../services/userService.js";

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
      const newTrip = await TripService.addTrip(trip, userId);
      const tripId = newTrip._id;
      await UserService.addTravelId(userId, tripId);
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

  async getAllTripsIdCreatedbyUser(req, res) {
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

      const isInTravelers = await TripService.checkIdInTravelers(
        userId,
        tripId
      );
      if (isInTravelers) {
        throw new Error("You are already in the travelers");
      }

      const trip = await TripService.sendRequest(userId, tripId);
      await UserService.addRequestId(userId, tripId);
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

      const isInTravelers = await TripService.checkIdInTravelers(
        acceptId,
        tripId
      );
      if (isInTravelers) {
        throw new Error("This user is already in the travelers");
      }

      const isInRequests = await TripService.checkIdInRequests(
        acceptId,
        tripId
      );
      if (!isInRequests) {
        throw new Error("This user is not in the requests");
      }

      const trip = await TripService.acceptRequest(acceptId, tripId);
      await UserService.addTravelId(acceptId, tripId);
      await UserService.removeRequestId(acceptId, tripId);
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

      const isInRequests = await TripService.checkIdInRequests(
        acceptId,
        tripId
      );
      if (!isInRequests) {
        throw new Error("This user is not in the requests");
      }

      const trip = await TripService.rejectRequest(acceptId, tripId);
      await UserService.removeRequestId(acceptId, tripId);
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTravelIdOfUser(req, res) {
    const { userId } = req.body;
    try {
      const trips = await TripService.getAllTravelIdOfUser(userId);
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRequestIdOfUser(req, res) {
    const { userId } = req.body;
    try {
      const trips = await TripService.getAllRequestIdOfUser(userId);
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTravellers(req, res) {
    const { tripId } = req.body;
    try {
      const travellers = await TripService.getAllTravellers(tripId);
      res.status(200).json(travellers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TravelController();
