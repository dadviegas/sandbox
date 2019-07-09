import Splash from './pages/Splash'
import Home from './pages/Home'
import About from './pages/About'
import Unavailable from './pages/Unavailable'

export default [
  {
    key: 'splash',
    Component: Splash,
    props: {
      path: '/',
      exact: true,
    },
  },
  {
    key: 'about',
    Component: About,
    props: {
      path: `/about`,
    },
  },
  {
    key: 'home',
    Component: Home,
    props: {
      path: `/home`,
    },
  },
  {
    key: 'unavailable',
    Component: Unavailable,
  },
]
