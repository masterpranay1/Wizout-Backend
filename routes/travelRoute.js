import express from "express";
import TravelController from "../controller/travelController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Travel Route!!");
});

// @trips api

// TODO: Verify is user is logged in

// Create a trip
router.post("/create-trip", TravelController.createTrip);

// Get all trips
router.get("/get-all-trips-id", TravelController.getAllTripsId);

// get all trips id of a user
router.post("/get-all-trips-id-created-by-user", TravelController.getAllTripsIdCreatedbyUser);

// Get a trip by id
router.post("/get-trip-by-id", TravelController.getTripById);

// send a request to join a trip
router.post("/send-request", TravelController.sendRequest);

// get all requests of a certain trip
router.post("/get-all-requests", TravelController.getAllRequests);

// accept a request
router.post("/accept-request", TravelController.acceptRequest);

// reject a request
router.post("/reject-request", TravelController.rejectRequest);

// get all travel id ( created + requested and accepted) of a user
router.post("/get-all-travel-id-of-user", TravelController.getAllTravelIdOfUser);

// get all requests of a user
router.post("/get-all-request-id-of-user", TravelController.getAllRequestIdOfUser);

// get all travellers of a trip
router.post("/get-all-travellers", TravelController.getAllTravellers);


export default router;
