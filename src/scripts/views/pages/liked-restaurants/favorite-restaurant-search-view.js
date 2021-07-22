/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
        <div class="content">
            <input class="query" id="query" type="text" placeholder="Search" aria-label="search box">
            <h1 class="content__label" tabindex="0">Your Favorite Restaurants</h1>
            <div id="restaurants" class="restaurants"></div>
        </div>  
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found"><h3>Your favorite restaurant is not found</h3></div>';
  }
}

export default FavoriteRestaurantSearchView;
