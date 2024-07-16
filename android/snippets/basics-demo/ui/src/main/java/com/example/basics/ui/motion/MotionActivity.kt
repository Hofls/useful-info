package com.example.basics.ui.motion

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.basics.R

class MotionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_motion)
    }

    fun toHorizontal(view: View) {
        startActivity(Intent(this, HorizontalMotionActivity::class.java))
    }

}