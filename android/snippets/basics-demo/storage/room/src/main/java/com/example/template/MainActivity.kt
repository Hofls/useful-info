package com.example.template

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.room.Room

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun addUser(view: View) {
        // todo - replace with coroutine
        Thread {
            val db = Room.databaseBuilder(
                applicationContext,
                AppDatabase::class.java, "database-name"
            ).build()

            val userDao = db.userDao()
            userDao.insertAll(User(firstName = "John", lastName = "Kennedy"))
            val users: List<User> = userDao.getAll()
            println("Users count - ${users.size}")
        }.start()
    }

}