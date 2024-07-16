package com.example.basics

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.basics.ui.activities.ActivitiesList
import com.example.basics.ui.containers.ContainersActivity
import com.example.basics.ui.motion.MotionActivity
import com.example.basics.ui.widgets.WidgetsActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun toActivities(view: View) {
        startActivity(Intent(this, ActivitiesList::class.java))
    }

    fun toContainers(view: View) {
        startActivity(Intent(this, ContainersActivity::class.java))
    }

    fun toWidgets(view: View) {
        startActivity(Intent(this, WidgetsActivity::class.java))
    }

    fun toMotion(view: View) {
        startActivity(Intent(this, MotionActivity::class.java))
    }

}