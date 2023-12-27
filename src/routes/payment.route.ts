import express from 'express'
import {
    makePayment,
    getAllPaidCourses,
    hasUserPurchase,
} from '../controllers/index.controllers'
import { authenticateJwt } from '../middleware/index.middleware'

const router = express.Router()

router.route('/pay/:courseId').post(authenticateJwt, makePayment)
router.route('/getpaidcourses').get(authenticateJwt, getAllPaidCourses)
router.route('/haspurchased/:courseId').get(authenticateJwt, hasUserPurchase)

export const paymentRoute = router
