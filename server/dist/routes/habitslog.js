"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitLogController_1 = require("../controllers/habitLogController");
const router = (0, express_1.Router)();
// POST request to create a new habit log
router.post('/log', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { habitId, habitName, userId } = req.body;
    try {
        const result = yield (0, habitLogController_1.createHabitLog)(habitId, habitName, userId);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
// PUT request to update habit log count
router.put('/log/:habitId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count } = req.body;
    const { habitId } = req.params;
    try {
        const result = yield (0, habitLogController_1.updateHabitLog)(Number(habitId), count);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
// GET request to get habit log details
router.get('/log/:userId/:habitId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, habitId } = req.params;
    const { startDate, endDate } = req.query;
    try {
        const logs = yield (0, habitLogController_1.getHabitLog)(Number(userId), Number(habitId), startDate, endDate);
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
// DELETE request to delete a habit log
router.delete('/log/:userId/:habitId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, habitId } = req.params;
    try {
        const result = yield (0, habitLogController_1.deleteHabitLog)(Number(userId), Number(habitId));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.default = router;
