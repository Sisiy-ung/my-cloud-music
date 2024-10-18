import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import MyRouter from "./routes";


function App() {
  return (
    <>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <MyRouter></MyRouter>
    </>
  );
}

export default App;
