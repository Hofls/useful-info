package com.example.basics.ui.widgets

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.basics.R
import com.google.android.material.snackbar.Snackbar

/** Should trigger the primary action in UI */
class FloatingButtonActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_floating_button)
    }

    fun showSnackbar(view: View) {
        Snackbar.make(view, "Here's a Snackbar", Snackbar.LENGTH_LONG)
            .setAction("Action", null)
            .show()
    }

}