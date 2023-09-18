import express from 'express';
import controller from '../controlllers/survivorController';

const router = express.Router();

router.post('/create', controller.createSurvivor);
router.get('/get/:survivorId', controller.readSurvivor);
router.get('/get', controller.readAllSurvivors);
router.patch('/update/:survivorId', controller.updateSurvivor);
router.delete('/delete/:survivorId', controller.deleteSurvivor);

export = router;
