# HTML in CSS

An approach to improve the developer experience, when writing html and css.

One of the most important principles of clean code is DRY. Don't repeat yourself.
Let's take a look at a typical html page.

```html
<head>
  <style>
    h1#heading {
      font-size: x-large;
      font-weight: 600;
      margin-bottom: 32px;
    }

    main#main {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    #main > #quote:first-child {
      font-style: italic;
    }

    #main > #quote:last-child {
      color: green;
    }
  </style>
</head>
<body>
  <h1 id="heading">My Cool Page</h1>

  <main id="main">
    <div id="quote">
      "The hardest choices require the strongest wills."
    </div>
    <div id="lorem">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
    </div>
  </main>
</body>
```

Obviously there is a lot of repetition in this file. An experienced developer will see that the html needlessly repeats what is already defined in the styles.

You could rewrite the file to have an empty `<body>` and not lose any information, except the text inside the tags.

Introducing HTML-in-CSS! By installing this package you will be able to omit the html and have it be generated from the styles. 

```html
<head>
  <style>
    h1#heading {
      font-size: x-large;
      font-weight: 600;
      margin-bottom: 32px;
    }

    main#main {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    #main > #quote:first-child {
      font-style: italic;
    }

    #main > #quote:last-child {
      color: green;
    }
  </style>
</head>
<body></body>
```

This vastly improves the ergonomics, with only a few small tradeoffs:

- All your styles should be written in a way, that can strictly define their position in the DOM. `id`, `:nth-child` and `>` are your best friends.
- All of your content should be in `::before` and `::after` pseudo elements, since this is the only way to have text in css.
- All of the page is created in runtime by js. Your initial document will be empty with only CSS. This may have a negative impact on your SEO. 
