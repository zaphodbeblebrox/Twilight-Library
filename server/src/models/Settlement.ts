import mongoose, { Document, Schema } from 'mongoose';

export interface SettlementInterface {
    name: string;
}

export interface SettlementModel extends SettlementInterface, Document {}

const SettlementSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        survival_limit: {
            type: Number,
            default: 1,
            required: false,
        },
    },
    {
        versionKey: false /* Probably want to enable this later, useful with concurent edits*/,
    },
);

export default mongoose.model<SettlementModel>('Settlement', SettlementSchema);
