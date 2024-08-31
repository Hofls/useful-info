package com.example.basics.ui.activities

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.example.basics.R
import java.io.Serializable

const val EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE"
const val REQUEST_CODE_A = 1

class DisplayMessageActivity : AppCompatActivity() {

    class DirectoryRecord(val code: String, val name: String) : Serializable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_display_message)

        val record = intent.getSerializableExtra(EXTRA_MESSAGE) as DirectoryRecord
        findViewById<TextView>(R.id.textView).apply {
            text = record.name
        }
    }

    fun returnValue(view: View) {
        val bundle = Bundle()
        bundle.putSerializable("directory_record", DirectoryRecord("2", "Give back"))
        val intent = Intent()
        intent.putExtras(bundle)
        setResult(Activity.RESULT_OK, intent)
        finish()
    }

}