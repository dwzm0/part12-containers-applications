import axios from "axios";
import { NonSensitiveDiagnoseEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<NonSensitiveDiagnoseEntry[]>(
      `${apiBaseUrl}/diagnoses`
    );
    return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };