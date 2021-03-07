import {HTMLElementReplacementPair} from "inject-react";

export interface EffectAction {
  any;
}
export interface EffectStore {
  elementPairs: Array<HTMLElementReplacementPair>;
  document?: Document;
}
//TODO make redux like
export let effectStore: EffectStore;

export function createEffectStore(): EffectStore {
  return {
    elementPairs: [],
    document: undefined,
  };
}
export function updateEffectStore(newEffectStore: EffectStore) {
  effectStore = newEffectStore;
}

export function retrieveEffectStore(): EffectStore {
  return effectStore;
}
