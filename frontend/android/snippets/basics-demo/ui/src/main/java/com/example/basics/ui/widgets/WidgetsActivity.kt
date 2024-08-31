package com.example.basics.ui.widgets

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity


class WidgetsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(com.example.basics.R.layout.activity_widgets)
    }

    fun showToast(view: View) {
        Toast.makeText(this, "Hello toast!", Toast.LENGTH_SHORT).show()
    }

    fun toMenu(view: View) {
        MenuWidget.showPopup(this, view)
    }

    fun showAlert(view: View) {
        AlertWidget.showAlert(this)
    }

    fun pickDate(view: View) {
        DatePickerWidget.pickDate(this)
    }

    fun toFloatingButton(view: View) {
        startActivity(Intent(this, FloatingButtonActivity::class.java))
    }

    fun toStylishButton(view: View) {
        startActivity(Intent(this, StylishButtonActivity::class.java))
    }

    fun toSpinner(view: View) {
        startActivity(Intent(this, SpinnerActivity::class.java))
    }

}