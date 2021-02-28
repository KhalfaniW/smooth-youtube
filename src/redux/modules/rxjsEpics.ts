import {ofType} from "redux-observable";

import {tap, mapTo} from "rxjs/operators";
import * as _ from "lodash";
import {
  ElementShown,
  getElementShown,
  injectElement,
  showOriginalElement,
  showReactElement,
} from "../../replace-element";

let DomElements = [];
//Dom nodes cant goin app state or store
//store effect data here
export interface EffectStore {
  elementPairs: Array<any>;
  document?: Document;
}
let effectStore: EffectStore = {
  elementPairs: [],
  document: null,
};

export function getEffectStore() {
  return effectStore;
}
// function createElementAndReactState() {
//   return {
//     elementState: "Hidden",
//     elementPair: [],
//   };
// }
export function getTotalThumbnailsHidden(effectStore: EffectStore) {
  const allShownElements = effectStore.elementPairs.filter(
    (elementPair) => getElementShown({elementPair}) === ElementShown.React,
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

      effectStore.document
        .querySelectorAll("ytd-thumbnail")
        .forEach((element, thumbnailIndex) => {
          const elementPair = injectElement({
            currentDocument: document,
            jsx: action.renderAtIndex(thumbnailIndex),
            index: thumbnailIndex,
          });
          showReactElement({elementPair});
          effectStore.elementPairs.push(elementPair);
        });

      // console.log({
      //   l: effectStore.document.body.innerHTML.length,
      //   found: .length,
      // });
      // effectStore.elementPairs = Array.from(
      //   effectStore.document.querySelectorAll("ytd-thumbnail"),
      // );
    }),
    mapTo((action: any) => {
      return {
        type: action.type + "_HANDLED",
      };
    }),
  );
export const hideThumbnailEpic = (action$: any) =>
  action$.pipe(
    ofType("PING"),
    // delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({type: "HIDE_THUMBNAIL"}),
    tap(() => {
      console.log("test log");
    }),
  );
export const showThumbnailEpic = (action$: any) =>
  action$.pipe(
    ofType("PING"),
    // delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({type: "HIDE_THUMBNAIL"}),
    tap(() => {
      console.log("test log");
    }),
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
