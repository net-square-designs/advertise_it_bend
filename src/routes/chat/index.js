import express from 'express';

// Controllers
import ChatController from '../../controllers/ChatController';

// Middlewares
import { checkUserAuth } from '../../middlewares/auth';

// Validations
import { validateChatParams } from './chatValidations';

const chatRouter = express.Router();

/**
 * fetch messages by chatId
 */
chatRouter.get(
  '/:chatId',
  checkUserAuth,
  validateChatParams,
  ChatController.fetchMessagesByChatId,
);

/**
 * list auth user chats
 */
chatRouter.get('/', checkUserAuth, ChatController.fetchMyChats);

export default chatRouter;
