import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  mock,
  mockQuery,
  build,
  buildList,
  setupFactoryGuy
} from 'ember-data-factory-guy';

module('Acceptance | login test', function (hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('User is redirected to the login page if visiting a protected page', async function (assert) {
    await visit('/ask');

    assert.equal(currentURL(), '/login');
  });

  test('Submitting an empty login form', async function (assert) {
    await visit('/login');

    mock({
      type: 'POST',
      url: '/oauth/token',
      responseText: '{}',
      status: 401
    });

    await click('.login-form__submit');

    assert.dom('.login-form__error').containsText('Invalid login.');
  });

  test('Successfully logging in', async function (assert) {
    mock({
      type: 'GET',
      url: '/api/v1/users/me',
      responseText: build('user')
    });

    mockQuery('question').returns({ json: buildList('question', 8) });

    await visit('/login');

    mock({
      type: 'POST',
      url: '/oauth/token',
      responseText: {
        access_token:
          '5697d372e8b00fea8c586bca2efd4115b2fcee9ddc2c2a174d71397713f0ebcc',
        token_type: 'Bearer',
        expires_in: 7200,
        refresh_token:
          'c3e9302f8e8b4e6054ea93427340df64c9aa8f1d99c133e42d9cd85b4e7fcfc5',
        created_at: 1622000882
      },
      status: 200
    });

    await click('.login-form__submit');

    assert.equal(currentURL(), '/');
  });
});
