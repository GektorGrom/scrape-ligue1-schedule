const getChanelName = (chanlId) => {
  switch (chanlId) {
    case 'channels_1':
      return 'BeIn Sport HD';
    case 'channels_2':
      return 'BeIn Sport Español';
    case 'channels_3':
      return 'BeIn Sport 2';
    case 'channels_4':
      return 'BeIn Sport 3';
    case 'channels_5':
      return 'BeIn Sport 4';
    case 'channels_6':
      return 'BeIn Sport 5';
    case 'channels_7':
      return 'BeIn Sport 6';
    case 'channels_8':
      return 'BeIn Sport 7';
    case 'channels_9':
      return 'BeIn Sport 8';
    case 'channels_10':
      return 'BeIn Sport 9';
    case 'channels_11':
      return 'BeIn Sport 10';
    default:
      return 'BeIn Sport HD';
  }
};

export default getChanelName;
