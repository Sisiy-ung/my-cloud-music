import React, {useState } from 'react'
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from "./style";
function Singers(props) {

  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }

  let handleUpdateCategory = (val) => {
    setCategory (val);
  }

  return (

    // better-scroll 的 (横向) 滚动原理，首先外面容器要宽度固定，其次内容宽度要大于容器宽度。
    <NavContainer>
      <Horizen list={categoryTypes} title={"分类 (默认热门):"}
      handleClick={handleUpdateCategory} oldVal={category}></Horizen>
      <Horizen list={alphaTypes} title={"首字母:"}
      handleClick={handleUpdateAlpha} oldVal={alpha}></Horizen>      
    </NavContainer>

  )
}

export default React.memo(Singers)