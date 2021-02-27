const selectors = {
  thumbnailContainer: "ytd-thumbnail",
  thumbnail: "ytd-thumbnail>a#thumbnail",
  reactThumbnailReplacementContainer: `ytd-thumbnail>div[name="thumbnail-react-container"]`,
};

const findThumbnailAtIndex = () =>
  document.querySelectorAll(selectors.thumbnail)[1];

const initializeSite = () => {
  page.goto("https://youtube.com");
};
test("should replace elment and make it invisible", async () => {
  await initializeSite();

  const findThumbnail = () => findThumbnailAtIndex(1);
  const findContainer = () =>
    getElementAtIndex({
      selector: selectors.thumbnailContainer,
      index: 1,
    });

  document.innerHTML = ``;
});
