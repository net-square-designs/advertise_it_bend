import express from 'express';

// Controllers
import MessageController from '../../controllers/MessageController.js';

// Middlewares
import { checkUserAuth } from '../../middlewares/auth';

// Validations
import {
  validateCreateMessage,
  validateMessageParams,
  validateMessageQuery,
} from './messageValidations';

const messageRouter = express.Router();

/**
 * fetch messages
 */
messageRouter.get(
  '/:receiverId',
  checkUserAuth,
  validateMessageParams,
  MessageController.fetchMessages,
);

/**
 * create/send message
 */
messageRouter.post(
  '/:receiverId',
  checkUserAuth,
  validateCreateMessage,
  MessageController.create,
);

/**
 * search messages
 */
messageRouter.get(
  '/:receiverId/search',
  checkUserAuth,
  validateMessageQuery,
  MessageController.searchMessages,
);

export default messageRouter;
