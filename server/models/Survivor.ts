const mongoose = require('mongoose');

const PuzzleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Puzzle title is required!'],
        },

        size: {
            type: Number,
            enum: [[3, 9], 'Puzzle size must be 3 or 9'],
            required: [true, 'Puzzle size is required!'],
        },

        description: {
            type: String,
        },

        default_positions: {
            type: [[Number]],
            required: [true, 'Starting Puzzle Positions is required!'],
        },

        locked_positions: {
            type: [[Boolean]],
            required: [true, 'Locked Puzzle positions is required!'],
        },

        paired_positions: {
            type: [[String]],
            required: [true, 'Locked Puzzle positions is required!'],
        },

        solution_positions: {
            type: [[Number]],
            required: [true, 'Puzzle solution positions is required!'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Puzzles', PuzzleSchema);
