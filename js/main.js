let library = [];

const Book = function(title, author, descript) {
  this.title = title;
  this.author = author;
  this.descript = descript;
};

function adBooks(book) {
  library.push(book);
}

let book1 = new Book("The Da Vinci Code", "Dan Brown", "Fiction book");
let book2 = new Book("Harry Potter", "J.K.Rowling", "Book for children");
adBooks(book1);
adBooks(book2);

function render() {
  let books = `
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Author</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
    <tbody>`;
  let i = 1;
  library.forEach(({ title, author, descript }) => {
    books += `
        <tr>
          <td>${i}</td>
          <td>${title}</td>
          <td>${author}</td>
          <td>${descript}</td>
        </tr>`;
    i++;
  });
  books += `</tbody></table>`;
  document.getElementById("content").innerHTML = books;
}

render();
