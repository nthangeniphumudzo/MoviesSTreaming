import React, { FC } from 'react';
import 'antd/dist/antd.css';
import './styles.scss';
import { Layout, Menu, Input, Button } from 'antd';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

interface IProps {
  readonly url: string;
}

export const LayoutFilm2: FC<IProps> = ({ url }) => {
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
          <Menu.Item key="2">ACTION MOVIES</Menu.Item>
          <Menu.Item key="3">POPULAR SERIES</Menu.Item>
          <Menu.Item key="4">DRAMA</Menu.Item>
          <Menu.Item key="5">ROMANTIC MOVIES</Menu.Item>
          <Menu.Item key="6">SCI-FI MOVIES</Menu.Item>
          <Menu.Item key="7">HORROR MOVIES</Menu.Item>
          <Menu.Item key="8" style={{ marginLeft: '25px', height: '35px', backgroundColor: ' #74992e' }}>
            <Search placeholder="Search movies by titles" onSearch={value => console.log(value)} enterButton />
          </Menu.Item>
          <Menu.Item key="4">
            <Button type="danger" size="large">
              SIGNOUT
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
          >
            // <source src={url} type="video/mp4"></source>
          </video>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>for more info go to Phumudzon@boxfusion.co.za ©2020</Footer>
    </Layout>
  );
};
