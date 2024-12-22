
import express from 'express';
import { createUser,login,me } from './../controller/userController.js';
import { validTokenHandler } from '../middleware/validTokenHandler.js';
const router = express.Router();

router.route('/').post(createUser);
router.route('/login').post(login);
router.get('/me',validTokenHandler,me);

export default router;