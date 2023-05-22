import { useState, SyntheticEvent,  } from "react";
import {  TextField, Grid, Button, } from '@mui/material';
import { OccupationalHealthcareEntryWithoutId, Patient, NonSensitiveDiagnoseEntry, Diagnosis} from "../../types"
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import DiagosesComponent from "./DiagnosesComponent";


interface Props {
    onSubmit: (patient: Patient, values: OccupationalHealthcareEntryWithoutId) => void;
    patient: Patient,
  }

const AddOccupationalHealthcareEntryForm = ({onSubmit, patient }: Props) => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [employerName, setEmployerName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        if(endDate === "" && startDate === ""){
          onSubmit(patient, {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
        })
        }else {
          onSubmit(patient, {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave: {
              startDate,
              endDate
            }
        })
        }
        setDescription("")
        setDate("")
        setSpecialist("")
        setDiagnosisCodes([])
        setEmployerName("")
        setStartDate("")
        setEndDate("")
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
            <InputLabel>Pass date</InputLabel>     
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
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel>Pass a sickleave start date</InputLabel>              
            <Input
              style={{paddingBlock: 5}}
              type="date" 
              fullWidth
              value={startDate}
              onChange={({target}) => setStartDate(target.value)} 
            />  
            <InputLabel>Pass a sickleave end date</InputLabel>                
            <Input
              style={{paddingBlock: 5}}
              type="date" 
              fullWidth
              value={endDate}
              onChange={({target}) => setEndDate(target.value)} 
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



export default AddOccupationalHealthcareEntryForm