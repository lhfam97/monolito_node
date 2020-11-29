import { Router } from 'express';
import couponRouter from './coupon.routes';
import creditCardRouter from './creditcard.routes';

const routes = Router();
routes.use('/coupon', couponRouter);
routes.use('/creditCard', creditCardRouter);

export default routes;
