import styled from 'styled-components';
import style from '../../assets/global-style';

// Props中的globalRank和tracks.length均代表是否为全球榜
export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.play > 0?"60px": 0};
  width: 100%;
  .offical,.global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
`