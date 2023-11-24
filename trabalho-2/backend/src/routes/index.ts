import express, { Router } from 'express';

import saleRoute from './sale.route';
import reportRoute from './report.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/sales/report',
    route: reportRoute,
  },
  {
    path: '/sales',
    route: saleRoute,
  }
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
