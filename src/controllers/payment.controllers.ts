import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Course } from '../db/models/index.schema';
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (req: Request, res: Response) => {
    try {
        const course = req.body;

        const lineItems = course.map(
            (product: { title: string; price: number }) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: 1,
            })
        );

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://127.0.0.1:5173/feed`,
            cancel_url: `http://127.0.0.1:5173/feed`,
        });

        const user = await User.findOne({ _id: req.userId });
        const courseId = req.params.courseId;
        const purchasedCourse = await Course.findById(courseId);
        if (user && purchasedCourse) {
            user.purchasedCourses.push(purchasedCourse._id);
            await user.save();
        } else {
            res.status(400).json('user or course is invalid');
        }

        res.json({ id: session.id });
    } catch (err: any) {
        res.status(403).json(err.message);
    }
};

export const getAllPaidCourses = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.userId }).populate(
            'purchasedCourses'
        );

        if (user) {
            const purchasedCourses = [user.purchasedCourses];

            res.status(200).json({ courses: purchasedCourses });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const hasUserPurchase = async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.userId });
    const courseId = new mongoose.Types.ObjectId(req.params.courseId);
    const id = req.params.courseId;
    const course = await Course.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }
    const hasPurchased = user.purchasedCourses.includes(courseId);
    if (hasPurchased) {
        return res.status(200).json({ hasPurchased: true });
    } else {
        return res.status(200).json({ hasPurchased: false });
    }
};
