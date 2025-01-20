import React, { useState } from 'react'
import { Container } from './style'
import { CSSTransition } from 'react-transition-group'
import { useNavigate } from 'react-router-dom';
import Header from '../../baseUI/header/index'

function Album(props) {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true)
  const handleBack = () => {
    setShowStatus (false);
  };
    return (
      <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExit={() => navigate(-1)}>
        <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
        </Container>

      </CSSTransition>

      )
}
export default React.memo(Album)