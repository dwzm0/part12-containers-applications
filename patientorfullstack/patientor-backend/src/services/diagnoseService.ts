import diagnoseEntries from "../../data/diagnoses";
import { Diagnosis, NonSensitiveDiagnoseEntry } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoseEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoseEntry[] => {
  return diagnoseEntries.map(({ code, name }) => ({
    code,
    name,
  }));
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
  getNonSensitiveEntries,
};
