// Pagination

function paginate(selectedPage, totalPages) {
  // let totalPages = "";
  // let selectedPage = "";
  let pages = [];
  let oldPage;

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
      if(oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }

      if(oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }
      
      pages.push(currentPage)

      oldPage = currentPage
    }
  }
  return pages;
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total)

  let elements = "";

for (let page of pages) {
  if(String(page).includes("...")) {
    elements += `<span>${page}</span>`

  } else {
    if (filter) {
      elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`

    } else {
      elements += `<a href="?page=${page}">${page}</a>`
    }
  }
}

  pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination-content");

if(pagination) {
  createPagination(pagination);
}






// Show-Hide buttons

const hideButtons = document.querySelectorAll(".show-hide");
const content = document.querySelectorAll(".topic-content");

for (let hideButton in hideButtons) {
  hideButtons[hideButton].addEventListener("click", function(){
    if(hideButtons[hideButton].innerHTML === "ESCONDER"){
      content[hideButton].classList.add('hide')
      hideButtons[hideButton].innerHTML = "MOSTRAR";
        
    }else if (hideButtons[hideButton].innerHTML === "MOSTRAR"){
      content[hideButton].classList.remove('hide')
      hideButtons[hideButton].innerHTML = "ESCONDER";
    }
  });
};


