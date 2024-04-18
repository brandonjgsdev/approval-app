const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name:'login', meta: { requiresAuth: false }, component: () => import('pages/Login.vue') }
    ]
  },

  {
    path: '/approvals',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'sended', name:'sended', meta: { requiresAuth: true }, component: () => import('pages/ApprovalsSended.vue') },
      { path: 'received', name:'received', meta: { requiresAuth: true }, component: () => import('pages/ApprovalsReceived.vue') },
      { path: 'create', name:'create', meta: { requiresAuth: true }, component: () => import('pages/ApprovalsStore.vue') },
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
