const sidebarElement = document.getElementById('sidebar');
const addNewBookBtn = document.getElementById('new-book-btn');
const closeSidebarBtn = document.getElementById('close-btn');
const contentElement = document.getElementById('content');
const formElement = document.getElementById('new-book-form');

const library = JSON.parse(localStorage.getItem('library')) || [];

function Book([title, author, descript, status = 'not-read']) {
  this.title = title;
  this.author = author;
  this.descript = descript;
  this.status = status;
}

function addBooks(book) {
  library.push(book);
}

const toggleSidebar = () => {
  const state = sidebarElement.style.display === 'block' ? 'none' : 'block';
  sidebarElement.style.display = state;
};

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
    // eslint-disable-next-line object-curly-newline
    library.forEach(({ title, author, descript, status }) => {
      books += `
        <tr id='${i}'>
          <td>${i}</td>
          <td>${title}</td>
          <td>${author}</td>
          <td>${descript}</td>
          <td id='${i}' class='${status === 'not-read' ? 'not-read' : 'read'}'>
          <i class='material-icons'>
          ${status === 'not-read' ? 'maximize' : 'done'}
          </i>
          </td>
        </tr>`;
      i += 1;
    });
    books += '</tbody></table>';
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

formElement.addEventListener('submit', (e) => {
  const formData = new FormData(e.target);
  const data = [];
  formData.forEach((inputData) => {
    data.push(inputData);
  });
  addBooks(new Book(data));
  localStorage.setItem('library', JSON.stringify(library));
  render();
  formElement.reset();
  toggleSidebar();
  e.preventDefault();
});

contentElement.addEventListener('click', (e) => {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(Number(e.target.parentNode.id))) {
    const bookId = Number(e.target.parentNode.id) - 1;
    const currentState = library[bookId].status;
    library[bookId].status = currentState === 'not-read' ? 'read' : 'not-read';
    render();
  }
  e.preventDefault();
});
