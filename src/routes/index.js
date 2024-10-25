import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import { createBrowserRouter } from 'react-router-dom';


const MyRouter = createBrowserRouter([
    {
        path: '/', 
        element: <Home />,
        children: [
            {
                index: true,
                path: '/recommend',
                element: <Recommend />
            },
            {
                path: '/singers',
                element: <Singers />
            },
            {
                path: '/rank',
                element: <Rank />
            },

        ]
    }
]

)
export default MyRouter
