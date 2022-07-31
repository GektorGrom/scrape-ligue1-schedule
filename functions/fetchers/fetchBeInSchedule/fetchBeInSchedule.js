import axios from 'axios';
import { format } from 'date-fns';

const fetchBeInSchedule = async (startDate) => {
  const start = format(startDate, 'yyyy-MM-dd');
  const beInUrl = `https://epg.beinsports.com/utctime_ca.php?cdate=${start}&offset=-7&mins=00&category=sports&id=123`;
  return axios
    .get(beInUrl)
    .then(({ data }) => data);
};

export default fetchBeInSchedule;
