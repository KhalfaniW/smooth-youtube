import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

export const ActionNames = {
  showThumbnail: "Show Thumbnail",
};
export const ThumbnailHider: React.FC = ({index}: {index: number}) => {
  const count = useSelector((state: any) => state.totalThumnailsHidden);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({type: "PING", index: index});
          {
            /* dispatch({type: "HIDE_THUMBNAIL", index: index}); */
          }
        }}
      >
        {ActionNames.showThumbnail}
      </button>
      <br />
      {count}
      Thumbnail Is Shown
    </div>
  );
};

export const MagicThumbnailWrapper: React.FC = ({
  document,
}: {
  document: document;
}) => {
  const parentRef = useRef(null);
  const [showhatShow, setShowhatShow] = useState("button");
  function setup() {
    alert(document.querySelectorAll("ytd-rich-item-renderer")[1]);
    parentRef.current!.appendChild(
      document.querySelectorAll("ytd-rich-item-renderer")[1],
    );
  }
  useEffect(() => {
    console.log("test");
    return () => {};
  }, []);
  /* const count = useSelector((state: any) => state.totalThumnailsHidden); */
  /* const dispatch = useDispatch(); */
  return (
    <div
      style={{
        zIndex: 9999,
      }}
    >
      {showhatShow == "thumbnail" ? <div ref={parentRef}></div> : 0}
      <button
        id="abc"
        onClick={() => {
          setShowhatShow("nothing");
        }}
      >
        "Show nothing"
      </button>
      <button
        id="abc4"
        onClick={() => {
          setShowhatShow("thumbnail");
        }}
      >
        thumb
      </button>
      <button
        id="abc4"
        onClick={() => {
          setup();
        }}
      >
        SETUP
      </button>
      <br />
      Thumbnail Is Shown
    </div>
  );
};
