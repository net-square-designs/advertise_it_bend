// Repos
import ChatRepo from '../repositories/ChatRepo';
import MessageRepo from '../repositories/MessageRepo';

// Helpers
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to chats
 * [Chat] is the parent of messages
 * [Chat] is typically between two users
 *
 * When a chat is listed/fetched, it only shows the [chatId], [receiverId]
 * and [senderId]
 */
class ChatController {
  /**
   * @description controller method to fetch paginated messages by chatId
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async fetchMessagesByChatId(req, res) {
    const { usePagination, paginationData } = res.locals;
    const { chatId } = req.params;
    const { id } = res.locals.user;

    try {
      const chat = await ChatRepo.findByChatId(chatId);

      if (chat.senderId !== id && chat.receiverId !== id) {
        return AppResponse.unAuthorized(res, {
          message: 'Unauthorised access',
        });
      }

      const { count, rows: messages } = await MessageRepo.getByChatId(
        usePagination,
        { chatId },
      );

      if (!messages) {
        return AppResponse.success(res, {
          message: 'No messages or chat yet',
        });
      }

      const metaData = { count, ...paginationData };

      return AppResponse.success(res, { data: { messages, metaData } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }

  /**
   * @description controller method to fetch the auth user chats
   * @param {*} req req
   * @param {*} res res
   *
   * @returns {Promise<AppResponse>} The Return Object
   */
  static async fetchMyChats(req, res) {
    const { usePagination, paginationData } = res.locals;
    const { id: userId } = res.locals.user;

    try {
      const { count, rows: chats } = await ChatRepo.findAll(
        usePagination,
        {
          userId,
        },
      );

      if (count === 0) {
        return AppResponse.notFound(res, {
          message: 'No chat at the moment',
        });
      }

      const metaData = { count, ...paginationData };

      return AppResponse.success(res, { data: { chats, metaData } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default ChatController;
