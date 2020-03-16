import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { useAccessTokenContext } from 'contexts/signin';
import { useSigninActionsContext } from 'contexts/signin';
import './styles.scss';
import { Layout, Menu, Input, Modal, Button } from 'antd';
import { FiShare } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useVideosGetVideos } from '../../../generated';
import uuid from 'uuid/v4';
import { useMutateHttp } from 'contexts';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const LayoutFilms = () => {
  //Hooks declaration/initialisation

  const { data: videos, loading: loadingVideos } = useVideosGetVideos({});
  const [currentVideo, setCurrentVideo] = useState('https://localhost:44304/api/Video/Black-Panther.mp4');
  const [genre, setGenre] = useState('Action');
  const [state, setState] = useState({
    loading1: false,
    visible: false,
    upload: true,
    Islogged: true,
    isImage1: false,
    isImage2: false,
    isImage3: false,
    isImage4: false,
    isImage5: false,
  });
  const { signout } = useSigninActionsContext();
  const accesssToken = useAccessTokenContext();
  const router = useRouter();
  let inputText = useRef<HTMLHeadingElement | null>(null);
  const [Category, setCategory] = useState<string>('');
  const [image, setImage] = useState<File>(null);
  const [video, setVideo] = useState<File>(null);
  const { mutate: videUpload } = useMutateHttp({
    path: '/api/Video',
    verb: 'POST',
  });

  // useEffects
  useEffect(() => {
    if (!loadingVideos && videos) {
      console.log(videos);
      setCurrentVideo(currentVideo);
    }
  }, [currentVideo]);

  useEffect(() => {
    inputText.current.textContent = 'Hello';
  }, [state.isImage2]);

  useEffect(() => {
    if (accesssToken && accesssToken.type === 'ADMINISTRATOR') {
      setState({ ...state, upload: false });
    } else if (accesssToken) {
      setState({ ...state, upload: true });
    } else {
      setState({ ...state, upload: true, Islogged: false });
    }
  }, [accesssToken]);

  var FormData = require('form-data');
  var formData = new FormData();
  if (video) {
    formData.append('trailer', video);
    console.log('vide02', formData.get('trailer'));
  }
  if (image && formData.get('image') == null) {
    formData.append('image', image);
    console.log('image2', formData.get('image'));
  }
  const showModal = () => {
    setState({ ...state, visible: true });
    // setTimeout(inputText.current.focus(), 1000);
  };
  const login = () => {
    router.push('/login');
  };

  const handleOk = () => {
    setState({ ...state, loading1: true });
    setTimeout(() => {
      setState({ ...state, loading1: false, visible: false });
    }, 36000);
    console.log('my video', formData.image);
    videUpload({ formData, Category })
      .then(() => console.log('uploaded'))
      .catch(() => console.error());
  };
  const handleCancel = () => {
    setTimeout(() => setState({ ...state, visible: false }), 3000);
  };
  // const mouseEnter=(selectedGenre:state>{
  //   setState({...state,sel:true})
  // }

  if (videos) {
    let actionVid = videos.filter(vid => vid.category == genre);
    var trailerImages = actionVid.map(({ id, videoPath, name, imagePath }) => (
      <div className="film-cat" key={id}>
        <div className="film-cat-img">
          <button
            type="button"
            onClick={() => setCurrentVideo('https://localhost:44304/api/Video/' + videoPath)}
            key={name}
          >
            <img src={`https://localhost:44304/api/video/${imagePath}`} />
          </button>
        </div>
        <div className="film-cat-icon" key={id}>
          <img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" />
        </div>
      </div>
    ));
  }
  const GenreDisplay = genre => {
    if (videos) {
      let actionVid = videos.filter(vid => vid.category == genre);
      var trailerImages = actionVid.map(({ id, videoPath, name, imagePath }) => (
        <div className="film-cat" key={id}>
          <div className="film-cat-img">
            <button
              type="button"
              onClick={() => setCurrentVideo('https://localhost:44304/api/Video/' + videoPath)}
              key={name}
            >
              <img src={`https://localhost:44304/api/video/${imagePath}`} />
            </button>
          </div>
          <div className="film-cat-icon" key={id}>
            <img src="http://cdn1.iconfinder.com/data/icons/flavour/button_play_blue.png" />
          </div>
        </div>
      ));
    }
    return trailerImages;
  };

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '40px', width: '1560px', paddingTop: '10px' }}
        >
          <Menu.Item key={uuid()} style={{ paddingBottom: '10px' }}>
            <img src="/static/images/popcorn.png" />
          </Menu.Item>
          <Menu.Item key={uuid()} className="photos">
            <h1
              onMouseEnter={() =>
                setState({
                  ...state,
                  isImage1: true,
                  isImage2: false,
                  isImage3: false,
                  isImage4: false,
                  isImage5: false,
                })
              }
              onMouseOut={() => setState({ ...state, isImage1: false })}
              onClick={() => {
                setGenre('Action');
                setCurrentVideo('https://localhost:44304/api/Video/FAST-AND-FURIOUS9-trailer.mp4');
              }}
              ref={inputText}
            >
              Action
            </h1>
            {state.isImage1 && <img src="/static/images/Action1.jpg" width="70" height="50" />}
          </Menu.Item>
          <Menu.Item key={uuid()} className="photos">
            <h1
              onMouseEnter={() =>
                setState({
                  ...state,
                  isImage1: false,
                  isImage2: true,
                  isImage3: false,
                  isImage4: false,
                  isImage5: false,
                })
              }
              onMouseOut={() => setState({ ...state, isImage2: false })}
              onClick={() => {
                setGenre('RomComedy');
                setCurrentVideo('https://localhost:44304/api/Video/Nappily-Ever-After.mp4');
              }}
            >
              DRAMAS
            </h1>
            {state.isImage2 && <img src="/static/images/drama.jpg" width="70" height="50" />}
          </Menu.Item>
          <Menu.Item key={uuid()} className="photos">
            <h1
              onMouseEnter={() =>
                setState({
                  ...state,
                  isImage1: false,
                  isImage2: false,
                  isImage3: true,
                  isImage4: false,
                  isImage5: false,
                })
              }
              onMouseOut={() => setState({ ...state, isImage3: false })}
              onClick={() => {
                setGenre('RomComedy');
                setCurrentVideo('https://localhost:44304/api/Video/Addicted.mp4');
              }}
            >
              ROMANCE
            </h1>
            {state.isImage3 && <img src="/static/images/romance.png" width="70" height="50" />}
          </Menu.Item>
          <Menu.Item key={uuid()} className="photos">
            <h1
              onMouseEnter={() =>
                setState({
                  ...state,
                  isImage1: false,
                  isImage2: false,
                  isImage3: false,
                  isImage4: true,
                  isImage5: false,
                })
              }
              onMouseOut={() => setState({ ...state, isImage4: false })}
              onClick={() => {
                setGenre('Sci-Fi');
                setCurrentVideo('https://localhost:44304/api/Video/VEnom-2.mp4');
              }}
            >
              SCI-FIC
            </h1>
            {state.isImage4 && <img src="/static/images/sci-fi.png" width="70" height="50" />}
          </Menu.Item>
          <Menu.Item key={uuid()} className="photos">
            <h1
              onMouseEnter={() =>
                setState({
                  ...state,
                  isImage1: false,
                  isImage2: false,
                  isImage3: false,
                  isImage4: false,
                  isImage5: true,
                })
              }
              onMouseOut={() => setState({ ...state, isImage5: false })}
              onClick={() => {
                setGenre('Horror');
                setCurrentVideo('https://localhost:44304/api/Video/Newness.mp4');
              }}
            >
              HORROR{' '}
            </h1>
            {state.isImage5 && <img src="/static/images/horror3.jpg" width="70" height="50" />}
          </Menu.Item>
          <Menu.Item
            key={uuid()}
            style={{
              marginLeft: '10px',
              height: '35px',
              backgroundColor: '#0000',
              paddingLeft: '10px',
              marginBottom: '11px',
            }}
            className="photos"
          >
            <Search placeholder="Search movies by titles" onSearch={value => console.log(value)} enterButton />
          </Menu.Item>
          <Menu.Item
            key={uuid()}
            style={{
              marginLeft: '10px',
              height: '35px',
              backgroundColor: '#0000',
              paddingLeft: '10px',
              marginBottom: '15px',
            }}
          >
            {state.Islogged ? `Welcome back ` : 'You are not logged'}
          </Menu.Item>
          <Menu.Item
            key={uuid()}
            style={{
              marginLeft: '10px',
              height: '35px',
              backgroundColor: '#0000',
              paddingLeft: '10px',
              marginBottom: '15px',
            }}
          >
            <Button type="primary" onClick={showModal} disabled={state.upload}>
              <FiShare />
              Upload
            </Button>
          </Menu.Item>
          <Menu.Item
            key={uuid()}
            style={{
              marginLeft: '10px',
              height: '35px',
              backgroundColor: '#0000',
              paddingLeft: '10px',
              marginBottom: '15px',
            }}
          >
            <Button type="danger" size="large" onClick={state.Islogged ? signout : login}>
              {state.Islogged ? 'SiGNOUT' : 'LOGIN'}
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="Content">
        <div className="Slider">
          <video
            id="my-player"
            className="video-js"
            controls
            preload="auto"
            poster="//vjs.zencdn.net/v/oceans.png"
            data-setup="{}"
            width="100%"
            height="900px"
            autoPlay
            src={currentVideo}
          ></video>
          <div className="random-movies">{trailerImages}</div>
        </div>
        <h1>Turn Your HAllowen Mode with the latest Horror Movies</h1>
        <div className="GenreDisplay">{GenreDisplay('Horror')}</div>
        <h1>Feel The Love With Fresh ROmantic movies</h1>
        <div className="GenreDisplay">{GenreDisplay('RomComedy')}</div>
        <h1>Watch The Best Futuristic Sci-Fiction Movies</h1>
        <div className="GenreDisplay">{GenreDisplay('Sci-Fi')}</div>
      </Content>
      <Footer className="footer" style={{ textAlign: 'center' }}>
        for more info go to Phumudzon@boxfusion.co.za ©2020
      </Footer>

      <Modal
        visible={state.visible}
        title="Upload a new Movie"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="danger" onClick={handleCancel}>
            Go Back
          </Button>,
          <Button key="submit" type="primary" loading={state.loading1} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <input
          type="text"
          placeholder="choose a genre"
          value={Category}
          onChange={e => {
            console.log('onChange e', e.target.value);
            setCategory(e.target.value);
          }}
        />
        <br />
        <br />
        <label className="custom-file-upload">
          MOVIE POSTER
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        </label>
        <br />
        <br />
        <label className="custom-file-upload">
          NEW MOVIE
          <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
        </label>
      </Modal>
    </Layout>
  );
};
export default LayoutFilms;
