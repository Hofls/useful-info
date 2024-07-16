package com.example.template

import javax.inject.Inject

class HelloService @Inject constructor() {

    fun getMessage(): String {
        return "Hello world!";
    }

}