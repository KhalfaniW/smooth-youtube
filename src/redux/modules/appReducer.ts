import produce from "immer";

//TODO
export function reduceAppState(
  state: any = {
    totalThumnailsHidden: 0,
  },
  action: any,
): any {
  return produce(state, (draftState: any) => {
    switch (action.type) {
      case "PONG":
        return draftState;
      case "PING":
        return draftState;
      case "HIDE_THUMBNAIL":
        draftState.totalThumnailsHidden++;
        return draftState;
      case "SHOW_THUMBNAIL":
        draftState.totalThumnailsHidden = Math.max(
          draftState.totalThumnailsHidden - 1,
          0,
        );
        return draftState;

      default:
        return state;
    }
  });
}
