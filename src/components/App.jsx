import { useState, useEffect } from "react";
import Notiflix from 'notiflix';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import axiosGetPixabayPhoto from "../services/api"

const PER_PAGE = 12;
const PHOTO_LIMIT = 500;

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pageCnt, setPageCnt] = useState(1);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urlBigPhoto, setUrlBigPhoto] = useState('');
  const [tagsBigPhoto, setTagsBigPhoto] = useState('');
  const [isNextPage, setIsNextPage] = useState(true);
  
  const responseGalleryPhoto = (data) => {
    //const total = data.total;
    const totalHits = data.totalHits;
    const hits = data.hits;

    //console.log(total);
    //console.log(totalHits);
    //console.log(hits);

    setLoading(false);
    
    setGalleryPhotos(prevGalleryPhotos => [...prevGalleryPhotos, ...hits]);

    if (totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if ((pageCnt > 1) && (hits.length < PER_PAGE)) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      setIsNextPage(false);
    }
  }

  const gotAnError = (error) => {
    //if (error.message == 404) { }
    if (error.message === 400) {
      if (pageCnt > (PHOTO_LIMIT/PER_PAGE)) {
        Notiflix.Notify.info('The API is limited to return a maximum of 500 images per query.');
        setIsNextPage(false);
      } else {
        Notiflix.Notify.warning('Reset page.');
      }
    }
  }
  
  useEffect(() => {
    if (searchValue !== '') {
      // console.log('getGalleryPhotoByNumPage');
      setLoading(true);

      // getGalleryPhotoByNumPage();
      axiosGetPixabayPhoto(searchValue, pageCnt, PER_PAGE).then(data => {
        responseGalleryPhoto(data.data);
      }).catch(error => {
        //console.log(error);
        gotAnError(error);
      });
    }
    // eslint-disable-next-line
  }, [searchValue, pageCnt]);

  const handleSearchValue = searchValueNew => {
    if (searchValue !== searchValueNew) {
      setSearchValue(searchValueNew);
      setPageCnt(1);
      setGalleryPhotos([]);
      setIsNextPage(true);
      //console.log('gallery reset');
    }
  }

  const handleNextPage = () => {
    //console.log('onClick ok');
    setPageCnt(prevPageCnt => (prevPageCnt + 1));
  }

  const handleBigPhoto = (url, tags) => {
    setUrlBigPhoto(url);
    setTagsBigPhoto(tags);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchValue} />
      {galleryPhotos.length > 0 &&
        <ImageGallery galleryPhotos={galleryPhotos} onClick={handleBigPhoto} />
      }
      {loading && <Loader />}
      {galleryPhotos.length > 0 && isNextPage && <Button onClick={handleNextPage} />}
      {urlBigPhoto.length > 0 &&
        <Modal
          urlImage={urlBigPhoto}
          tag={tagsBigPhoto}
          onClose={() => handleBigPhoto('', '')} 
        />
      }
    </div>
  )
};
