import {NativeModules} from 'react-native';

const {BLEConnectionModule} = NativeModules;

// Function to register for connection status changes
const monitorConnectionStatus = () =>
  BLEConnectionModule.connectionStateChange((statusMessage: string) => {
    console.log(statusMessage);
    return statusMessage;
  });

export default monitorConnectionStatus;
