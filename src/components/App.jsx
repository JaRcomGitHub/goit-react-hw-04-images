import React, { Component } from "react";
import Notiflix from 'notiflix';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { axiosGetPixabayPhoto } from "../services/api"

const PER_PAGE = 12;
const PHOTO_LIMIT = 500;

class App extends Component {
  state = {
    searchValue: '',
    pageCnt: 1,
    galleryPhotos: [],
    loading: false,
    urlBigPhoto: '',
    tagsBigPhoto: '',
    isNextPage: true,
  }
  
  responseGalleryPhoto = (data) => {
    //const total = data.total;
    const totalHits = data.totalHits;
    const hits = data.hits;

    //console.log(total);
    //console.log(totalHits);
    //console.log(hits);

    this.setState({ loading: false });
    
    this.setState(prevState => ({ galleryPhotos: [...prevState.galleryPhotos, ...hits] }));

    if (totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if ((this.state.pageCnt > 1) && (hits.length < PER_PAGE)) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      this.setState({ isNextPage: false });
    }
  }

  gotAnError = (error) => {
    //if (error.message == 404) { }
    if (error.message === 400) {
      if (this.state.pageCnt > (PHOTO_LIMIT/PER_PAGE)) {
        Notiflix.Notify.info('The API is limited to return a maximum of 500 images per query.');
        this.setState({ isNextPage: false });
      } else {
        Notiflix.Notify.warning('Reset page.');
      }
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { searchValue, pageCnt } = this.state;

    if ((prevState.searchValue !== searchValue) ||
        (prevState.pageCnt !== pageCnt))
    {
      //console.log('getGalleryPhotoByNumPage');
      this.setState({ loading: true });

      axiosGetPixabayPhoto(searchValue, pageCnt, PER_PAGE).then(data => {
        this.responseGalleryPhoto(data.data);
      }).catch(error => {
        //console.log(error);
        this.gotAnError(error);
      });
    }
  }

  handleSearchValue = searchValue => {
    if (this.state.searchValue !== searchValue) {
      this.setState({
        searchValue: searchValue,
        pageCnt: 1,
        galleryPhotos: [],
        isNextPage: true,
      });
      //console.log('gallery reset');
    }
  }

  handleNextPage = () => {
    //console.log('onClick ok');
    this.setState(prevState => ({ pageCnt: prevState.pageCnt + 1 }));
  }

  handleBigPhoto = (url, tags) => {
    this.setState({
      urlBigPhoto: url,
      tagsBigPhoto: tags,
    });
  }
  
  render() {
    const { galleryPhotos, loading, urlBigPhoto, tagsBigPhoto, isNextPage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchValue} />
        {galleryPhotos.length > 0 &&
          <ImageGallery galleryPhotos={galleryPhotos} onClick={this.handleBigPhoto} />
        }
        {loading && <Loader />}
        {galleryPhotos.length > 0 && isNextPage && <Button onClick={this.handleNextPage} />}
        {urlBigPhoto.length > 0 &&
          <Modal urlImage={urlBigPhoto} tag={tagsBigPhoto}
            onClose={() => this.handleBigPhoto('', '')} 
          />
        }
      </div>
    )
  };
};

export default App;