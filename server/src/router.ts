import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import csvManagementActions from "./modules/insertData/insertDataAction";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import modifyPhotoActions from "./modules/modifyPhoto/modifyPhotoActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.post("/api/csv", csvManagementActions.create);

router.post("/api/upload-photo", modifyPhotoActions.modifyPhoto);

/* ************************************************************************* */

export default router;
