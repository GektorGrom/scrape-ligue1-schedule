function getTeamName(teamString) {
  const teamName = teamString.split(':');
  return teamName.pop().split(' - ').pop();
}

function getCleanTeamName(teamName) {
  return getTeamName(teamName).replace('.', '').trim();
}

export default getCleanTeamName;
