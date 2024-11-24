package com.movexring

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.yucheng.ycbtsdk.YCBTClient
import com.yucheng.ycbtsdk.bean.ScanDeviceBean
import com.yucheng.ycbtsdk.response.BleScanResponse

class BleModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BleModule"
    }

    @ReactMethod
    fun initializeBle(callback: Callback) {
        // Initialize the BLE SDK
        YCBTClient.initClient(reactApplicationContext, true, BuildConfig.DEBUG)
        callback.invoke("BLE Initialized")
    }

    @ReactMethod
    fun startScan(callback: Callback) {
        // Create a BleScanResponse object and pass it to startScanBle
        val scanResponse = object : BleScanResponse {
            override fun onScanResponse(i: Int, scanDeviceBean: ScanDeviceBean?) {
                // Check if the device found is not null
                if (scanDeviceBean != null) {
                    // Create a WritableMap to send data back to React Native
                    val deviceInfo: WritableMap = Arguments.createMap()

                    // Put device information in the map
                    deviceInfo.putString("deviceMac", scanDeviceBean.deviceMac)
                    deviceInfo.putString("deviceName", scanDeviceBean.deviceName)
                    deviceInfo.putInt("deviceRssi", scanDeviceBean.deviceRssi)
                    deviceInfo.putString("bluetoothDevice", scanDeviceBean.device.toString())  // You can convert the BluetoothDevice to string or any other format

                    // Send the device info back to React Native as a WritableMap
                    callback.invoke(deviceInfo)
                }
            }
        }

        // Now call startScanBle with the BleScanResponse and a scan time (e.g., 5000ms)
        YCBTClient.startScanBle(scanResponse, 6)  // Scanning for 6 seconds
    }
}