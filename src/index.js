import axios from 'axios';
import Notiflix from 'notiflix';

const formEl = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let pageNumber = 1;

formEl.style = "background-color:blue; height:50px; display:flex; justify-content:center; align-items:center;";
loadMore.classList.add('is-hidden');
loadMore.style.display = 'none';
async function getData(e) {
  e.preventDefault();
  const userSearch = input.value;
  const response = await axios.get(
    `https://pixabay.com/api?key=35080305-0da6bce0dc03cbbd2e9e87a88&q=${userSearch}&image_type=photos&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
  );
  
  
  
  gallery.style = "display:flex; flex-wrap:wrap; gap:30px; margin:20px 5px";
  response.data.hits.forEach(item => {  
    const div = document.createElement('div');
    
    div.setAttribute('class', 'photo-card');
    div.innerHTML = `
    <img src="${item.webformatURL}" alt="${item.tags}" width="300px" height="200" loading="lazy" />
    <div class="info" style="display:flex; gap:23px; " >
      <p class="info-item" style="display:flex; flex-direction: column; text-align: center;">
        <b>Likes</b>
         ${item.likes}
      </p>
      <p class="info-item" style="display:flex; flex-direction: column; text-align: center;">
        <b>Views</b>
         ${item.views}
      </p>
      <p class="info-item" style="display:flex; flex-direction: column; text-align: center;">
        <b>Comments</b>
         ${item.comments}
      </p>
      <p class="info-item" style="display:flex; flex-direction: column; text-align: center;">
        <b>Downloads</b>
         ${item.downloads}
      </p>
    </div>
    `;
    
    gallery.append(div);
  });




  let totalHits = 0;
  if (totalHits = response.data.totalHits) {
   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`) 
  }

  if (response.data.hits.length < 40) {
    loadMore.style.display = "none";
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  } else {
    loadMore.style.display = "block";
  }
}


formEl.addEventListener('submit', e => {
  loadMore.classList.remove('is-hidden');
  loadMore.style.display = 'block';
  loadMore.style = "background-color:blue; color:white; ";
  pageNumber++;
  getData(e);
  
})


loadMore.addEventListener('click', e => {
  
  getData(e);
  pageNumber++;
  
});





