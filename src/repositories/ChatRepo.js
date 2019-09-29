import Sequelize from 'sequelize';

import Repository from './Repository';
import generateUniqueId from '../helpers/generateUniqueId';

const { Op } = Sequelize;
/**
 * Message Repo
 */
class ChatRepo extends Repository {
  /**
   * @description Method to find all my chats with other users
   * @param {Function} usePagination
   * @param {{ userId: number }} data
   *
   * @returns {Promise<*>} Response
   */
  static async findAll(usePagination, { userId }) {
    const myChats = this.Chat.findAndCountAll({
      ...usePagination(),
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    return myChats;
  }

  /**
   * @description Method to find a chat between two users
   * @param {{ senderId: number, receiverId: number }} data
   *
   * @returns {Promise<*>} Response
   */
  static async findOne({ senderId, receiverId }) {
    const chat = this.Chat.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ senderId }, { receiverId }],
          },
          {
            [Op.and]: [{ senderId: receiverId }, { receiverId: senderId }],
          },
        ],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    return chat;
  }

  /**
   * @description Method to find a chat by the chatId
   * @param {string} chatId
   *
   * @returns {Promise<*>} Response
   */
  static async findByChatId(chatId) {
    const chat = this.Chat.findOne({
      where: {
        [Op.or]: [{ chatId }],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    return chat;
  }

  /**
   * Method to create a chat
   * @param {{
   *  senderId: number, receiverId: number,
   * }} data
   *
   * @returns {Promise<*>} Response
   */
  static async findOrCreate(data) {
    const { senderId, receiverId } = data;

    const existingChats = await this.findOne({ senderId, receiverId });

    if (existingChats) {
      return existingChats;
    }

    const newChat = this.Chat.create({
      senderId,
      receiverId,
      chatId: generateUniqueId(),
    }).catch((error) => {
      throw new Error(error);
    });

    return newChat;
  }
}

export default ChatRepo;
