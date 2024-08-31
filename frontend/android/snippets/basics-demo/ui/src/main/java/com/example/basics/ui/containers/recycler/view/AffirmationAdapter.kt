package com.example.basics.ui.containers.recycler.view

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.basics.R

class AffirmationAdapter(
    private val context: Context,
    private val dataset: List<AffirmationRepository.Affirmation>
) : RecyclerView.Adapter<AffirmationAdapter.ItemViewHolder>() {

    class ItemViewHolder(private val view: View): RecyclerView.ViewHolder(view) {
        val textView: TextView = view.findViewById(R.id.item_title)
        val imageView: ImageView = view.findViewById(R.id.item_image)
    }

    /** .xml layout */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val adapterLayout = LayoutInflater.from(parent.context)
            .inflate(R.layout.affirmation_list_item, parent, false)
        return ItemViewHolder(adapterLayout)
    }

    /** fill UI with data */
    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val item = dataset[position]
        holder.textView.text = item.message
        holder.imageView.setImageResource(item.imageResourceId)
    }


    override fun getItemCount() = dataset.size

}