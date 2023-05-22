import { NonSensitiveDiagnoseEntry } from "./types";

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export const diagnoseNameParser  = (pCode: string, diagnoses: NonSensitiveDiagnoseEntry[]) : NonSensitiveDiagnoseEntry["name"] => {
    let subName = ""
    diagnoses.forEach((diagnose) => {
      if (diagnose.code === pCode) subName = diagnose.name
    })
    return subName
  }