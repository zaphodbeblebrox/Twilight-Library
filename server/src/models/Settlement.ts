import mongoose, { Document, Schema } from 'mongoose';

export interface SettlementInterface {
    name: string;
    survival_limit: number;
    arc_survivors: boolean;
    cognition_amount: number;
    notes: string;
    principle_conviction: string;
    principle_death: string;
    principle_new_life: string;
    principle_society: string;
    resources: Record<string, number>;
    gear: Record<string, number>;
    innovations: string[];
    patterns: string[];
    locations: string[];
    knowledges: string[];
    current_year: Number;
    timeline: Record<number, string[]>;
    quarries: Record<string, Record<string, Record<number, boolean>>>;
    nemesis: Record<string, Record<string, Record<number, boolean>>>;
    survivors: number[];
    courage_event_1: string;
    courage_event_2: string;
    understanding_event_1: string;
    understanding_event_2: string;
    milestones: Record<string, boolean>;
    constellations: boolean;
}

export interface SettlementModel extends SettlementInterface, Document {}

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

export default mongoose.model<SettlementModel>('Settlements', SettlementSchema);
