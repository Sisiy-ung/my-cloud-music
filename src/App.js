import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import MyRouter from "./routes";
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <RouterProvider router={MyRouter} />
    </Provider>
  );
}

export default App;
