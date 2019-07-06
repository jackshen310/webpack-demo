import { isFunction } from 'lodash';
const show = (str: string | Function) => {
  if (isFunction(str)) {
    console.log((str as Function)());
  } else {
    console.log(str);
  }
};
export { show };
export default show;
