import * as _ from "lodash";
import produce from "immer";

enum ThumbnailStates {
  HIDDEN = "hidden",
  SHOWN = "shown",
}
export function reduceAppState(
  state: {
    totalThumnailsHidden: number;
    isInitialized: boolean;
    thumbnailStates: Array<ThumbnailStates>;
  } = {
    totalThumnailsHidden: 0,
    thumbnailStates: [],
    isInitialized: false,
  },
  action: any,
): any {
  return produce(state, (draftState: any) => {
    switch (action.type) {
      case "RESET":
        const resetStateValue = undefined;
        return resetStateValue;

      case "PONG":
        return draftState;
      case "PING":
        return draftState;

      case "INITIALIZE_HANDLED":
        draftState.isInitialized = true;
        draftState.thumbnailStates = _.range(
          draftState.thumbnailStates.length,
          action.thumbnailCount,
        ).map((thumbnailIndex: number) => ThumbnailStates.HIDDEN);
        return draftState;
      case "ADD_THUMBNAIL":
        draftState.push(action.thumbnailIndex);
        return draftState;
      case "HIDE_THUMBNAIL":
        draftState.totalThumnailsHidden++;
        draftState.thumbnailStates[action.index] = ThumbnailStates.HIDDEN;
        return draftState;

      case "SHOW_THUMBNAIL":
        draftState.totalThumnailsHidden = Math.max(
          draftState.totalThumnailsHidden - 1,
          0,
        );
        draftState.thumbnailStates[action.index] = ThumbnailStates.SHOWN;

        return draftState;

      default:
        return state;
    }
  });
}
function createHiddenThumbnailAtIndex(index) {
  return {
    thumbnailState: ThumbnailStates.HIDDEN,
  };
}
