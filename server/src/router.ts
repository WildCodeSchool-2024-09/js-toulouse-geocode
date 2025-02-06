import express from "express";

const router = express.Router();
const routerWs = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import bookingActions from "./modules/booking/bookingActions";
import cityActions from "./modules/city/cityActions";
import codeInseeActions from "./modules/codeInsee/codeInseeActions";
import contactActions from "./modules/contact/contactActions";
import geoCoordsActions from "./modules/geoCoords/geoCoordsActions";
import csvManagementActions from "./modules/insertData/insertDataAction";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import modifyPhotoActions from "./modules/modifyPhoto/modifyPhotoActions";
import operatorActions from "./modules/operator/operatorActions";
import outletActions from "./modules/outlet/outletActions";
import postalcodeActions from "./modules/postalCode/postalcodeActions";
import providerActions from "./modules/provider/providerActions";
import signActions from "./modules/sign/signActions";
import stationActions from "./modules/station/stationActions";
import userActions from "./modules/user/userActions";
import userPhotoActions from "./modules/userPhoto/userPhotoActions";
import vehicleActions from "./modules/vehicle/vehicleActions";

import temporaryCodeActions from "./modules/temporaryCode/temporaryCodeActions";
import webSocketActions from "./modules/webSocket/webSocketActions";

router.post("/api/csv", csvManagementActions.addStations);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/stations/geolocation", stationActions.browseByGeoLocation);
router.get("/api/stations/outlet/:id", outletActions.readAllByStation);

router.get("/api/users/verify-email", userActions.verifyEmail);
router.post("/api/contacts", contactActions.validate, contactActions.add);
router.post("/api/users", authActions.hashPassword, userActions.add);

router.get("/api/tempcode/:id", temporaryCodeActions.read);
router.post("/api/tempcode/:id", temporaryCodeActions.add);
router.delete("/api/tempcode/:id", temporaryCodeActions.destroy);

router.post("/api/login", authActions.login);

router.post("/api/admin/login", authActions.adminLogin);

router.use(authActions.verifyToken);

router.get("/api/logout", authActions.disconnect);
router.get("/api/admin/logout", authActions.disconnect);

router.get("/api/stations", stationActions.browse);
router.get("/api/auth", authActions.verifyRequest);

router.get("/api/get-photo/:user_id", userPhotoActions.browse);
router.put(
  "/api/upload-photo/:user_id",
  modifyPhotoActions.validatePhoto,
  userPhotoActions.update,
);

router.delete("/api/delete-photo/:user_id", userPhotoActions.deleteAction);

router.get("/api/stations/:id", stationActions.read);
router.put("/api/stations/:id", stationActions.updateStationInfos);
router.delete("/api/stations/:id", stationActions.destroy);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", userActions.updateUserInfos);
router.delete("/api/users/:id", userActions.destroy);

router.get("/api/vehicles/user/:id", vehicleActions.readByUserId);
router.get("/api/vehicles/:id", vehicleActions.read);
router.put("/api/vehicles/:id", vehicleActions.updateVehicleInfos);
router.post("/api/vehicles", vehicleActions.add);
router.delete("/api/vehicles/:id", vehicleActions.destroy);

router.get("/api/inseecodes/:id", codeInseeActions.read);

router.get("/api/cities/:id", cityActions.read);

router.get("/api/signs/:id", signActions.read);

router.get("/api/operators/:id", operatorActions.read);

router.get("/api/providers/:id", providerActions.read);

router.get("/api/postalcodes/:id", postalcodeActions.read);

router.get("/api/geocoords/:id", geoCoordsActions.read);

router.get("/api/outlets/:id", outletActions.read);

router.get("/api/vehicles", vehicleActions.browse);

const mountRouter = () => {
  routerWs.ws("/api/ws", webSocketActions.webSocketEngine);
};

router.get("/api/bookings/user/:id", bookingActions.readAllByUser);
router.post("/api/bookings", bookingActions.add);
router.delete("/api/bookings/:id", bookingActions.destroy);

/* ************************************************************************* */

export { router, routerWs, mountRouter };
