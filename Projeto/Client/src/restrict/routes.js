import Restrict from './views/Restrict.vue';
import { teacherCanAccess } from '@/middleware/guard';

const restrictRoutes = [
  {
    path: 'restrict',
    component: Restrict,
    beforeEnter: teacherCanAccess
  }
];

export default restrictRoutes;
