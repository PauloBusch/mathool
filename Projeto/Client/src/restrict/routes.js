import Restrict from './views/Restrict.vue';
import ClassForm from './views/class/ClassForm.vue';
import ListClass from './views/class/ListClass.vue';
import ClassReport from './views/report/ClassReport.vue';
import { Role } from '@/shared/consts/role';
import { guardMiddleware } from '@/middleware/guard-middleware';

const restrictRoutes = [
  {
    path: 'restrict',
    component: Restrict,
    beforeEnter: guardMiddleware([Role.Teacher, Role.Student])
  },
  {
    path: 'class-form',
    component: ClassForm,
    beforeEnter: guardMiddleware([Role.Teacher])
  },
  {
    path: 'class-form/:id',
    component: ClassForm,
    beforeEnter: guardMiddleware([Role.Teacher])
  },
  {
    path: 'list-class',
    component: ListClass,
    beforeEnter: guardMiddleware([Role.Teacher, Role.Student])
  },
  {
    path: 'class-report',
    component: ClassReport,
    beforeEnter: guardMiddleware([Role.Teacher, Role.Student])
  }

];

export default restrictRoutes;
