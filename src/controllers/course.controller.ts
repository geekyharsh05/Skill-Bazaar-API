import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Course } from '../db/models/index.schema';
import client from '../redis/client.redis';
dotenv.config();

export const createCourse = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            price,
            imageLink,
            published,
            rating,
            instructor,
            duration,
            language,
            videoLink,
            tag,
            courseContent,
            prerequisite,
        } = req.body;

        const newCourse = new Course({
            title,
            description,
            price,
            imageLink,
            published,
            rating,
            instructor,
            duration,
            language,
            videoLink,
            tag,
            courseContent,
            prerequisite,
            createdAt: new Date(),
        });

        const savedCourse = await newCourse.save();

        res.status(201).json({
            message: 'Course created successfully',
            course: savedCourse,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to create course',
            error: error.message,
        });
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const cachedValue = await client.get('Courses');

        if (cachedValue) {
            const parsedData = JSON.parse(cachedValue);
            return res.status(201).json({
                message: 'All courses retrieved successfully',
                courses: parsedData,
            });
        }

        const courses = await Course.find();

        await client.set('Courses', JSON.stringify(courses));
        await client.expire('Courses', 30);

        res.status(201).json({
            message: 'All courses retrieved successfully',
            courses: courses,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to retrieve courses',
            error: error.message,
        });
    }
};

export const getCourse = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found',
            });
        }

        res.status(200).json({
            message: 'Course retrieved successfully',
            course: course,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to retrieve course',
            error: error.message,
        });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const updateData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            {
                new: true,
            }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: 'Course not found',
            });
        }

        res.status(200).json({
            message: 'Course updated successfully',
            course: updatedCourse,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to update course',
            error: error.message,
        });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        await Course.findByIdAndRemove(courseId);
        res.status(204).send('Course deleted successfully');
    } catch (err: any) {
        console.error(err);
        res.status(500).send('Error deleting course');
    }
};
