import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import geoCoordsActions from "./modules/geoCoords/geoCoordsActions";
import csvManagementActions from "./modules/insertData/insertDataAction";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import modifyPhotoActions from "./modules/modifyPhoto/modifyPhotoActions";
import operatorActions from "./modules/operator/operatorActions";
import outletActions from "./modules/outlet/outletActions";
import postalcodeActions from "./modules/postalcode/postalcodeActions";
import providerActions from "./modules/provider/providerActions";
import signActions from "./modules/sign/signActions";
import stationActions from "./modules/station/stationActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.post("/api/csv", csvManagementActions.addStations);

router.post("/api/upload-photo", modifyPhotoActions.modifyPhoto);

router.get("/api/stations/geolocation", stationActions.browseByGeoLocation);
router.get("/api/stations/:id", stationActions.read);
router.get("/api/stations", stationActions.browse);

router.get("/api/signs/:id", signActions.read);

router.get("/api/operators/:id", operatorActions.read);

router.get("/api/providers/:id", providerActions.read);

router.get("/api/postalcodes/:id", postalcodeActions.read);

router.get("/api/geocoords/:id", geoCoordsActions.read);

router.get("/api/outlets/:id", outletActions.read);
/* ************************************************************************* */

export default router;
