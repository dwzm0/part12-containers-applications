import { useState, useEffect } from "react";
import axios from "axios"
import { Box, Typography, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Patient } from "../../types";
import { NonSensitiveDiagnoseEntry, EntryWithoutId } from "../../types";

import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses"

import EntryDetails from "./EntryDetails";
import AddHealthCheckForm from "../AddEntryPage/addHealthCheckForm";
import AddHospitalEntryForm from "../AddEntryPage/addHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "../AddEntryPage/addOccupationalHealthcareEntryForm";


const PatientView = () => {
    const [error, setError] = useState<string>("");
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [hospitalToggler, setHospitalToggler] = useState(false)
    const [healthCheckToggler, setHealthCheckToggler] = useState(false)
    const [occupationalToggler, setOccupationalToggler] = useState(false)

    const patientId = useParams<{id: string}> ()

  useEffect(() => {
    const fetchPatient = async () => {
      const curPatient = await patientService.getById(patientId);
      setPatient(curPatient);
    };
    void fetchPatient();
  }, [patientId]);

  
  useEffect(() => {
    const fetchDiagnoseList = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoseList();
  }, []);

  
  const submitNewEntry = async (patient: Patient, values: EntryWithoutId) => {
    try {
      await patientService.createEntry(patient.id, values);
      const refetchPatient = await patientService.getById(patientId);
      setPatient(refetchPatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const togglerForHospital = () : any=> {
    setHospitalToggler(true)
    setHealthCheckToggler(false)
    setOccupationalToggler(false)
  }

  const togglerForHealthCheck = () : any=> {
    setHospitalToggler(false)
    setHealthCheckToggler(true)
    setOccupationalToggler(false)
  }

  const togglerForOccupational = () : any=> {
    setHospitalToggler(false)
    setHealthCheckToggler(false)
    setOccupationalToggler(true)
  }


  if (!patient) {
    return null
  }

    return (
      <div>
        <Box style={{ marginTop: 30 }}>
        <Typography style={{fontWeight: 'bold'}} variant="h4">
         {patient.name} {patient.gender === "male"? <FemaleIcon /> : <MaleIcon /> } 
        </Typography>
        <Box>
        {( () => {
              if (error) {
                return (
                  <div style={{ margin: 20, color: "red" }}>{error}</div>
                )
              }
              setTimeout(() => setError(""), 5000)
                }
            )()} 
        <Button style={{marginRight: 10}}
              variant="contained"
              onClick={togglerForHospital}
            >
              Add HelthCare Entry
            </Button>
            <Button style={{marginRight: 10}}
              variant="contained"
              onClick={togglerForHealthCheck}
            >
              Add Hospital Entry
            </Button>
            <Button
              variant="contained"
              onClick={togglerForOccupational}
            >
              Add Occupational Healthcare Entry
            </Button>
        </Box>
       
        <Box>{hospitalToggler ? <AddHospitalEntryForm onSubmit={submitNewEntry} patient={patient} />
                                : healthCheckToggler? <AddHealthCheckForm onSubmit={submitNewEntry} patient={patient} />
                                : occupationalToggler? <AddOccupationalHealthcareEntryForm onSubmit={submitNewEntry} patient={patient} /> : 
                                null 
                            }</Box>
        <Box style={{ marginTop: 20, paddingLeft: 5}}>
        <Typography  variant="subtitle1">ssn: {patient.ssn}</Typography>
        <Typography  variant="subtitle1">occupation: {patient.occupation}</Typography>
        </Box>
         {(patient.entries.length !== 0) ? 
          <Box style={{ marginTop: 20, paddingLeft: 5}}>
          <Typography  style={{fontWeight: 'bold'}} variant="h5">Entries</Typography>
          {patient.entries.map((entry) => (
             <EntryDetails key={entry.id}entry={entry}/>
          ))}
          </Box>
          : null }
          </Box>   
      </div>
    )
}

export default PatientView



