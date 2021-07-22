/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */

const assert = require('assert');

Feature('Adding Review');

Scenario('adding a review', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.restaurant__name a');
  I.click(locate('.restaurant__name a').first());

  I.seeElement('#form-name');
  I.seeElement('#form-review');

  const formName = 'E2e_testing_name';
  I.fillField('#form-name', formName);
  const formReview = 'E2e_testing_review';
  I.fillField('#form-review', formReview);
  I.click(locate('#submit'));

  I.acceptPopup();
  // Untuk me-refresh dan me-request ulang halaman agar muncul review terbaru
  I.wait(3);
  I.amOnPage('/');
  I.seeElement('.restaurant__name a');
  I.click(locate('.restaurant__name a').first());

  const lastName = locate('.resto__reviews__list__name').last();
  const formNameAdded = await I.grabTextFrom(lastName);
  const lastReview = locate('.resto__reviews__list__review').last();
  const formReviewAdded = await I.grabTextFrom(lastReview);

  assert.strictEqual(formName, formNameAdded);
  assert.strictEqual(formReview, formReviewAdded);
});
