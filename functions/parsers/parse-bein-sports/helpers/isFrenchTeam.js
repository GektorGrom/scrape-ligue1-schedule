const frenchTeams = [
  'lyon',
  'nice',
  'marsei',
  'paris',
  'monaco',
];

const isFrenchTeam = (teamName) => frenchTeams.some((team) => teamName.includes(team));
export default isFrenchTeam;
