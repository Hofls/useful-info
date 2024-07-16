package com.example.basics.ui.activities

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Toast
import com.example.basics.R

class ActivitiesList : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_activities_list)
    }

    fun sendDataToActivity(view: View) {
        val intent = Intent(this, DisplayMessageActivity::class.java).apply {
            putExtra(EXTRA_MESSAGE, DisplayMessageActivity.DirectoryRecord("1", "Send forward"))
        }
        startActivityForResult(intent, REQUEST_CODE_A)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_A) {
            if (resultCode == RESULT_OK && data != null) {
                val record = data.getSerializableExtra("directory_record") as DisplayMessageActivity.DirectoryRecord?
                Toast.makeText(this, "Return value - ${record?.name}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun toLifecycle(view: View) {
        startActivity(Intent(this, LifecycleDemoActivity::class.java))
    }

    fun toSettings(view: View) {
        startActivity(Intent(this, SettingsActivity::class.java))
    }

    fun toCompose(view: View) {
        startActivity(Intent(this, ComposeActivity::class.java))
    }

    fun toAnotherApp1(view: View) {
        val location = Uri.parse("geo:0,0?q=1600+Amphitheatre+Parkway,+Mountain+View,+California")
        val mapIntent = Intent(Intent.ACTION_VIEW, location)
        startActivity(mapIntent)
    }

    fun toAnotherApp2(view: View) {
        val location = Uri.parse("tel:5551234")
        val mapIntent = Intent(Intent.ACTION_DIAL, location)
        startActivity(mapIntent)
    }

}