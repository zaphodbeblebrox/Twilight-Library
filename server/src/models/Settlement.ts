import mongoose, { Document, Schema } from 'mongoose';
import { TypeServerSettlement } from '../../../SettlementTypes';

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
        resources: {
            type: Object,
            required: true,
            default: {},
            // TODO: Add proper validation
            // validate: {
            //     validator: (value: String) => {
            //         for (const key in value) {
            //             if (typeof value[key] !== 'number') {
            //                 return false;
            //             }
            //         }
            //         return true;
            //     },
            //     message: 'Resources is strictly an Record<string, number>!!!',
            // },
        },
        gear: {
            type: Object,
            required: true,
            default: {},
            // TODO: Add proper validation
            // validate: {
            //     validator: (value: String) => {
            //         for (const key in value) {
            //             if (typeof value[key] !== 'number') {
            //                 return false;
            //             }
            //         }
            //         return true;
            //     },
            //     message: 'Gear is strictly an Record<string, number>!!!',
            // },
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
            type: [Object],
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
        intimacy: {
            type: String,
            required: true,
        },
        principle_conviction: {
            type: Object,
            required: true,
            // TODO: Create proper validation check
        },
        principle_death: {
            type: Object,
            required: true,
            // TODO: Create proper validation check
        },
        principle_new_life: {
            type: Object,
            required: true,
            // TODO: Create proper validation check
        },
        principle_society: {
            type: Object,
            required: true,
            // TODO: Create proper validation check
        },
        milestones: {
            type: Object,
            required: true,
            // TODO: Create proper validation check
        },
        constellations: {
            type: Boolean,
            required: false,
            default: false,
        },
        settlement_lost: {
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
