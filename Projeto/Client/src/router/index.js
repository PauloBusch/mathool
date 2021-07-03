import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: { file: 'views/Home.md' },
    component: () => import('@/components/markdown/MarkdownReader.vue')
  },
  {
    path: '/contact',
    component: () => import('@/views/Contact.vue')
  },
  {
    path: '/about',
    meta: { file: 'views/About.md' },
    component: () => import('@/components/markdown/MarkdownReader.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { file: 'views/404PageNotFound.md' },
    component: () => import('@/components/markdown/MarkdownReader.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
