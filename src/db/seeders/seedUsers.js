import { times } from 'lodash';
import faker from 'faker/locale/en';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import { log } from 'util';
import model from '../models';
import { generateUserAuthToken } from '../../helpers/generateAuthToken';
import generateUniqueId from '../../helpers/generateUniqueId';
import { hashPassword } from '../../helpers/passwordHelpers';
import UserRepo from '../../repositories/UserRepo';

const { Op } = Sequelize;

dotenv.config();

const { User } = model;
faker.seed(555);

const seedUser = () => new Promise(() => {
  try {
    let count = 0;
    times(40, async () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      const image = faker.image.avatar();
      const bio = faker.lorem.paragraph(1);

      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: email.trim() }],
        },
      });

      if (user) {
        const message = process.env.NODE_ENV !== 'production'
            && 'Either User is seeded or this email is Taken';

        return process.stdout.write(`${message} '\n'`);
      }

      const hashedPassword = hashPassword('12345');

      const createdUser = await UserRepo.create({
        email,
        uniqueId: generateUniqueId(),
        phone: faker.phone.phoneNumber(),
        password: hashedPassword,
        secretKey: `${generateUniqueId()}-${email}`,
        authType: 'Facebook',
        accountType: 'Customer',
        userProfile: {
          firstName,
          lastName,
          image,
          bio,
        },
      });
      count += 1;

      const token = process.env.NODE_ENV !== 'production'
        ? generateUserAuthToken(createdUser)
        : '';

      if (count >= 38) {
        process.stdout.write(`${count} Users seeded successfully \n`);
        process.stdout.write(`${token} \n \n`);
      }
      return null;
    });
  } catch (error) {
    // console.log(error);
    log(error);
    throw error;
    // process.exit();
  }
});

export default seedUser;
