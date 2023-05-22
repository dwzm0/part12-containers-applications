import { HealthCheckEntry } from "../../types";
import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from '@mui/material';
import diagnoseService from "../../services/diagnoses"
import { NonSensitiveDiagnoseEntry,  } from "../../types";
import {diagnoseNameParser} from '../../utils'

import LoyaltyIcon from '@mui/icons-material/Loyalty';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FmdBadIcon from '@mui/icons-material/FmdBad';

const HealthCheckEntryView: React.FC <{entry: HealthCheckEntry}> = ({entry}) => {
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
            <Typography variant="subtitle2">{entry.date}<LoyaltyIcon /></Typography>
            <Typography variant="subtitle2">diagnose by {entry.specialist}</Typography>
            <Typography  variant="subtitle1">{entry.date} description: {entry.description}</Typography>
             { ( () => {
                switch (entry.healthCheckRating) {
                    case 0:
                        return <FavoriteBorderIcon />
                    case 1:
                        return <ThumbDownAltIcon/>
                    case 2:
                        return <MoodBadIcon/>
                    case 3:
                        return <FmdBadIcon/>
                }
            })()}
            <List>
              {entry.diagnosisCodes?.map((d) => (
                <ListItem key={d}>{d} - {diagnoseNameParser(d, diagnoses)} </ListItem>
              ))}
            </List> 
            <hr />
        </Box>
    )
}

export default HealthCheckEntryView