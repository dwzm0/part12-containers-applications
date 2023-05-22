"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};
const parseType = (type) => {
    if (!type || !isString(type)) {
        throw new Error("Incorrect or missing type");
    }
    return type;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }
    return specialist;
};
const parseCriteria = (criteria) => {
    if (!criteria || !isString(criteria)) {
        throw new Error("Incorrect or missing name");
    }
    return criteria;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const isNumber = (num) => {
    return typeof num === "number" || num instanceof Number;
};
const isRating = (param) => {
    return Object.values(types_1.HealthCheckRating)
        .includes(param);
};
const parseHealthCheckRating = (rating) => {
    if (!isNumber(rating) || !isRating(rating)) {
        throw new Error("Incorrect rating: " + rating);
    }
    return rating;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error("Incorrect or missing date of birth");
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const isArray = (arg) => {
    return Array.isArray(arg);
};
const parseSickLeave = (leave) => {
    if (leave) {
        if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        !isDate(leave.startDate) ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            !isDate(leave.endDate) ||
            !isString(leave.startDate) ||
            !isString(leave.endDate)) {
            throw new Error("Wrong format in sick leave");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        }
        else
            return { startDate: leave.startDate, endDate: leave.endDate };
    }
    else {
        return undefined;
    }
};
const parseDiagnosisCodes = (arr) => {
    if (!isArray(arr) || !arr.every((code) => isString(code))) {
        throw new Error('Diagnosis codes must be an array of strings.');
    }
    else {
        return arr;
    }
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
        };
        return newEntry;
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.toNewPatientEntry = toNewPatientEntry;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("type" in object &&
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "healthCheckRating" in object ||
        "diagnosisCodes" in object) {
        const newBaseEntry = {
            type: parseType(object.type),
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };
        switch (object.type) {
            case "Hospital":
                const newHospital = Object.assign(Object.assign({}, newBaseEntry), { type: "Hospital", discharge: {
                        date: parseDate(object.discharge.date),
                        criteria: parseCriteria(object.discharge.criteria)
                    } });
                return newHospital;
            case "HealthCheck":
                const newHealthCheck = Object.assign(Object.assign({}, newBaseEntry), { type: "HealthCheck", healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
                return newHealthCheck;
            case "OccupationalHealthcare":
                const newOccupationalHealthcare = Object.assign(Object.assign({}, newBaseEntry), { type: "OccupationalHealthcare", employerName: parseName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
                return newOccupationalHealthcare;
            default:
                throw new Error("Type error");
        }
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.toNewEntry = toNewEntry;
