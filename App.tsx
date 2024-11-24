import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {NativeModules} from 'react-native';
import requestBluetoothPermissions from './src/utils/requestBluetoothPermissions';
import {BleDeviceInfo} from './src/types/bleDeviceInfo';

const {BleModule, BLEConnectionModule, ReadHealthDataModule} = NativeModules;

export default function App() {
  const [device, setDevice] = React.useState<BleDeviceInfo | null>(null);
  const handleScan = async () => {
    await requestBluetoothPermissions();
    await BleModule.startScan((res: BleDeviceInfo) => {
      setDevice(res);
      console.log('Scan Response', res.deviceName);
    });
  };

  const handleConnect = async () => {
    await BLEConnectionModule.connect(device?.deviceMac, (res: string) => {
      console.log('Connection Response', res);
    });
  };

  const handleReadData = async () => {
    console.log(ReadHealthDataModule.getHeartRateData);
    await ReadHealthDataModule.getHeartRateData(async (res: JSON | string) => {
      console.log(
        'Read Data Response',
        new Date(JSON.parse(res).data[0].heartStartTime).toString(),
      );
    });
    // if (global.__fbBatchedBridge) {
    //   const origMessageQueue = global.__fbBatchedBridge;
    //   const modules = origMessageQueue._remoteModuleTable;
    //   const methods = origMessageQueue._remoteMethodTable;
    //   global.findModuleByModuleAndMethodIds = (moduleId, methodId) => {
    //     console.log(
    //       `The problematic line code is in: ${modules[moduleId]}.${methods[moduleId][methodId]}`,
    //     );
    //   };
    // }
    await ReadHealthDataModule.getHeartRateData(async (res: JSON | string) => {
      console.log('Read Data Response', res);
    });
  };

  useEffect(() => {
    BleModule.initializeBle((res: string) => {
      console.log('Initial Response', res);
    });

    console.log({NativeModules});
  }, []);

  return (
    <View>
      <Text>App</Text>
      <Button title="Scan" onPress={handleScan} />
      <Text>S</Text>

      {device && (
        <Button
          title={`Connect ${device?.deviceName}`}
          onPress={handleConnect}
        />
      )}
      <Text>S</Text>
      <Button title="Read Data" onPress={handleReadData} />
    </View>
  );
}
