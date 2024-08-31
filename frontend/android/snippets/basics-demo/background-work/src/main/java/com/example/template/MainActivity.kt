package com.example.template

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkRequest

/** "IntelliJ IDEA" -> "App Inspection" -> "Background Task Inspector" */
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sendWorkRequest()
    }

    private fun sendWorkRequest() {
        val uploadWorkRequest: WorkRequest =
            OneTimeWorkRequestBuilder<UploadWorker>()
                .build()

        WorkManager
            .getInstance(applicationContext)
            .enqueue(uploadWorkRequest)
    }
}