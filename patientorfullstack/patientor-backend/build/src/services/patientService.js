"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addEntry = (entry, patientId) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    const currPatientIndex = patients_1.default.findIndex((patient) => patient.id === patientId);
    if (currPatientIndex < 0) {
        throw new Error("No such patient");
    }
    patients_1.default[currPatientIndex].entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
};
