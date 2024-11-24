package com.movexring
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.yucheng.ycbtsdk.Constants
import com.yucheng.ycbtsdk.YCBTClient
import com.yucheng.ycbtsdk.response.BleDataResponse
import com.google.gson.Gson

class ReadHealthDataModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ReadHealthDataModule"  // This is the name that will be used in React Native
    }

    @ReactMethod
    fun getHeartRateData( promise: Promise) {

        YCBTClient.healthHistoryData(Constants.DATATYPE.Health_HistoryHeart, object : BleDataResponse {
            override fun onDataResponse(p0: Int, p1: Float, p2: HashMap<Any, Any>?) {
                if (p0 == 0 && p2 != null) {
                    val json = Gson().toJson(p2)
                    promise.resolve("Success from native")
                } else {
                    promise.reject("Something went wrong!")
                }
            }
        })
    }



}
