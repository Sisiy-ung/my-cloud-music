import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import MyRouter from "./routes";
import { RouterProvider } from 'react-router-dom';


function App() {
  return (
    <>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <RouterProvider router={MyRouter} />
    </>
  );
}

export default App;
