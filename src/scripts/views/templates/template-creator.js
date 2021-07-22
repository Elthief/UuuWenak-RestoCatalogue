import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
        <h2 class="resto__name">${restaurant.name}</h2>
        <p class="resto__address">${restaurant.address}</p>
        <img class="resto__image" src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}" alt="${restaurant.name}" />
        <div class="resto__info">
            <h3>Information</h3>
              <h4>Rating : 
              <span class="resto__info__rating">${restaurant.rating}</span>
              </h4>
              <h4>City : <span class="resto__info__city">${restaurant.city}</span></h4>
              <h4>Categories : <span class="resto__info__category">${restaurant.categories.map((category) => category.name).join(', ')}</span></h4>
        </div>
        <div class="resto__main">
            <h3>Description</h3>
            <p>${restaurant.description}</p>
            <h3 class="resto__main__menus">Menus</h3>
            <div class="resto__main__menus__foods">
                <h4>Foods</h4>
                <p>${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
            </div>
            <div class="resto__main__menus__drinks">
                <h4>Drinks</h4>
                <p>${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</p>
            </div>
            <div class="resto__main__reviews">
                <h3>Customer Reviews</h3>
                    ${restaurant.customerReviews.map((review) => `
                    <div class="resto__reviews__list">
                        <h4 class="resto__reviews__list__name">${review.name}</h4>
                        <p class="resto__reviews__list__date"> - ${review.date}</p>
                        <p class="resto__reviews__list__review">${review.review}</p>
                    </div>
                    `).join('')}
            </div>
        </div>
`;

const createSkeletonRestaurantItemTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
            <div class="resto-item">
                <div class="resto-item__header">
                    <div class="resto-item__header__rating">
                        <p>⭐️</p>
                    </div>
                    <img class="resto-item__header__image" width="100%" heigth="350px" src="./images/placeholder.png" alt="skeleton">
                </div>
                <div class="resto-item__content">
                    <h3 class="skeleton">Lorem ipsum dolor sit.</h3>
                    <h3 class="skeleton">Lorem ipsum dolor sit.</h3>
                    <p class="skeleton">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias aspernatur, assumenda aut consectetur consequuntur debitis deleniti dicta dolorem dolorum eos exercitationem labore laboriosam magni nihil, nobis obcaecati optio perspiciatis placeat qui recusandae saepe sapiente sequi totam ullam ut.</p>
                </div>
            </div>       
        `;
  }
  return template;
};

const createRestaurantItemTemplate = (restaurant) => `
    <div class="resto-item">
        <div class="resto-item__header">
            <div class="resto-item__header__rating">
                <p>⭐️ <span class="resto-item__header__rating__score">${restaurant.rating || '-'}</span></p>
            </div>
            <img class="resto-item__header__image lazyload" width="100%" heigth="350px" src="./images/placeholder.png" alt="${restaurant.name || '-'}" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}">
        </div>
        <div class="resto-item__content">
            <h3 class="resto-item__content__name restaurant__name"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name || '-'}</a></h3>
            <h3 class="resto-item__content__city">City : ${restaurant.city}</h3>
            <p class="resto-item__content__description">${restaurant.description || '-'}</p>
        </div>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
    <button aria-label="add this restaurant to favorite" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
    <button aria-label="remove this restaurant from favorite" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

const createAddReviewTemplate = () => `
    <h3>Add Your Review</h3>
    <form class="add-review__container">
        <label for="form-name">Name <input id="form-name" type="text" size="30" placeholder="type your name" aria-label="form name"></label>
        
        <label for="form-review">Review<textarea id="form-review" type="text" cols="32" rows="3" placeholder="type your review" aria-label="form review"></textarea></label>
        
        <button id="submit" type="button" class="submitButton" aria-label="submit review">Submit</button>
    </form>
    `;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createSkeletonRestaurantItemTemplate,
  createAddReviewTemplate,
};
