const selectors = {
  allThumbnailContainer: () => {
    throw Error("impelemnt");
  },
  thumbnailSelector: "ytd-thumbnail",
  thumbnailContainer: "ytd-thumbnail",
  thumbnail: "ytd-thumbnail>a#thumbnail",
  reactThumbnailReplacementContainer: `ytd-thumbnail>div[name="thumbnail-react-container"]`,
};
const thumbnailSelector = selectors.thumbnailSelector;
function getAllThumbnailContainer(currentDocument: Document = document) {
  return currentDocument.querySelector(selectors.allThumbnailContainer);
}
function getAllThumbnails(currentDocument: Document = document) {
  return currentDocument.querySelectorAll(selectors.thumbnailSelector);
}
const DOMSelectors = {
  getAllThumbnailContainer,
  getAllThumbnails,
  thumbnailSelector,
  thumbnail: selectors.thumbnail,
  reactThumbnailReplacementContainer:
    selectors.reactThumbnailReplacementContainer,
};
export default DOMSelectors;
