import {useEffect, Dispatch, SetStateAction } from "react";
import { NonSensitiveDiagnoseEntry, Diagnosis } from "../../types"
import diagnoseService from "../../services/diagnoses"
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Props {
    diagnoses: NonSensitiveDiagnoseEntry[];
    setDiagnoses: Dispatch<SetStateAction<NonSensitiveDiagnoseEntry[]>>,
    diagnosisCodes: Diagnosis['code'][],
    setDiagnosisCodes: Dispatch<SetStateAction<string[]>>,
  }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
}; 

  const DiagosesComponent = ({diagnoses, setDiagnoses, diagnosisCodes, setDiagnosisCodes}: Props) => {

    const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
          target: { value },
        } = event;
        setDiagnosisCodes(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    useEffect(() => {
    const fetchDiagnoseList = async () => {
        const diagnoses = await diagnoseService.getAll();
        setDiagnoses(diagnoses);
    };
    void fetchDiagnoseList();
    }, []);
    
    return (
        <>
        <InputLabel id="diagnose-multiple-checkbox-label">Select Diagnose Code</InputLabel> 
        <Select
        sx={{width: 300}}
        id="diagnose-multiple-checkbox"
        multiple
        value={diagnosisCodes}
        onChange={handleDiagnosisChange}
        input={<OutlinedInput label="Select Diagnose Code" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
    {diagnoses.map((diagnose) => (
      <MenuItem key={diagnose.code} value={diagnose.code}>
        <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
        <ListItemText primary={diagnose.code} />
      </MenuItem>
    ))}
  </Select>
  </>
    )
}

export default DiagosesComponent