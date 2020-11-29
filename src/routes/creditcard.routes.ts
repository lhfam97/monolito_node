import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreditCard from '../models/CreditCard';
import AppError from '../errors/AppError';
import CreateCreditCardService from '../services/CreateCreditCardService';

const creditCardRouter = Router();

creditCardRouter.get('/:id?:codigo?', async (request, response) => {
  const { id, codigo } = request.query;
  const creditCardRepository = getRepository(CreditCard);

  const creditCard = await creditCardRepository.findOne({
    where: {
      id: id,
      codigo: codigo,
    },
  });
  if (!!creditCard) response.json({ status: 'Approved' });
  else response.json({ status: 'Declined' });
});

creditCardRouter.post('/', async (request, response) => {
  const { id, codigo } = request.body;
  const createPagamentoService = new CreateCreditCardService();

  const creditCard = await createPagamentoService.Execute({
    id,
    codigo,
  });
  return response.json(creditCard);
});

export default creditCardRouter;
