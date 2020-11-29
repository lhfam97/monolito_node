import { getRepository } from 'typeorm';
import CreditCard from '../models/CreditCard';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  codigo: string;
}

class CreateCreditCardService {
  public async Execute({ id, codigo }: Request): Promise<CreditCard> {
    const creditCardRepository = getRepository(CreditCard);

    const checkCreditCardExists = await creditCardRepository.findOne({
      where: { id: id, codigo: codigo },
    });

    if (checkCreditCardExists) {
      throw new AppError('Credit Card already exists');
    }

    const creditCard = creditCardRepository.create({
      id,
      codigo,
    });

    await creditCardRepository.save(creditCard);

    return creditCard;
  }
}

export default CreateCreditCardService;
