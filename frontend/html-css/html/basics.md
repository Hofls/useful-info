* Html - defines the meaning and structure of web content
* Hypertext - refers to links that connect web pages to one another
* Attribute - element configuration for html elements 
    * Global - `class, id, style`
* Property - browser parses html, creates DOM nodes, each node is an object that has properties
* Semantic element (tag) - describes its meaning to the browser/developer
    * Info:
        * Use case - accessibility, SEO, html readability (for developers)
        * Use `<div>` only if there is no semantic
        * It's ok to create your own semantic tag
    * Tags list:
        * Document - `<html> <head> <body>`
            * Head  - `<title> <meta> <link> <style> <script> <noscript>`
        * Page structure - `<main> <header> <nav> <section> <article> <aside> <footer>`
        * Media - `<video> <img> <audio> <picture> <canvas> <object>`
            * `<figure> & <figcaption>`
        * Text - `<p> <strong> <cite> <del> <ins> <abbr> <hr> <code> <kbd> <mark> <h1>`
            * `<details> & <summary>`
        * List - `<ol> <ul> <li> <dl>`
        * Form - `<form> <select> <option> <input> <textarea> <label> <optgroup> <fieldset> <datalist> <output>`
        * Table - `<table> <thead> <tbody> <tfoot> <tr> <td>`
        * Etc - `<a> <progress> <time>`
* Weird stuff (don't use it):
    * Leave styling to css: 
        * Tags - `<b> <i> <strike> <embed> <center> <font>`
        * Attributes - `border, height, width, nowrap, background, align`