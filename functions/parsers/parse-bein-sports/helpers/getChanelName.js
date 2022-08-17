// know channel id for canada sports
// 54525,54524,54521,54523,54518,54517,54522,54519

const getChanelName = (channelId) => {
  switch (channelId) {
    case 'channels_1':
    case '54525':
      return 'BeIn Sport HD';
    case 'channels_2':
    case '54524':
      return 'BeIn Sport Español';
    case 'channels_3':
      return 'BeIn Sport 2';
    case 'channels_4':
    case '54521':
      return 'BeIn Sport 3';
    case 'channels_5':
    case '54523':
      return 'BeIn Sport 4';
    case 'channels_6':
    case '54518':
      return 'BeIn Sport 5';
    case 'channels_7':
    case '54517':
      return 'BeIn Sport 6';
    case 'channels_8':
    case '54522':
      return 'BeIn Sport 7';
    case 'channels_9':
    case '54519':
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
