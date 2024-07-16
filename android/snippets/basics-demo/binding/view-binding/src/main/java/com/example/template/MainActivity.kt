package com.example.template

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.example.template.databinding.ActivityMainBinding

/** Replacement for findViewById */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    fun showToast(view: View) {
        Toast.makeText(this, binding.greeting.text, Toast.LENGTH_SHORT).show()
    }
}