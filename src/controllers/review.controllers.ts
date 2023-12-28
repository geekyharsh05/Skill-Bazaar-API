import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Course, User } from '../db/models/index.schema';
import client from '../redis/client.redis';

interface Review {
    user: mongoose.Types.ObjectId | undefined;
    text: any;
    createdAt: Date;
}

export const postReview = async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const review: Review = {
            user: new mongoose.Types.ObjectId(req.userId),
            text: req.body.text,
            createdAt: new Date(),
        };

        course.reviews.push(review);

        await course.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getReview = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const cacheKey = `Reviews:${courseId}`;

        const cachedValue = await client.get(cacheKey);

        if (cachedValue) {
            const parsedData = JSON.parse(cachedValue);
            return res.status(200).json(parsedData);
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const reviews = course.reviews;

        const reviewsWithUserNames = await Promise.all(
            reviews.map(async (review) => {
                const user = await User.findById(review.user);
                if (user) {
                    return {
                        //@ts-ignore
                        ...review._doc,
                        user: user.name,
                    };
                }
                return review;
            })
        );

        await client.set(cacheKey, JSON.stringify(reviewsWithUserNames));
        await client.expire(cacheKey, 30);

        res.status(200).json(reviewsWithUserNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
