package com.example.basics.ui.widgets

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.AdapterView

import android.widget.Spinner
import android.widget.Toast


/** Touching the spinner displays a dropdown menu */
class SpinnerActivity : AppCompatActivity(), AdapterView.OnItemSelectedListener {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(com.example.basics.R.layout.activity_spinner)

        val spinner = findViewById<View>(com.example.basics.R.id.spinner2) as Spinner
        spinner.setOnItemSelectedListener(this);
    }

    override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
        val spinner = findViewById<View>(com.example.basics.R.id.spinner2) as Spinner
        val text = spinner.selectedItem.toString()
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
    }

    override fun onNothingSelected(p0: AdapterView<*>?) {
        TODO("Not yet implemented")
    }
}