import { useState, useEffect } from "react";
import { HospitalEntry } from "../../types";
import { Box, Typography, List, ListItem } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import diagnoseService from "../../services/diagnoses"
import { NonSensitiveDiagnoseEntry } from "../../types";
import {diagnoseNameParser} from '../../utils'

const HospitalEntryView: React.FC <{entry: HospitalEntry}> = ({entry}) => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);

    useEffect(() => {
        const fetchDiagnoseList = async () => {
          const diagnoses = await diagnoseService.getAll();
          setDiagnoses(diagnoses);
        };
        void fetchDiagnoseList();
      }, []);

    return (
        <Box>
            <hr />
            <Typography variant="subtitle2">{entry.discharge.date}<LocalHospitalIcon /></Typography>
            <Typography variant="subtitle2">criteria: {entry.discharge.criteria}</Typography>
            <Typography variant="subtitle2">diagnose by {entry.specialist}</Typography>
            <Typography  variant="subtitle1">{entry.date} description: {entry.description}</Typography>
            <List>
              {entry.diagnosisCodes?.map((d) => (
                <ListItem key={d}>{d} - {diagnoseNameParser(d, diagnoses)} </ListItem>
              ))}
            </List> 
            <hr />
        </Box>
    )
}

export default HospitalEntryView