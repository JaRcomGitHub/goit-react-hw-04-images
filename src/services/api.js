import axios from "axios";

const API_KEY = "29840548-44be53550e175681813a70adf";

function getPixabayURL(searchTerm, pageNum, perPage) {
  const basePixabayURL = "https://pixabay.com/api/";
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: perPage,
    page: pageNum,
  });
  return `${basePixabayURL}?${searchParams}`;
}

export async function axiosGetPixabayPhoto(requestTerm, numPage, perPage) {
  const url = getPixabayURL(requestTerm, numPage, perPage);
  try {
    const response = await axios.get(url);
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
