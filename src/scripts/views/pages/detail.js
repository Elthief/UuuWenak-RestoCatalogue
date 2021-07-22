/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import RestaurantDataSource from '../../data/restaurantdata-source';
import UrlParser from '../../routes/url-parser';
import { createAddReviewTemplate, createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const Detail = {
  async render() {
    return `
        <h1 class="content__label" tabindex="0">Restaurant Detail</h1>
        <div id="restaurant" class="restaurant"></div>
        <div id="add-review" class="add-review"></div>
        <div id="likeButtonContainer"></div>  
        `;
  },
  async afterRender() {
    // lazy load font awesome
    let scriptElement = document.querySelector('script[src="https://use.fontawesome.com/b070c8f1df.js"]');

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://use.fontawesome.com/b070c8f1df.js';
      document.body.appendChild(scriptElement);
    }

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDataSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    const addReview = document.querySelector('#add-review');
    addReview.innerHTML = createAddReviewTemplate();
    const submitButton = document.querySelector('#submit');
    const formName = document.querySelector('#form-name');
    const formReview = document.querySelector('#form-review');
    const restaurantId = restaurant.id;
    submitButton.addEventListener('click', async () => {
      if (formName.value === '' || formReview.value === '') {
        alert('Kolom tidak boleh kosong!');
        formName.value = '';
        formReview.value = '';
      } else {
        const review = {
          id: restaurantId,
          name: formName.value,
          review: formReview.value,
        };
        const sendReview = await RestaurantDataSource.sendReview(review);
        formName.value = '';
        formReview.value = '';
        alert('Review berhasil ditambahkan!');
        return sendReview;
      }
      // self.skipWaiting();
      // location.reload();
    });

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;
