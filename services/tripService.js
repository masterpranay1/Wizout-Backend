import TripModel from "../models/tripModel.js";
import UserModel from "../models/userModel.js";

class TripService {
  async addTrip(trip, userId) {
    const newTrip = new TripModel({
      ...trip,
      requests: [],
      travelers: [userId],
    });
    await newTrip.save();
    return newTrip;
  }

  async getTripById(id) {
    const trip = await TripModel.findById(id);
    return trip;
  }

  async getAllTripsId(filter) {
    const trips = await TripModel.find({
      ...filter,
    }).select("_id");
    return trips.map((trip) => trip._id);
  }

  async deleteTripById(id) {
    const deletedTrip = await TripModel.findByIdAndDelete(id);
    return deletedTrip;
  }

  async sendRequest(userId, tripId) {
    const trip = await TripModel.findById(tripId);
    trip.requests.push(userId);
    await trip.save();
    return trip;
  }

  async getAllRequests(tripId) {
    const trip = await TripModel.findById(tripId);
    return trip.requests;
  }

  async getAllTravellers(tripId) {
    const trip = await TripModel.findById(tripId);
    return trip.travelers;
  }

  async acceptRequest(userId, tripId) {
    const trip = await TripModel.findById(tripId);
    trip.requests = trip.requests.filter((request) => request.toString() !== userId);
    trip.travelers.push(userId);
    await trip.save();
    return trip;
  }

  async rejectRequest(userId, tripId) {
    const trip = await TripModel.findById(tripId);
    trip.requests = trip.requests.filter((request) => request.toString() !== userId);
    await trip.save();
    return trip;
  }

  async isOwner(userId, tripId) {
    const trip = await TripModel.findById(tripId);
    return trip.userId.toString() === userId;
  }

  async checkIdInRequests(userId, tripId) {
    const trip = await TripModel.findById(tripId);
    const isInRequests = trip.requests.some((request) => request.toString() === userId);
    return isInRequests;
  }

  async checkIdInTravelers(userId, tripId) {
    const trip = await TripModel.findById(tripId);
    const isInTravelers = trip.travelers.some((traveler) => traveler.toString() === userId);
    return isInTravelers;
  }

  async getAllTravelIdOfUser(userId) {
    const travelId = await UserModel.findById(userId).select("travelId");
    const travelIdArray = travelId.travelId;
    return travelIdArray;
  }

  async getAllRequestIdOfUser(userId) {
    const requests = await UserModel.findById(userId).select("requestId");
    const requestsArray = requests.requestId;
    return requestsArray;
  }
}

export default new TripService();
