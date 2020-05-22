Below is a basic query looking for all books and getting their available, title, and id attributes

query {
  books {
    available, 
    title,
    id
  }
}

Below is a basic query looking for a single book with an id of 0 and getting its title

query { 
  book(id:0) {
    title,
  }
}

