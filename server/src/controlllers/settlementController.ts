import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Settlement from '../models/Settlement';

export type AxiosError = {
    code: string;
    config: {};
    message: string;
    name: string;
    request: {};
    response: {};
    stack: string;
}

const createSettlement = (req: Request, res: Response, next: NextFunction) => {
    const {
        name,
        timeline,
        quarries,
        nemesis,
        constellations,
        arc_survivors,
        understanding_event_1,
        understanding_event_2,
        courage_event_1,
        courage_event_2,
        milestones,
        resources,
        gear,
        intimacy,
        principle_conviction,
        principle_death,
        principle_new_life,
        principle_society,
    } = req.body;

    const settlement = new Settlement({
        _id: new mongoose.Types.ObjectId(),
        name,
        timeline,
        quarries,
        nemesis,
        courage_event_1,
        courage_event_2,
        milestones,
        understanding_event_1,
        understanding_event_2,
        arc_survivors,
        constellations,
        resources,
        gear,
        intimacy,
        principle_conviction,
        principle_death,
        principle_new_life,
        principle_society,
    });

    return settlement
        .save()
        .then((settlement) => res.status(201).json({ settlement }))
        .catch((error: AxiosError) => res.status(500).json({ error }));
};

const readSettlement = (req: Request, res: Response, next: NextFunction) => {
    const settlementId = req.params.settlementId;

    return Settlement.findById(settlementId)
        .then((settlement) =>
            settlement
                ? res.status(200).json({ settlement })
                : res.status(404).json({ message: 'Settlement Not Found' }),
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllSettlements = (req: Request, res: Response, next: NextFunction) => {
    return Settlement.find()
        .then((settlements) =>
            settlements
                ? res.status(200).json({ settlements })
                : res.status(404).json({ message: 'Settlement Not Found' }),
        )
        .catch((error) => res.status(500).json({ error }));
};

const updateSettlement = (req: Request, res: Response, next: NextFunction) => {
    const settlementId = req.params.settlementId;

    return Settlement.findById(settlementId)
        .then((settlement) => {
            if (settlement) {
                settlement.set(req.body);
                return settlement
                    .save()
                    .then((settlement) => res.status(201).json({ settlement }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Settlement Not Found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteSettlement = (req: Request, res: Response, next: NextFunction) => {
    const settlementId = req.params.settlementId;

    return Settlement.findByIdAndDelete(settlementId)
        .then((settlement) =>
            settlement
                ? res.status(201).json({ message: 'deleted' })
                : res.status(404).json({ message: 'Settlement Not Found' }),
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createSettlement,
    readSettlement,
    readAllSettlements,
    updateSettlement,
    deleteSettlement,
};
