// Assignment 6 js file 
const error = document.getElementById('error');
const totalResult = document.getElementById('total-result');
const parent = document.getElementById('parent');
const spinner = document.getElementById('spinner');

/* .................
.........load the data  */

const loadData = () => {

    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;

    inputField.value = '';
    spinner.classList.remove('d-none');

    const url = (`https://openlibrary.org/search.json?q=${inputFieldValue}`)
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data));
}
/* data show function */
const showData = (books) => {
    console.log(books);
    spinner.classList.add('d-none');
    // error handle
    if (books.numFound === 0) {
        error.innerText = 'No Result Found';

        parent.textContent = '';
        totalResult.innerText = '';


    }
    else {
        error.innerText = '';
        // total result
        totalResult.innerText = ` Total result found : ${books.num_found}`
        const booksLists = books.docs;

        const parent = document.getElementById('parent');
        parent.textContent = '';
        booksLists.forEach((booksLists) => {
            console.log(booksLists);
            const div = document.createElement('div');
            div.innerHTML = `
        
        <div class="">
        <div class="col">
            <div class="card h-100 shadow-lg p-3 mb-5 bg-body rounded">
            <img src="https://covers.openlibrary.org/b/id/${booksLists.cover_i}-M.jpg " class="card-img-top img-fluid" alt="...">
           
        <div class="card-body">
            <h3 class="card-title">Book name : ${booksLists.title ? booksLists.title : 'Not Found'}</h3>
            <h5 class="card-text">Author : ${booksLists.author_name ? booksLists.author_name : 'Not Found'}</h5>
            <h5 class="card-text">First published : ${booksLists.first_publish_year ? booksLists.first_publish_year : 'Not Found'}</h5>
            <h5 class="card-text">Publisher : ${booksLists.publisher ? booksLists.publisher : 'Not Found'}</h5>
        </div>
            </div >
        </div >
    </div >
    `
            parent.appendChild(div);

        })
    }
}
