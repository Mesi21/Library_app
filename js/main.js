const sidebarElement = document.getElementById("sidebar");
const addNewBookBtn = document.getElementById("new-book-btn");
const closeSidebarBtn = document.getElementById("close-btn");
const saveNewBookBtn = document.getElementById("save-btn");
const contentElement = document.getElementById("content");
const formElement = document.getElementById("new-book-form");
let library = [];

const Book = function([title, author, descript]) {
  this.title = title;
  this.author = author;
  this.descript = descript;
};

function addBooks(book) {
  library.push(book);
}

const toggleSidebar = () =>
  (sidebarElement.style.display =
    sidebarElement.style.display === "block" ? "none" : "block");

function render() {
  if (library.length > 0) {
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
        <tr id="row-${i}">
          <td>${i}</td>
          <td>${title}</td>
          <td>${author}</td>
          <td>${descript}</td>
        </tr>`;
      i++;
    });
    books += `</tbody></table>`;
    contentElement.innerHTML = books;
  } else {
    contentElement.innerHTML =
      "<hr width='80%'><h1 class='empty-note'> There is no book in this library</h1>";
  }
}

render();

addNewBookBtn.addEventListener("click", () => {
  toggleSidebar();
});

closeSidebarBtn.addEventListener("click", () => {
  toggleSidebar();
});

saveNewBookBtn.addEventListener("click", () => {});

formElement.addEventListener("submit", e => {
  const formData = new FormData(e.target);
  const data = [];
  formData.forEach(inputData => {
    data.push(inputData);
  });
  addBooks(new Book(data));
  render();
  formElement.reset();
  toggleSidebar();
  e.preventDefault();
});
