import Home from '@pages/Home'

const routes = [
  {
    path: '/',
    text: 'Ana sayfa',
    exact: true,
    component: Home
  },
  {
    path: '/kadin',
    text: 'Kadın',
    exact: true,
    component: Home
  },
  {
    path: '/kadin+giyim',
    text: 'Kadın',
    exact: true,
    component: Home
  },
  {
    path: '/erkek',
    text: 'Erkek',
    exact: true,
    component: Home
  },
  {
    path: '/cocuk',
    text: 'Çocuk',
    exact: true,
    component: Home
  }
]

export default routes
