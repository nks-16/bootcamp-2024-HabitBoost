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
const habitController_1 = require("../controllers/habitController");
const app = (0, express_1.Router)();
// Create a new habit (POST)
app.post('/habits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, habitName, habitColor, goal } = req.body;
    console.log(req.body);
    // if (!userId || !habitName || !goal) {
    //   res.status(400).send({ message: 'Missing required fields' });
    //   return ;
    // }
    try {
        const result = yield (0, habitController_1.createHabit)(userId, habitName, habitColor, goal);
        res.status(201).send(result);
    }
    catch (error) {
        console.error(error);
        console.error(`Error creating habit: `);
        res.status(500).send({ message: 'An error occurred while creating the habit' });
    }
}));
// Get habit details (GET)
app.get('/habits/:userId/:habitId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, habitId } = req.params;
    if (!userId || !habitId) {
        res.status(400).send({ message: 'Missing required parameters' });
        return;
    }
    try {
        const habit = yield (0, habitController_1.getHabit)(Number(userId), Number(habitId));
        if (!habit) {
            res.status(404).send({ message: 'Habit not found' });
            return;
        }
        res.status(200).send(habit);
    }
    catch (error) {
        console.error(`Error fetching habit: `);
        res.status(500).send({ message: 'An error occurred while fetching the habit' });
    }
}));
// Update an existing habit (PUT)
app.put('/habits/:habitId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { habitName, habitColor, goal } = req.body;
    const { habitId } = req.params;
    if (!habitId || !habitName || !goal) {
        res.status(400).send({ message: 'Missing required fields' });
        return;
    }
    try {
        const result = yield (0, habitController_1.updateHabit)(Number(habitId), habitName, habitColor, goal);
        res.status(200).send(result);
    }
    catch (error) {
        console.error(`Error updating habit: `);
        res.status(500).send({ message: 'An error occurred while updating the habit' });
    }
}));
// Delete a habit (DELETE)
app.delete('/habits/:habitId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { habitId } = req.params;
    if (!habitId) {
        res.status(400).send({ message: 'Habit ID is required' });
        return;
    }
    try {
        const result = yield (0, habitController_1.deleteHabit)(Number(habitId));
        res.status(200).send(result);
    }
    catch (error) {
        console.error(`Error deleting habit`);
        res.status(500).send({ message: 'An error occurred while deleting the habit' });
    }
}));
exports.default = app;
