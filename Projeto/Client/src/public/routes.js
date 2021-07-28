import MarkdownReader from '@/shared/components/markdown/MarkdownReader.vue';
import Contact from './views/Contact.vue';
import Login from './views/auth/Login.vue';
import CreateAccount from './views/auth/CreateAccount.vue';
import ForgotPassword from './views/auth/ForgotPassword.vue';
import ChangePassword from './views/auth/ChangePassword.vue';

const publicRoutes = [
  {
    path: '/',
    meta: { file: 'public/views/markdown/Home.md' },
    component: MarkdownReader
  },
  {
    path: 'mathcontent',
    meta: { file: 'public/views/markdown/MathContent.md' },
    component: MarkdownReader
  },
  {
    path: 'tools',
    meta: { file: 'public/views/markdown/Tools.md' },
    component: MarkdownReader
  },
  {
    path: 'team',
    meta: { file: 'public/views/markdown/Team.md' },
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
    path: 'create-account',
    component: CreateAccount
  },
  {
    path: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: 'change-password',
    component: ChangePassword
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { file: 'public/views/markdown/404PageNotFound.md' },
    component: MarkdownReader
  }
];

export default publicRoutes;
