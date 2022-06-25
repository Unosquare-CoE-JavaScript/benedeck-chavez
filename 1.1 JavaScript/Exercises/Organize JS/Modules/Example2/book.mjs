import { create as createPub } from "./publication.mjs";
function printDetails(pub, publisher, ISBN) {
  pub.print();
  console.log(`Publisher:${publisher} \nISBN:${ISBN}`);
}
export function create(bookDetails) {
  var pub = createPub(
    bookDetails.title,
    bookDetails.author,
    bookDetails.pubDate
  );
  var publicAPI = {
    print() {
      printDetails(pub, bookDetails.publisher, bookDetails.ISBN);
    },
  };
  return publicAPI;
}
