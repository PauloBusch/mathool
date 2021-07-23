import MarkdownReader from '@/shared/components/markdown/MarkdownReader.vue';
import Contact from './views/Contact.vue';
import Login from './views/Login.vue';

const publicRoutes = [
  {
    path: '/',
    meta: { file: 'public/views/Home.md' },
    component: MarkdownReader
  },
  {
    path: 'mathcontent',
    meta: { file: 'public/views/MathContent.md' },
    component: MarkdownReader
  },
  {
    path: 'tools',
    meta: { file: 'public/views/Tools.md' },
    component: MarkdownReader
  },
  {
    path: 'team',
    meta: { file: 'public/views/Team.md' },
    component: MarkdownReader
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { file: 'public/views/404PageNotFound.md' },
    component: MarkdownReader
  }
];

export default publicRoutes;
