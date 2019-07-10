import React, { lazy, Suspense } from "react";
import Splash from './pages/Splash'
import Unavailable from './pages/Unavailable'
import Loader from './components/Loader';

const WaitingComponent = (Component) => {
  return props => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
}

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

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
    Component: WaitingComponent(About),
    props: {
      path: `/about`,
    },
  },
  {
    key: 'home',
    Component: WaitingComponent(Home),
    props: {
      path: `/home`,
    },
  },
  {
    key: 'unavailable',
    Component: Unavailable,
  },
]
