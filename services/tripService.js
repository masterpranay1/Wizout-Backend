import TripModel from "../models/tripModel.js";

class TripService {
  async addTrip(trip) {
    console.log(trip);
    const newTrip = new TripModel({
      ...trip,
      requests: [],
      travelers: [],
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
}

export default new TripService();
