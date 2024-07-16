package com.example.basics.ui.containers

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.basics.R
import com.example.basics.ui.containers.fragments.FragmentsActivity
import com.example.basics.ui.containers.recycler.view.RecyclerViewActivity

class ContainersActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_containers)
    }

    fun toFragments(view: View) {
        startActivity(Intent(this, FragmentsActivity::class.java))
    }

    fun toRecyclerView(view: View) {
        startActivity(Intent(this, RecyclerViewActivity::class.java))
    }

    fun toScrollView(view: View) {
        startActivity(Intent(this, ScrollViewActivity::class.java))
    }

    fun toSwipeRefreshView(view: View) {
        startActivity(Intent(this, SwipeRefreshActivity::class.java))
    }

    fun toCardView(view: View) {
        startActivity(Intent(this, CardViewActivity::class.java))
    }

}