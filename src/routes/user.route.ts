import express from 'express';
import {
  userRegister,
  userLogin,
  getUser,
} from '../controllers/index.controllers';
import { authenticateJwt } from '../middleware/index.middleware';

const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/me').get(authenticateJwt, getUser);

export const userRouter = router;
