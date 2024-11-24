package com.movexring

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.yucheng.ycbtsdk.Constants
import com.yucheng.ycbtsdk.YCBTClient
import com.yucheng.ycbtsdk.response.BleConnectResponse
import org.greenrobot.eventbus.EventBus
import kotlin.math.log

class BLEConnectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BLEConnectionModule"  // This is the name that will be used in React Native
    }

    @ReactMethod
    fun connect(deviceMac: String, callback: Callback) {
        print(deviceMac)
        val connectResponse = object : BleConnectResponse {
            override fun onConnectResponse(state: Int) {
                when (state) {
                    0 -> callback.invoke(Constants.BLEState.Connected)
                    1 -> callback.invoke(Constants.BLEState.Disconnect)
                    else -> callback.invoke("Connection Failed")
                }
            }
        }

        // Call the connectBle function with the device MAC address
        YCBTClient.connectBle(deviceMac, connectResponse)
    }



    @ReactMethod
    fun disconnect(){
        YCBTClient.disconnectBle()
    }
}
