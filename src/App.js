import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import MyRouter from "./routes";
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Data } from './application/Singers/data';
function App() {
  return (
    <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          <RouterProvider router={MyRouter} />
        </Data>
    </Provider>
  );
}

export default App;
