import {PermissionsAndroid, Platform} from 'react-native';

const requestBluetoothPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        // Android 12+ requires Bluetooth permissions
        const grantedBluetoothScan = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: 'Bluetooth Permission',
            message:
              'This app requires access to Bluetooth for scanning devices.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        const grantedBluetoothConnect = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: 'Bluetooth Permission',
            message:
              'This app requires access to Bluetooth for connecting devices.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (
          grantedBluetoothScan === PermissionsAndroid.RESULTS.GRANTED &&
          grantedBluetoothConnect === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Bluetooth permissions granted');
        } else {
          console.log('Bluetooth permissions denied');
        }
      }

      // Request location permission for BLE scanning (Android)
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app requires location access to scan for Bluetooth devices.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export default requestBluetoothPermissions;
