import { useState, SyntheticEvent } from "react"
import {  TextField, Grid, Button, } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { HospitalEntryWithoutId, Diagnosis, Patient, NonSensitiveDiagnoseEntry } from "../../types"
import DiagosesComponent from "./DiagnosesComponent";

interface Props {
    onSubmit: (patient: Patient, values: HospitalEntryWithoutId) => void;
    patient: Patient,
  }

const AddHospitalEntryForm = ({onSubmit, patient}: Props) => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
    const [criteria, setCriteria] = useState("")
    const [dischargeDate, setDischargeDate] = useState("")

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit(patient, {
            type: "Hospital",
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: {
                criteria,
                date: dischargeDate
            },
        })
        setDescription("")
        setDate("")
        setSpecialist("")
        setDiagnosisCodes([])
        setCriteria("")
        setDischargeDate("")
    }
    return (
        <div>
          <form style={{paddingBlock: 30}} onSubmit={addEntry}>
            <TextField
              label="Description"
              fullWidth 
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <InputLabel>Pass a date</InputLabel>
            <Input
              type="date" 
              fullWidth
              value={date}
              onChange={({target}) => setDate(target.value)} 
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
              <DiagosesComponent diagnoses={diagnoses} setDiagnoses={setDiagnoses} diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes}/>
              <TextField
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
             <InputLabel>Pass a discharge date</InputLabel>     
             <Input
              type="date" 
              fullWidth
              value={dischargeDate}
              onChange={({target}) => setDischargeDate(target.value)} 
            />    
            <Grid>
              <Grid item>
                <Button
                  style={{
                    marginTop: 10,
                    float: "left",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
}



export default AddHospitalEntryForm