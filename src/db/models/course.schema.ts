import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    rating: mongoose.Schema.Types.Decimal128,
    instructor: String,
    duration: mongoose.Schema.Types.Decimal128,
    language: String,
    videoLink: String,
    tag: String,
    courseContent: String,
    prerequisite: String,
    enrollments: Number,
    createdAt: Date,
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: String,
            createdAt: Date,
        },
    ],
});

export const Course = mongoose.model('Course', courseSchema);
