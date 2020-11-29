import { getRepository } from 'typeorm';
import Coupon from '../models/Coupon';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  discount: number;
}

class CreateCouponService {
  public async Execute({ name, discount }: Request): Promise<Coupon> {
    const couponRepository = getRepository(Coupon);

    const checkCouponExists = await couponRepository.findOne({
      where: { name: name },
    });

    if (checkCouponExists) {
      throw new AppError('Coupon already exists');
    }

    const coupon = couponRepository.create({
      name,
      discount,
      status: 'valid',
    });

    await couponRepository.save(coupon);

    return coupon;
  }
}

export default CreateCouponService;
