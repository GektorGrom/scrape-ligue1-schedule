const splitTime = (timeStr) => {
  const timeArray = timeStr.split('-');
  return {
    start: timeArray[0].trim(),
    end: timeArray[1].trim(),
  };
};

export default splitTime;
