import DS from 'ember-data';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  namespace: ENV.apiNamespace,
  host: ENV.serverURL,
  pathForType(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  },
  findRecord(_store, type, id, snapshot) {
    // This is to include extra params with findRecord
    if (snapshot.adapterOptions && snapshot.adapterOptions.extra_params) {
      let url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
      const extraParams = snapshot.adapterOptions.extra_params;
      return this.ajax(url, 'GET', { data: extraParams });
    } else {
      return this._super(...arguments);
    }
  }
});
