import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Survivor from '../models/Survivor';

const createSurvivor = (req: Request, res: Response, next: NextFunction) => {
    const {
        first_name,
        last_name,
        nick_name,
        survival,
        insanity,
        lumi,
        movement,
        accuracy,
        strength,
        evasion,
        luck,
        speed,
        systemic_pressure,
        torment,
        courage,
        understanding,
        lifetime_reroll,
        hunt_xp,
        weapon_type,
        weapon_xp,
        skip_next_hunt,
        philosophy,
        philosophy_rank,
        fighting_arts,
        secret_fighting_art,
        cannot_use_fighting_arts,
        disorders,
        abilities_impairments,
        knowledges,
        is_dead,
        death_story,
        is_retired,
        father,
        mother,
    } = req.body;

    const survivor = new Survivor({
        _id: new mongoose.Types.ObjectId(),
        first_name,
        last_name,
        nick_name,
        survival,
        insanity,
        lumi,
        movement,
        accuracy,
        strength,
        evasion,
        luck,
        speed,
        systemic_pressure,
        torment,
        courage,
        understanding,
        lifetime_reroll,
        hunt_xp,
        weapon_type,
        weapon_xp,
        skip_next_hunt,
        philosophy,
        philosophy_rank,
        fighting_arts,
        secret_fighting_art,
        cannot_use_fighting_arts,
        disorders,
        abilities_impairments,
        knowledges,
        is_dead,
        death_story,
        is_retired,
        father,
        mother,
    });

    return survivor
        .save()
        .then((survivor) => res.status(201).json({ survivor }))
        .catch((error) => res.status(500).json({ error }));
};

const readSurvivor = (req: Request, res: Response, next: NextFunction) => {
    const survivorId = req.params.settlementId;

    return Survivor.findById(survivorId)
        .then((survivor) =>
            survivor ? res.status(200).json({ survivor }) : res.status(404).json({ message: 'Survivor Not Found' }),
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllSurvivors = (req: Request, res: Response, next: NextFunction) => {
    return Survivor.find()
        .then((survivors) =>
            survivors ? res.status(200).json({ survivors }) : res.status(404).json({ message: 'Survivors Not Found' }),
        )
        .catch((error) => res.status(500).json({ error }));
};

const updateSurvivor = (req: Request, res: Response, next: NextFunction) => {
    const survivorId = req.params.settlementId;

    return Survivor.findById(survivorId)
        .then((survivor) => {
            if (survivor) {
                survivor.set(req.body);
                return survivor
                    .save()
                    .then((survivor) => res.status(201).json({ survivor }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Survivor Not Found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteSurvivor = (req: Request, res: Response, next: NextFunction) => {
    const survivorId = req.params.settlementId;

    return Survivor.findByIdAndDelete(survivorId)
        .then((survivor) =>
            survivor
                ? res.status(201).json({ message: 'deleted' })
                : res.status(404).json({ message: 'Survivor Not Found' }),
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createSurvivor,
    readSurvivor,
    readAllSurvivors,
    updateSurvivor,
    deleteSurvivor,
};
