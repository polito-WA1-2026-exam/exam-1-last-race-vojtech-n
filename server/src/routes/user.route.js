'use strict';

import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { isLoggedIn, isTargetUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', userController.registerUser);
router.get('/', userController.getUsersByScore);
router.patch('/:username/score', isLoggedIn, isTargetUser, userController.updateBestScore);
router.post('/:username/game', isLoggedIn, isTargetUser, userController.registerGame);

export default router;