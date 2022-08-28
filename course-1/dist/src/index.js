"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
const jsonMiddleWare = express_1.default.json();
exports.app.use(jsonMiddleWare);
const db = [
    { id: 1, curse: 'front-end' },
    { id: 2, curse: 'back-end' },
    { id: 3, curse: 'angular' },
    { id: 4, curse: 'js' }
];
exports.app.get('/', (req, res) => {
    res.json('Привет backend');
});
exports.app.get('/courses', (req, res) => {
    let foundCurseQuery = db;
    if (req.query.title) {
        foundCurseQuery = db.filter(({ curse }) => curse.indexOf(req.query.title) > -1);
    }
    res.json(foundCurseQuery);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCurse = db.find(({ id }) => id === Number(req.params.id)) || [];
    res.json(foundCurse);
});
exports.app.post('/courses', (req, res) => {
    const { curse } = req.body;
    if (!curse) {
        res.send(400);
        return;
    }
    const createdCourses = {
        id: Number(new Date()), curse: req.body.curse
    };
    db.push(createdCourses);
    res.status(201).json(createdCourses);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
