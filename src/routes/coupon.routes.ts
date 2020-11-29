import { Router } from 'express';
import { getRepository } from 'typeorm';
import Coupon from '../models/Coupon';
import AppError from '../errors/AppError';
import CreateCouponService from '../services/CreateCouponService';

const couponRouter = Router();

couponRouter.get('/:name?', async (request, response) => {
  const { name } = request.query;
  const couponRepository = getRepository(Coupon);

  const coupon = await couponRepository.findOne({
    where: {
      name: name,
    },
  });
  if (!!coupon)
    response.json({ Status: coupon.status, Discount: coupon.discount });
  else response.json({ Status: 'invalid', Discount: 0 });
});

couponRouter.post('/', async (request, response) => {
  const { name, discount } = request.body;

  const createCouponService = new CreateCouponService();

  const coupon = await createCouponService.Execute({
    name,
    discount,
  });
  return response.json(coupon);
});

export default couponRouter;
