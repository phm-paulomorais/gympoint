import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistryController from './app/controllers/RegistryController';
import CheckinController from './app/controllers/CheckinController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);

routes.post(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.store
);
routes.get(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.index
);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);

routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registries', RegistryController.store);
routes.get('/registries', RegistryController.index);
routes.put('/registries/:id', RegistryController.update);
routes.delete('/registries/:id', RegistryController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:help_order_id/answer', HelpOrderController.update);

export default routes;
