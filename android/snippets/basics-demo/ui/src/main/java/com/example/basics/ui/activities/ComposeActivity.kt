package com.example.basics.ui.activities

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.basics.R

// RClick -> New -> Activity -> Empty Compose Activity
class ComposeActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MessageCard("Hi!","It's a jetpack compose!")
        }
    }
}

@Composable
fun MessageCard(author: String, body: String) {
    Row {
        Image(
            painter = painterResource(R.drawable.image7),
            contentDescription = "Random image"
        )

        Spacer(modifier = Modifier.width(8.dp))

        Column {
            Text(text = author)
            Text(text = body)
        }
    }
}

@Preview
@Composable
fun PreviewMessageCard() {
    MessageCard("Hey!","This text is visible only in preview")
}