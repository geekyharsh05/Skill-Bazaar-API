import express from 'express'
import {
    adminRegister,
    adminLogin,
    getAdmin,
} from '../controllers/index.controllers'
import { authenticateJwt } from '../middleware/index.middleware'

const router = express.Router()

router.route('/register').post(adminRegister)
router.route('/login').post(adminLogin)
router.route('/me').get(authenticateJwt, getAdmin)

export const adminRouter = router
