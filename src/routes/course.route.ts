import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  postReview,
  getReview,
} from '../controllers/index.controllers';
import { authenticateJwt } from '../middleware/index.middleware';

const router = express.Router();

router.route('/createcourse').post(authenticateJwt, createCourse);
router.route('/getallcourses').get(getAllCourses);
router.route('/getcourse/:courseId').get(getCourse);
router.route('/updatecourse/:courseId').put(updateCourse);
router.route('/deletecourse/:courseId').delete(deleteCourse);
router.route('/review/:courseId').post(authenticateJwt, postReview);
router.route('/getreview/:courseId').get(getReview);

export const courseRouter = router;
