
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/sign-in',
    component: () => import('layouts/SignInLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignInPage.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/SignInLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterPage.vue') }
    ]
  },
  {
    path: '/new-picture',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NewPicturePage.vue') }
    ]
  },
    

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
