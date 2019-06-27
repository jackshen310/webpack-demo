import { isFunction } from 'lodash';
const show = str => {
  if (isFunction(str)) {
    console.log(str());
  } else {
    console.log(str);
  }
};
export { show };
export default show;
