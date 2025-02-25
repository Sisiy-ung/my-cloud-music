import React from 'react'
import { Top, Tab, TabItem } from './style';
import { NavLink  } from 'react-router-dom';
import { Outlet } from 'react-router';
import Player from '../Player';
function Home() {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" className={({ isActive }) => (isActive ? " selected" : "")}><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to="/singers" className={({ isActive }) => (isActive ? " selected" : "")}><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to="/rank" className={({ isActive }) => (isActive ? " selected" : "")}><TabItem><span>排行榜</span></TabItem></NavLink>
      </Tab>
      <Outlet />
      <Player></Player>
    </div>

  )
}

export default React.memo(Home)