import { getImg } from './js/Api';
import { getRefs } from './js/getRef';
import { renderMarkup } from './js/renderingMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './style.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const { formRef, containerRef } = getRefs();

formRef.addEventListener('submit', onSubmit);
onSubmit();

function onSubmit(e) {
  e.preventDefault();
  let input;
  let page = 1;
  input = e.currentTarget.searchQuery.value.trim();
  if (!input) {
    return;
  }
  try {
    getImg(input, page).then(createGallery);
  } catch (error) {
    console.error(error);
  }
}

function createGallery(data) {
  containerRef.insertAdjacentHTML('beforeend', renderMarkup(data));
  lightbox.refresh();
}
