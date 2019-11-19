const sidebarElement = document.getElementById('sidebar');
const addNewBookBtn = document.getElementById('new-book-btn');
const closeSidebarBtn = document.getElementById('close-btn');
const saveNewBookBtn = document.getElementById('save-btn');

let library = [];

const Book = function([title, author, descript]) {
  this.title = title;
  this.author = author;
  this.descript = descript;
};

function addBooks(book) {
  library.push(book);
}

let book1 = new Book(["The Da Vinci Code", "Dan Brown", "Fiction book"]);
let book2 = new Book(["Harry Potter", "J.K.Rowling", "Book for children"]);
addBooks(book1);
addBooks(book2);

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

addNewBookBtn.addEventListener('click', () => {
  sidebarElement.style.display = 'block';
});

closeSidebarBtn.addEventListener('click', ()=> {
  sidebarElement.style.display = 'none';
});

saveNewBookBtn.addEventListener('click', () => {

})

document.getElementById('new-book-form').addEventListener('submit', (e) => {
  const formData = new FormData(e.target);
  const data = []
  formData.forEach((inputData) => {
    data.push(inputData)
  })
  addBooks(new Book(data));
  render();
  e.preventDefault()
});