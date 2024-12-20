
import express from 'express';
import { createUser } from './../controller/userController.js';
const router = express.Router();

router.route('/').post(createUser);
// router.route('/').post(login);
// router.route('/me').get(me)

export default router;