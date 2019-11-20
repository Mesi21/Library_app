const sidebarElement = document.getElementById('sidebar');
const addNewBookBtn = document.getElementById('new-book-btn');
const closeSidebarBtn = document.getElementById('close-btn');
const saveNewBookBtn = document.getElementById('save-btn');
const contentElement = document.getElementById('content');
const formElement = document.getElementById('new-book-form');

let library = JSON.parse(localStorage.getItem('library')) || [];

const Book = function([title, author, descript, status = 'not read']) {
  this.title = title;
  this.author = author;
  this.descript = descript;
  this.status = status;
};

function addBooks(book) {
  library.push(book);
}

const toggleSidebar = () =>
  (sidebarElement.style.display =
    sidebarElement.style.display === 'block' ? 'none' : 'block');

function render() {
  if (library.length > 0) {
    let books = `
    <table id='table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Author</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
    <tbody>`;
    let i = 1;
    library.forEach(({ title, author, descript }) => {
      books += `
        <tr id='row-${i}'>
          <td>${i}</td>
          <td>${title}</td>
          <td>${author}</td>
          <td>${descript}</td>
          <td id='status-${i}' class='not-read'><i class='material-icons'>
          maximize
          </i></td>
        </tr>`;
      i++;
    });
    books += `</tbody></table>`;
    contentElement.innerHTML = books;
  } else {
    contentElement.innerHTML = `<table id='table'>
        <hr width='80%'>
        <h1 class='empty-note'> There is no book in this library</h1>
      </table>`;
  }
}

render();

addNewBookBtn.addEventListener('click', () => {
  toggleSidebar();
});

closeSidebarBtn.addEventListener('click', () => {
  toggleSidebar();
});

formElement.addEventListener('submit', e => {
  const formData = new FormData(e.target);
  const data = [];
  formData.forEach(inputData => {
    data.push(inputData);
  });
  addBooks(new Book(data));
  localStorage.setItem('library', JSON.stringify(library));
  render();
  formElement.reset();
  toggleSidebar();
  e.preventDefault();
});

contentElement.addEventListener('click', e => {
  document.getElementById(e.target.id).innerHTML =
    document.getElementById(e.target.id).className === 'not-read'
      ? `<i class='material-icons'>
      done
      </i>`
      : `<i class='material-icons'>
      maximize
      </i>`;
  document.getElementById(e.target.id).className =
    document.getElementById(e.target.id).className === 'not-read'
      ? 'read'
      : 'not-read';
  e.preventDefault();
});
