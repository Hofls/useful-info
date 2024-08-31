package com.example.basics.ui.widgets

import android.app.DatePickerDialog
import android.content.Context
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class DatePickerWidget {

    companion object {
        fun pickDate(activity: AppCompatActivity) {
            val calendar: Calendar = Calendar.getInstance()

            val dateField = activity.findViewById<EditText>(com.example.basics.R.id.DateField)
            val dateFormat = "dd-MM-yyyy"
            if (!dateField.text.toString().isNullOrBlank()) {
                val sdf = SimpleDateFormat(dateFormat, Locale.ENGLISH)
                calendar.setTime(sdf.parse(dateField.text.toString()))
            }
            val dateListener =
                DatePickerDialog.OnDateSetListener { view, year, monthOfYear, dayOfMonth ->
                    calendar.set(Calendar.YEAR, year)
                    calendar.set(Calendar.MONTH, monthOfYear)
                    calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth)

                    val date = SimpleDateFormat(dateFormat, Locale.UK).format(calendar.getTime())
                    dateField.setText(date)
                    Toast.makeText(activity, date, Toast.LENGTH_SHORT).show()
                }

            DatePickerDialog(
                activity, dateListener,
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH)
            ).show()
        }
    }

}