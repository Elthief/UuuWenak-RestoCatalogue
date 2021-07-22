/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
const assert = require('assert');

Feature('Liking Restaurants and Searching Favorite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Your favorite restaurant is not found', '.restaurant-item__not__found');
});

Scenario('liking a restaurant and unliking restaurant', async ({ I }) => {
  I.see('Your favorite restaurant is not found', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name a');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Unliking Restaurant
  I.click('.restaurant__name a');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('resto-item');
});

Scenario('searching favorite restaurants', async ({ I }) => {
  I.see('Your favorite restaurant is not found', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    names.push(await I.grabTextFrom('.resto__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.scrollPageToBottom();
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleFavoriteRestaurants = await I.grabNumberOfVisibleElements('.resto-item');
  assert.strictEqual(matchingRestaurants.length, visibleFavoriteRestaurants);

  matchingRestaurants.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.restaurant__name a').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});
