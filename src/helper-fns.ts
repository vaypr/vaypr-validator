import { TS_DESIGN_TYPE } from './constants';

export function getTypeDesign(target: any, propertyKey: string) {
  return Reflect.getMetadata(TS_DESIGN_TYPE, target, propertyKey);
}
