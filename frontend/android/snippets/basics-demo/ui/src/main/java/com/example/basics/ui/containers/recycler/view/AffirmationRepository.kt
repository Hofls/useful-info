package com.example.basics.ui.containers.recycler.view

import androidx.annotation.DrawableRes
import com.example.basics.R

class AffirmationRepository {

    data class Affirmation(
        val message: String,
        @DrawableRes val imageResourceId: Int
    )

    fun findAffirmations(): List<Affirmation> {
        return listOf(
            Affirmation("Text A", R.drawable.image7),
            Affirmation("Text B", R.drawable.image7),
            Affirmation("Text C", R.drawable.image7)
        )
    }

}