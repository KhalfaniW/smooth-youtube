import { HTMLElementReplacementPair } from '../../replace-element';

export interface EffectStore {
  elementPairs: Array<HTMLElementReplacementPair>;
  document?: Document;
}
//TODO make redux like
export let effectStore: EffectStore;

export function initializeEffectStore() {
  effectStore = {
    elementPairs: [],
    document: undefined,
  };
  return;
}
