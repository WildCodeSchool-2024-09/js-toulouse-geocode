import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import cityActions from "./modules/city/cityActions";
import contactActions from "./modules/contact/contactActions";
import departementActions from "./modules/department/departementActions";
import csvManagementActions from "./modules/insertData/insertDataAction";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import modifyPhotoActions from "./modules/modifyPhoto/modifyPhotoActions";
import postalCodeActions from "./modules/postalCode/postalCodeActions";
import stationActions from "./modules/station/stationActions";
import userActions from "./modules/user/userActions";
import userPhotoActions from "./modules/userPhoto/userPhotoActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.post("/api/csv", csvManagementActions.addStations);

router.get("/api/get-photo/:user_id", userPhotoActions.browse);
router.put(
  "/api/upload-photo/:user_id",
  modifyPhotoActions.validatePhoto,
  userPhotoActions.update,
);
router.delete("/api/delete-photo/:user_id", userPhotoActions.deleteAction);

router.get("/api/stations/geolocation", stationActions.browseByGeoLocation);
router.get("/api/stations/:id", stationActions.read);

router.get("api/departement/:id", departementActions.browse);

router.get("/api/postalcode/:id", postalCodeActions.read);

router.get("/api/city/:id", cityActions.read);

router.post("/api/contacts", contactActions.validate, contactActions.add);

router.post("/api/login", authActions.login);

router.get("/api/users/:id", userActions.browse);
router.post("/api/users", authActions.hashPassword, userActions.add);

/* ************************************************************************* */

export default router;
