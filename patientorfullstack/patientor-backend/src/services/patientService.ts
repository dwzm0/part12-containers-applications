import patients from "../../data/patients";
import {
  Patient,
  NonSensitivePatientEntry,
  newPatientEntry,
  EntryWithoutId
  
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: newPatientEntry): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};


const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (entry: EntryWithoutId, patientId: string): EntryWithoutId => {
  const newEntry = {...entry, id: uuid(), };
  const currPatientIndex = patients.findIndex((patient) => patient.id === patientId);

  if (currPatientIndex < 0) {
    throw new Error("No such patient");
  }

  patients[currPatientIndex].entries.push(newEntry);
  return newEntry;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};
