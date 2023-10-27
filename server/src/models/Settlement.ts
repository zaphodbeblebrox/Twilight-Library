import mongoose, { Document, Schema } from 'mongoose';
import { TypeServerSettlement } from '../../../SettlementTypes';

// export interface SettlementModel extends TypeServerSettlement, Document {}

const SettlementSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Settlement Name is required for creation'],
        },
        survival_limit: {
            type: Number,
            default: 1,
            required: false,
        },
        arc_survivors: {
            type: Boolean,
            default: false,
            required: false,
        },
        cognition_amount: {
            type: Number,
            default: 1,
            required: false,
        },
        notes: {
            type: String,
            required: false,
            default: '',
        },
        principle_conviction: {
            type: String,
            required: false,
            default: null,
        },
        principle_death: {
            type: String,
            required: false,
            default: null,
        },
        principle_new_life: {
            type: String,
            required: false,
            default: null,
        },
        principle_society: {
            type: String,
            required: false,
            default: null,
        },
        resources: {
            type: Object,
            required: false,
            default: {},
            validate: {
                validator: (value: String) => {
                    for (const key in value) {
                        if (typeof value[key] !== 'number') {
                            return false;
                        }
                    }
                    return true;
                },
                message: 'Resources is strictly an Record<string, number>!!!',
            },
        },
        gear: {
            type: Object,
            required: false,
            default: {},
            validate: {
                validator: (value: String) => {
                    for (const key in value) {
                        if (typeof value[key] !== 'number') {
                            return false;
                        }
                    }
                    return true;
                },
                message: 'Gear is strictly an Record<string, number>!!!',
            },
        },
        innovations: {
            type: [String],
            required: false,
            default: [],
        },
        patterns: {
            type: [String],
            required: false,
            default: [],
        },
        locations: {
            type: [String],
            required: false,
            default: [],
        },
        knowledges: {
            type: [String],
            required: false,
            default: [],
        },
        current_year: {
            type: Number,
            required: false,
            default: 1,
        },
        timeline: {
            type: Object,
            required: [true, 'Timeline is required for creation'],
        },
        quarries: {
            type: Object,
            required: [true, 'Quarries are required for creation'],
        },
        nemesis: {
            type: Object,
            required: [true, 'Nemesis are required for creation'],
        },
        survivors: {
            type: [Number],
            required: false,
            default: [],
        },
        courage_event_1: {
            type: String,
            required: true,
        },
        courage_event_2: {
            type: String,
            required: true,
        },
        understanding_event_1: {
            type: String,
            required: true,
        },
        understanding_event_2: {
            type: String,
            required: true,
        },
        milestones: {
            type: Object,
            required: true,
            // validate: {
            //     validator: (value: String) => {
            //         for (const key in value) {
            //             if (typeof value[key] !== 'boolean') {
            //                 return false;
            //             }
            //         }
            //         return true;
            //     },
            //     message: 'Resources is strictly an Record<string, boolean>!!!',
            // },
        },
        constellations: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        versionKey: false /* Probably want to enable this later, useful with concurent edits*/,
    },
);

export default mongoose.model<TypeServerSettlement>('Settlements', SettlementSchema);
