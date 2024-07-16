package com.example.basics.ui.containers

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.widget.EditText
import android.widget.LinearLayout
import com.example.basics.R

class CardViewActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_card_view)
    }

    /** Dynamically adds a card */
    fun inflateCardView(view: View) {
        val container = findViewById<LinearLayout>(R.id.cardViewContainer)
        var inflater = applicationContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        var card = inflater.inflate(R.layout.card_view, container, false)
        container.addView(card)
    }

}