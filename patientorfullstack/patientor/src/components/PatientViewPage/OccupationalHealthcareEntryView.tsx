import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from '@mui/material';

import { OccupationalHealthcareEntry } from "../../types";
import diagnoseService from "../../services/diagnoses"
import { NonSensitiveDiagnoseEntry } from "../../types";
import {diagnoseNameParser} from '../../utils'

import BadgeIcon from '@mui/icons-material/Badge';


const OccupationalHealthcareEntryView: React.FC <{entry: OccupationalHealthcareEntry}> = ({entry}) => {
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
        <Typography variant="subtitle2">{entry.date}<BadgeIcon /> {entry.employerName}</Typography>
        {(entry.sickLeave)? <Typography variant="subtitle2">sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</Typography> : null}
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

export default OccupationalHealthcareEntryView