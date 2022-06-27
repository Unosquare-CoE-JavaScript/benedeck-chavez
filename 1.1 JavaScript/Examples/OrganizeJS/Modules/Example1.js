//Modules
"use strict";

function Publication(title, author, pubDate) {
  var publicAPI = {
    print() {
      console.log(`Title:${title} \nBy:${author}${pubDate}`);
    },
  };

  return publicAPI;
}

function Book(bookDetails) {
  var pub = Publication(
    bookDetails.title,
    bookDetails.author,
    bookDetails.publishedOn
  );
  var publicAPI = {
    print() {
      pub.print();
      console.log(
        `Publisher:${bookDetails.publisher} \nISBN:${bookDetails.ISBN}`
      );
    },
  };
  return publicAPI;
}

function BlogPost(title, author, pubDate, URL) {
  var pub = Publication(title, author, pubDate);
  var publicAPI = {
    print() {
      pub.print();
      console.log(`URL:${URL}`);
    },
  };
  return publicAPI;
}

var YDKJS = Book({
  title: "You Don't Know JS",
  author: "Kyle Simpson",
  publishedOn: "June 2014",
  publisher: "O'Reilly",
  ISBN: "123456-789",
});
YDKJS.print();
// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789

console.log("");

var forAgainstLet = BlogPost(
  "For and against let",
  "Kyle Simpson",
  "October 27, 2014",
  "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-le
