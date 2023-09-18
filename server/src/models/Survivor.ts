import mongoose, { Document, Schema } from 'mongoose';

export interface SurvivorInterface {
    first_name: string;
    last_name: string;
    nick_name: string;
    survival: number;
    insanity: number;
    lumi: number;
    movement: number;
    accuracy: number;
    strength: number;
    evasion: number;
    luck: number;
    speed: number;
    systemic_pressure: number;
    torment: number;
    courage: number;
    understanding: number;
    lifetime_reroll: boolean;
    hunt_xp: number;
    weapon_type: string;
    weapon_xp: number;
    skip_next_hunt: boolean;
    philosophy: string;
    philosophy_rank: number;
    fighting_arts: string[];
    secret_fighting_art: string;
    cannot_use_fighting_arts: boolean;
    disorders: string[];
    abilities_impairments: string[];
    knowledges: { name: string; observation: number }[];
    is_dead: boolean;
    death_story: string;
    is_retired: boolean;
    father: number;
    mother: number;
}

export interface SurvivorModel extends SurvivorInterface, Document {}

const SurvivorSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, 'The survivor needs a name!'],
        },
        last_name: {
            type: String,
            required: false,
        },
        nick_name: {
            type: String,
            required: false,
        },
        survival: {
            type: Number,
            default: 1,
            required: false,
        },
        insanity: {
            type: Number,
            default: 0,
            required: false,
        },
        movement: {
            type: Number,
            default: 5,
            required: false,
        },
        accuracy: {
            type: Number,
            default: 0,
            required: false,
        },
        strength: {
            type: Number,
            default: 0,
            required: false,
        },
        evasion: {
            type: Number,
            default: 0,
            required: false,
        },
        luck: {
            type: Number,
            default: 0,
            required: false,
        },
        speed: {
            type: Number,
            default: 0,
            required: false,
        },
        systemic_pressure: {
            type: Number,
            default: 0,
            required: false,
        },
        torment: {
            type: Number,
            default: 0,
            required: false,
        },
        courage: {
            type: Number,
            default: 0,
            required: false,
        },
        understanding: {
            type: Number,
            default: 0,
            required: false,
        },
        lifetime_reroll: {
            type: Boolean,
            default: false,
            required: false,
        },
        hunt_xp: {
            type: Number,
            default: 0,
            required: false,
        },
        weapon_type: {
            type: String,
            default: null,
            required: false,
        },
        weapon_xp: {
            type: Number,
            default: 0,
            required: false,
        },
        skip_next_hunt: {
            type: Boolean,
            default: false,
            required: false,
        },
        philosophy: {
            type: String,
            default: '',
            required: false,
        },
        philosophy_rank: {
            type: Number,
            default: 0,
            required: false,
        },
        fighting_arts: {
            type: [String],
            default: [],
            required: false,
            validate: {
                validator: (array: String[]) => {
                    return array.length <= 3;
                },
                message: 'A survivor may have a maximum of 3 fighting arts.',
            },
        },
        secret_fighting_art: {
            type: String,
            default: null,
            required: false,
        },
        cannot_use_fighting_arts: {
            type: Boolean,
            default: false,
            required: false,
        },
        disorders: {
            type: [String],
            default: [],
            required: false,
            validate: {
                validator: (array: String[]) => {
                    return array.length <= 3;
                },
                message: 'A survivor may have a maximum of 3 disorders.',
            },
        },
        abilities_impairments: {
            type: [String],
            default: [],
            required: false,
        },
        knowledges: {
            type: [{}],
            default: [],
            required: false,
        },
        is_dead: {
            type: Boolean,
            default: false,
            required: false,
        },
        death_story: {
            type: String,
            default: null,
            required: false,
        },
        is_retired: {
            type: Boolean,
            default: false,
            required: false,
        },
        father: {
            type: Number,
            default: null,
            required: false,
        },
        mother: {
            type: Number,
            default: null,
            required: false,
        },
    },
    {
        versionKey: false /* Probably want to enable this later, useful with concurent edits*/,
    },
);

export default mongoose.model<SurvivorModel>('Survivors', SurvivorSchema);
