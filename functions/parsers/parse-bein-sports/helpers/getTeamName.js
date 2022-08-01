function getTeamName(teamString) {
  const teamName = teamString.split(':');
  return teamName.pop().trim();
}

export default getTeamName;
