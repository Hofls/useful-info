package com.example.basics.ui.widgets

import android.app.AlertDialog
import android.content.Context
import android.util.Log
import android.widget.Toast


class AlertWidget {

    companion object {
        fun showAlert(context: Context) {
            AlertDialog.Builder(context)
                .setTitle("Delete entry")
                .setMessage("Are you sure? Deletion is permanent.")
                .setPositiveButton(android.R.string.ok) { dialog, which ->
                    Toast.makeText(context, "OK", Toast.LENGTH_SHORT).show()
                }
                .setNegativeButton(android.R.string.cancel) { dialog, which ->
                    Toast.makeText(context, "CANCEL", Toast.LENGTH_SHORT).show()
                }
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show()
        }
    }

}