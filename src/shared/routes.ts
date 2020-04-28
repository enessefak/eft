import Home from './pages/Home'
import Grid from './pages/Grid'

import Counter1 from './components/counter/counter'
import Counter2 from './components/counter/counter2'
import Counter3 from './components/counter/counter3'

import { fetchPopularRepos } from './api'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/counter1',
    exact: true,
    component: Counter1
  },
  {
    path: '/counter2',
    exact: true,
    component: Counter2
  },
  {
    path: '/counter3',
    exact: true,
    component: Counter3
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes
