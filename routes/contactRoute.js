import express from "express";
import { createContant, deleteContant, getAllContant, getContantById, updatedContant } from "../controller/contactController.js";

const router = express.Router();

router.route('/').post(createContant).get(getAllContant)

router.route('/:id').put(updatedContant).delete(deleteContant).get(getContantById)


export default router;