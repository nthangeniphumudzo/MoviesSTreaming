import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { useAccessTokenContext } from 'contexts/signin';
import { useSigninActionsContext } from 'contexts/signin';
import './styles.scss';
import { Layout, Menu, Input, Modal, Button, Select } from 'antd';
import { FiShare } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useVideosGetVideos, Multimedia } from '../../../generated';
import uuid from 'uuid/v4';
import { useMutateHttp } from 'contexts/useMutateHttp';
//import { useMutateHttp } from './hooks';

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
  const [Category, setCategory] = useState<string>();
  const [iFiles, setIfiles] = useState<Multimedia>({});
  const { mutate: videUpload } = useMutateHttp({
    path: '/api/Video',
    verb: 'POST',
  });
  const { Option, OptGroup } = Select;

  // useEffects
  useEffect(() => {
    console.log('selected cat', Category);
  }, [Category]);
  // useMutateHttp
  // `/api/Video`
  // const { mutate: videUpload } = useMutateHttp({
  //   // queryParams: { Category },
  //   path: '/api/Video',
  //   verb: 'POST',
  // });

  useEffect(() => {
    if (!loadingVideos && videos) {
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
  const handleFileSelect = (file: Blob, callback) => {
    const reader = new FileReader();
    // reader.onload = function() {
    reader.onload = function() {
      const content: any = reader.result;
      callback(btoa(content));
    };
    //convert the given file to binary string ,when done pass its results to the content
    reader.readAsBinaryString(file);
  };

  const showModal = () => {
    setState({ ...state, visible: true });
    // setTimeout(inputText.current.focus(), 1000);
  };
  const login = () => {
    router.push('/login');
  };
  function handleChange(value) {
    setCategory(value);
  }

  const handleOk = () => {
    setState({ ...state, loading1: true });
    setTimeout(() => {
      setState({ ...state, loading1: false, visible: false });
    }, 6000);
    console.log('payload', iFiles);
    videUpload(iFiles, { Category })
      .then(() => console.log('uploaded good boy'))
      .catch(() => console.error());
  };
  const handleCancel = () => {
    setTimeout(() => setState({ ...state, visible: false }), 3000);
  };

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
            <Button
              type="primary"
              style={{ backgroundColor: '#008080', color: 'gold', height: '42px', width: '125px', borderColor: 'gold' }}
              onClick={showModal}
              disabled={state.upload}
            >
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
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: 'green' }}
            loading={state.loading1}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {/* <input
          type="text"
          placeholder="choose a genre"
          value={Category}
          onChange={e => {
            console.log('onChange e', e.target.value);
            setCategory(e.target.value);
          }}
        /> */}
        <Select defaultValue="GENRES" style={{ width: 200 }} onChange={handleChange}>
          <OptGroup label="Categories">
            <Option value="Action">ACTION</Option>
            <Option value="Drama">DRAMA</Option>
            <Option value="RomComedy">ROMANCE</Option>
            <Option value="Sci-Fi">SCI-FI</Option>
            <Option value="Horror">HORROR</Option>
          </OptGroup>
        </Select>

        <br />
        <br />
        <label
          className="custom-file-upload"
          style={{
            backgroundColor: '#008080',
            borderRadius: '5px',
            border: 'solid 4px',
            borderColor: 'black',
            color: 'white',
            paddingRight: '16px',
            marginRight: '15px',
          }}
        >
          MOVIE POSTER
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const holder = e.target.files;
            handleFileSelect(holder[0], base64Image => {
              setIfiles({ ...iFiles, imageData: base64Image, imageName: holder[0].name });
            });
          }}
        />
        <br />
        <br />
        <label
          className="custom-file-upload"
          style={{
            backgroundColor: '#008080',
            borderRadius: '5px',
            border: 'solid 4px',
            borderColor: 'black',
            color: 'white',
            paddingRight: '29px',
            marginRight: '15px',
          }}
        >
          NEW MOVIE
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={e => {
            const holder = e.target.files;
            handleFileSelect(holder[0], base64Video => {
              setIfiles({ ...iFiles, videoData: base64Video, videoName: holder[0].name });
            });
          }}
        />
      </Modal>
    </Layout>
  );
};
export default LayoutFilms;
