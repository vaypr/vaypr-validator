import { getTypeDesign } from '../helper-fns';

export function Key(target: any, propertKey) {
  const type = getTypeDesign(target, propertKey);
  console.log(type);
}
