import express from "express";
import { createContant, deleteContant, getAllContant, getContantById, updatedContant } from "../controller/contactController.js";
import { validTokenHandler } from "../middleware/validTokenHandler.js";

const router = express.Router();

router.use(validTokenHandler)
router.route('/').post(createContant).get(getAllContant)

router.route('/:id').put(updatedContant).delete(deleteContant).get(getContantById)


export default router;