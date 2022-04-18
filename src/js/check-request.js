import { Notify } from 'notiflix';

export function checkRequest(response) {
  if (response.hits.length === 0) {
    return;
  }

  Notify.success(`Hooray! We found ${response.totalHits} totalHits images.`);

  return response;
}
