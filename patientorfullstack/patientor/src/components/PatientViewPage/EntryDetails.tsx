import { Entry  } from "../../types";
import HealthCheckEntryView from "./HealthCheckEntryView";
import HospitalEntryView from "./HospitalEntryView";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntryView";

import { assertNever } from "../../utils";


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {    
    switch (entry.type) {
        case "OccupationalHealthcare":
          return <OccupationalHealthcareEntryView entry={entry}/>
        case "Hospital" :
          return <HospitalEntryView entry={entry} />
        case "HealthCheck" :
          return <HealthCheckEntryView entry={entry}/>
        default:
          return assertNever(entry)
        }
}


export default EntryDetails