import axios from 'axios';
import { format } from 'date-fns';

const fetchBeInCanada = async (startDate) => {
  const start = format(startDate, 'yyyy-MM-dd');
  const beInUrl = `https://us-cdn.bein-massive.com/api/schedules?channels=54525,54524,54521,54523,54518,54517,54522,54519&date=${start}&duration=24&hour=6&intersect=true&lang=en-US&region=ca`;
  return axios
    .get(beInUrl)
    .then(({ data }) => data);
};

export default fetchBeInCanada;
