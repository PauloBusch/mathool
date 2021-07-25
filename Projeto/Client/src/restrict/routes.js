import Restrict from './views/Restrict.vue';
import CreateClass from './views/class/CreateClass.vue';
import ListClass from './views/class/ListClass.vue';
import { Role } from '@/shared/consts/role';
import { guardMiddleware } from '@/middleware/guard-middleware';

const restrictRoutes = [
  {
    path: 'restrict',
    component: Restrict,
    beforeEnter: guardMiddleware([Role.Teacher, Role.Student])
  },
  {
    path: 'create-class',
    component: CreateClass,
    beforeEnter: guardMiddleware([Role.Teacher])
  },
  {
    path: 'list-class',
    component: ListClass,
    beforeEnter: guardMiddleware([Role.Teacher])
  }

];

export default restrictRoutes;
