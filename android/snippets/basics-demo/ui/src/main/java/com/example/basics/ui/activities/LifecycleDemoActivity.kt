package com.example.basics.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.example.basics.R

class LifecycleDemoActivity : AppCompatActivity() {

    val TAG: String = this.javaClass.name;

    // CREATION --------------------------------
    // Initialized -> Created
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lifecycle_demo)
        Log.d(TAG, "onCreate Called")
    }

    // Created -> Started
    override fun onStart() {
        super.onStart()
        Log.d(TAG, "onStart Called")
    }
    override fun onRestart() {
        super.onRestart()
        Log.d(TAG, "onRestart Called")
    }
    // Started -> Resumed
    override fun onResume() {
        super.onResume()
        Log.d(TAG, "onResume Called")
    }

    // DESTRUCTION --------------------------------

    // Resumed -> Started
    override fun onPause() {
        super.onPause()
        Log.d(TAG, "onPause Called")
    }

    // Started -> Created
    override fun onStop() {
        super.onStop()
        Log.d(TAG, "onStop Called")
    }

    // Created -> Destroyed
    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "onDestroy Called")
    }


}