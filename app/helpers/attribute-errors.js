import { helper } from '@ember/component/helper';

export function attributeErrors([errors]) {
  if (errors) {
    return errors.mapBy('message').join(' and ');
  }
}

export default helper(attributeErrors);
