import express from 'express';
import controller from '../controlllers/settlementController';

const router = express.Router();

router.post('/create', controller.createSettlement);
router.get('/get/:settlementId', controller.readSettlement);
router.get('/get', controller.readAllSettlements);
router.patch('/update/:settlementId', controller.updateSettlement);
router.delete('/delete/:settlementId', controller.deleteSettlement);

export = router;
