package com.example.basics.ui.widgets

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.PopupMenu
import android.widget.Toast
import com.example.basics.R

/** Dropdown/Popup menu */
class MenuWidget {

    companion object {
        fun showPopup(context: Context, view: View) {
            val popup = PopupMenu(context, view)
            popup.inflate(R.xml.header_menu)

            popup.setOnMenuItemClickListener(PopupMenu.OnMenuItemClickListener { item: MenuItem? ->

                when (item!!.itemId) {
                    R.id.header1 -> {
                        Toast.makeText(context, item.title, Toast.LENGTH_SHORT).show()
                    }
                    R.id.header2 -> {
                        Toast.makeText(context, item.title, Toast.LENGTH_SHORT).show()
                    }
                    R.id.header3 -> {
                        Toast.makeText(context, item.title, Toast.LENGTH_SHORT).show()
                    }
                }
                true
            })

            popup.show()
        }
    }
}