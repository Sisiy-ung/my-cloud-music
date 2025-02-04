import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Singer from '../application/Singer';
import Rank from '../application/Rank';
import { createBrowserRouter } from 'react-router-dom';
import Album from '../application/Album';

const MyRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                path: '/recommend',
                element: <Recommend />,
            },
            {
                path: '/singers',
                element: <Singers />,
                children: [
                    {
                        path: ':id',
                        element: <Singer />,
                    }
                ]
            },
            {
                path: '/rank',
                element: <Rank />,
                children: [
                    {
                        path: ':id',
                        element: <Album />,
                    }
                ]
            },


        ]
    }
])


export default MyRouter
