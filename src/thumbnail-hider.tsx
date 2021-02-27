import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const ActionNames = {
  showThumbnail: "Show Thumbnail",
};
export const ThumbnailHider: React.FC = () => {
  const count = useSelector((state: any) => state.totalThumnailsHidden);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({type: "HIDE_THUMBNAIL"});
        }}
      >
        ActionNames.showThumbnail
      </button>
      <br />
      {count}
    </div>
  );
};
