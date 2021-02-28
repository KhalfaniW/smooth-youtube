export interface EffectStore {
  elementPairs: Array<any>;
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
