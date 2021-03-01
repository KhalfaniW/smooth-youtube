import {useDispatch, useSelector} from "react-redux";
import React from "react";

import {getEffectStore} from "./redux/modules/rxjsEpics";
import {getIsOriginalElementHidden} from "./replace-element";

export const ActionNames = {
  toggleThumbnail: "Toggle Thumbnail",
  showThumbnailButtonText: "Show Thumbnail",
  hideThumbnailButtonText: "Hide Thumbnail",
};

export const ThumbnailHider: React.FC = ({index}: {index: number}) => {
  const {count} = useSelector((state: any) => {
    return {
      count: state.totalThumnailsHidden,
      /* isThumbnailShown: state.thumbnailStates[index] === ThumbnailState.HIDDEN, */
    };
  });
  const dispatch = useDispatch();

  return (
    <div style={{zIndex: 44, position: "relative"}}>
      <button
        onClick={() => {
          dispatch({type: "HIDE_THUMBNAIL", index: index});
        }}
      >
        {ActionNames.hideThumbnailButtonText}
      </button>

      <button
        onClick={() => {
          dispatch({type: "SHOW_THUMBNAIL", index: index});
        }}
      >
        {ActionNames.showThumbnailButtonText}
      </button>

      <br />
      {count}
    </div>
  );
};
