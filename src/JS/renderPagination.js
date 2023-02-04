import { pagination } from "./functionPagination"

const list = document.querySelector('.pagination')
const paginationArr = pagination(15,20)
// console.log(paginationArr)   

//розмітка для стрілочок
const leftArrowMarkup = `
<li class="pagination__item">
 <a href="" class="pagination__link">
   <svg class="pagination__icon" width="16" height="16">
     <use href="./images/icons/icons.svg#arrow-left"></use>
   </svg>
 </a>
 </li>
 `
const rightArrowMarkup = `
<li class="pagination__item">
<a href="" class="pagination__link">
  <svg class="pagination__icon" width="16" height="16">
    <use href="./images/icons/icons.svg#arrow-left"></use>
  </svg>
</a>
</li>
`
//масив чисел
const numbersArr = paginationArr.filter(el => Number(el) === Number(el)).map(el => Number(el))
const number1 = Math.min(...numbersArr)
const number20 = Math.max(...numbersArr)

markupRender(paginationArr)
//рендер розмітки
function markupRender(array){
array.map(page => {
     if(page === '<-'){
        list.insertAdjacentHTML('beforeend',leftArrowMarkup)
     } 
else if(page === '->'){
        list.insertAdjacentHTML('beforeend',rightArrowMarkup) 
    }
else if(page.includes('active')){
        const updatedPageName = page.replace('active','')
        list.insertAdjacentHTML('beforeend', `<li class="pagination__item pagination__item--isActive"> 
        <a href="" class="pagination__link">${updatedPageName}</a>
        </li>`)
    }    
else if(Number(page) === number1 || Number(page) === number20 || page === '...'){
        list.insertAdjacentHTML('beforeend', `<li class="pagination__item pagination__item--desktop">
        <a href="" class="pagination__link">${page}</a>
        </li>
        `)
}  
else {
    list.insertAdjacentHTML('beforeend', `<li class="pagination__item"><a href="" class="pagination__link">${page}</a></li>`)
}
    })
}