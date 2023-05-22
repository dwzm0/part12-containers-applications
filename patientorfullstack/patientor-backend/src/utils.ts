import { newPatientEntry, Gender,HealthCheckRating, Diagnosis, EntryWithoutId,
  HospitalEntryWithoutId, OccupationalHealthcareEntryWithoutId, HealthCheckEntryWithoutId, SickLeave,
     } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing name");
  }
  return criteria;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isRating(rating)) {
    throw new Error("Incorrect rating: " + rating);
  }
  return rating;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isArray = (arg: unknown): arg is unknown[] => {
  return Array.isArray(arg);
};

const parseSickLeave = (leave: any): SickLeave | undefined => {
  if (leave) {
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      !isDate(leave.startDate) ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      !isDate(leave.endDate) ||
      !isString(leave.startDate) ||
      !isString(leave.endDate) 
    ) {
      throw new Error(
        "Wrong format in sick leave"
      );
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    } else return { startDate: leave.startDate, endDate: leave.endDate };
    } else {
      return undefined;
    }
};

const parseDiagnosisCodes = (arr: unknown): Array<Diagnosis['code']> | undefined =>  {
  if (!isArray(arr) || !arr.every((code): code is string => isString(code))) {
    throw new Error('Diagnosis codes must be an array of strings.');
  }else {
    return arr;
  }
};

export const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: newPatientEntry = {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
 
  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object ||
    "diagnosisCodes" in object
  ) {
    const newBaseEntry = {
      type: parseType(object.type),
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    switch (object.type) {
      case "Hospital":
        const newHospital: HospitalEntryWithoutId = {
          ...newBaseEntry,
          type: "Hospital",
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseCriteria(object.discharge.criteria)
          }
        };
        return newHospital;
      case "HealthCheck":
        const newHealthCheck: HealthCheckEntryWithoutId = {
          ...newBaseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newHealthCheck;
        case "OccupationalHealthcare":
        const newOccupationalHealthcare: OccupationalHealthcareEntryWithoutId = {
          ...newBaseEntry,
          type: "OccupationalHealthcare",
          employerName: parseName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
        };
        return newOccupationalHealthcare;
        default:
          throw new Error("Type error");
      }
      
  }

  throw new Error("Incorrect data: some fields are missing");

};




