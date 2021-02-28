import {ofType} from "redux-observable";

import {tap, mapTo, map} from "rxjs/operators";

import {EffectStore, effectStore} from "./effectStore";
import {
  ElementShown,
  getElementShown,
  getIsOriginalElementHidden,
  hideOriginalElement,
  injectElement,
  showOriginalElement,
} from "../../replace-element";

let DomElements = [];
//Dom nodes cant goin app state or store
//store effect data here
export function getEffectStore() {
  return effectStore;
}
const safelyEndEpic = () => {
  return map((action: any) => {
    return {
      type: action.type + "_HANLDED",
    };
  });
};

// function createElementAndReactState() {
//   return {
//     elementState: "Hidden",
//     elementPair: [],
//   };
// }
export function getTotalThumbnailsHidden(effectStore: EffectStore) {
  const allShownElements = effectStore.elementPairs.filter((elementPair) =>
    getIsOriginalElementHidden({elementPair}),
  );
  return allShownElements.length;
}

export function getTotalThumbnailsShown(effectStore: EffectStore) {
  const allHiddenElements = effectStore.elementPairs.filter(
    (elementPair) => getElementShown({elementPair}) === ElementShown.React,
  );
  return allHiddenElements.length;
}
//NOTE: If you let an incoming action pass through, it will create an infinite loop:
//TODO change ofType to auto map to dif type

//TODO move effect store to only change on dispatch

export const initializeAppInjectEpic = (action$: any) =>
  action$.pipe(
    ofType("INITIALIZE"),

    tap((action: any) => {
      // action$.document.
      effectStore.document = action.document;

      effectStore
        .document!.querySelectorAll("ytd-thumbnail")
        .forEach((element, thumbnailIndex) => {
          const elementPair = injectElement({
            currentDocument: document,
            jsx: action.renderAtIndex(thumbnailIndex),
            index: thumbnailIndex,
          });
          hideOriginalElement({elementPair});
          effectStore.elementPairs.push(elementPair);
        });
    }),
    safelyEndEpic(),
  );

export const showThumbnailEpic = (action$: any) =>
  action$.pipe(
    ofType("SHOW_THUMBNAIL"),
    tap((action: any) => {
      showOriginalElement({
        elementPair: effectStore.elementPairs[action.index],
      });
    }),
    mapTo({type: "4HIDE_THUMBNAIL"}),

    safelyEndEpic(),
  );

export const hideThumbnailEpic = (action$: any) =>
  action$.pipe(
    ofType("SHOW_THUMBNAIL"),
    tap((action: any) => {
      showOriginalElement({
        elementPair: effectStore.elementPairs[action.index],
      });
    }),
    safelyEndEpic(),
  );

export const pingEpic = (action$: any) =>
  action$.pipe(
    ofType("PING"),

    // delay(1000), // Asynchronously wait 1000ms then continue
    tap(() => {
      console.log("test log2");
      effectStore.elementPairs.push(5);
      console.log(effectStore);
    }),

    mapTo({type: action$.type + "_HANDLED"}),
  );
