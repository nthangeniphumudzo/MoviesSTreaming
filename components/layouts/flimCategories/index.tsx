import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { useAccessTokenContext } from 'contexts/signin';
import { useSigninActionsContext } from 'contexts/signin';
import './styles.scss';
import { Layout, Menu, Input, Modal, Button } from 'antd';
import { FiShare } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useVideosGetVideos, useVideoUpload } from '../../../generated';
import uuid from 'uuid/v4';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const LayoutFilms = () => {
  const { data: videos, loading: loadingVideos } = useVideosGetVideos({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [state, setState] = useState({ loading1: false, visible: false, upload: true, Islogged: true });
  const { signout } = useSigninActionsContext();
  const accesssToken = useAccessTokenContext();
  const router = useRouter();
  const inputText = useRef(null);
  //const inputImage = useRef(null);
  //const inputVideo = useRef(null);
  const [Category, setCategory] = useState<string>('');
  const [image, setImage] = useState<File>(null);
  const [video, setVideo] = useState<File>(null);

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImage(event.target.files[0]);
  //   setVideo(event.target.files[0]);
  //   console.log(event.target.files[0]);
  // };

  const { mutate: videUpload } = useVideoUpload({
    queryParams: { Category: Category },
  });

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

  useEffect(() => {
    if (accesssToken && accesssToken.type === 'ADMINISTRATOR') {
      setState({ ...state, upload: false });
    } else if (accesssToken) {
      setState({ ...state, upload: true });
    } else {
      setState({ ...state, upload: true, Islogged: false });
    }
  }, [accesssToken]);

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
    console.log('text', inputText.current.value);
    videUpload((formData.get('trailer'), formData.get('image')))
      .then(() => console.log('uploaded'))
      .catch(() => console.error());
  };
  // formData.get('trailer'), formData.get('image')
  const handleCancel = () => {
    setTimeout(() => setState({ ...state, visible: false }), 3000);
  };

  if (videos) {
    var trailerImages = videos.map(({ id, videoPath, name, imagePath }) => (
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

  useEffect(() => {
    if (!loadingVideos && videos) {
      console.log(videos);
      setCurrentVideo(currentVideo);
    }
  }, [currentVideo]);

  //console.log('render', videos);
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '40px', width: '1560px', paddingTop: '30px' }}
        >
          <Menu.Item key="0">
            <img src="/static/images/popcorn.png" />{' '}
          </Menu.Item>
          <Menu.Item key={uuid()}>ACTION MOVIES</Menu.Item>
          <Menu.Item key={uuid()}>POPULAR SERIES</Menu.Item>
          <Menu.Item key={uuid()}>DRAMA</Menu.Item>
          <Menu.Item key={uuid()}>ROMANTIC MOVIES</Menu.Item>
          <Menu.Item key={uuid()}>SCI-FI MOVIES</Menu.Item>
          <Menu.Item key={uuid()}>HORROR MOVIES</Menu.Item>
          <Menu.Item key={uuid()} style={{ marginLeft: '10px', height: '35px', backgroundColor: 'dark' }}>
            <Search placeholder="Search movies by titles" onSearch={value => console.log(value)} enterButton />
          </Menu.Item>
          <Menu.Item key={uuid()}>
            <Button type="primary" onClick={showModal} disabled={state.upload}>
              <FiShare />
              Upload
            </Button>
          </Menu.Item>
          <Menu.Item key={uuid()}>
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
            width="1500px"
            height="1000px"
            autoPlay
            src={currentVideo}
          >
            {/* <source src={currentVideo} type="video/mp4"></source> */}
          </video>
        </div>
        <div className="random-movies">{trailerImages}</div>
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
          ref={inputText}
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
