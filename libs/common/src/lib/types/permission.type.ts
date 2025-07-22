import { ModelAction } from './model-action.enum';

export type Permission = {
  model: string;
  actions: Array<ModelAction>;
};
