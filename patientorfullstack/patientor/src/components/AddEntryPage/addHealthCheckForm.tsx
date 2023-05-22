import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, MenuItem, } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { HealthCheckEntryWithoutId, Diagnosis, Patient, NonSensitiveDiagnoseEntry } from "../../types"
import DiagosesComponent from "./DiagnosesComponent";


interface Props {
    onSubmit: (patient: Patient, values: HealthCheckEntryWithoutId) => void;
    patient: Patient,
  }

const AddHealthCheckForm = ({onSubmit, patient }: Props) => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0) 

    const handleRatingChange = (event: SelectChangeEvent) => {
      setHealthCheckRating(Number(event.target.value));
    };
  
    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit(patient, {
            type: "HealthCheck",
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating,
        })
        setDescription("")
        setDate("")
        setSpecialist("")
        setDiagnosisCodes([])
        setHealthCheckRating(0)
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
        <InputLabel id="rating-simple-select-label">Health Rating</InputLabel>
        <Select
          sx={{width: 75}}
          id="rating-simple-select"
          label="rating"
          value={String(healthCheckRating)}
          onChange={handleRatingChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
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

export default AddHealthCheckForm