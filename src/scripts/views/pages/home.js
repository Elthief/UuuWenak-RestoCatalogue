import RestaurantDataSource from '../../data/restaurantdata-source';
import {
  createRestaurantItemTemplate,
  createSkeletonRestaurantItemTemplate,
} from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="content">
    <h1 class="content__label" tabindex="0">Explore Restaurant</h1>
      <div id="restaurants" class="restaurants">
      ${createSkeletonRestaurantItemTemplate(20)}
      </div>    
    </div>  
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDataSource.restaurantList();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
