import axios from "axios";
import { Diagnose } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnose = async () => {
  const { data } = await axios.get<Diagnose[]>(
    `${apiBaseUrl}/diagnose`
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllDiagnose
};

