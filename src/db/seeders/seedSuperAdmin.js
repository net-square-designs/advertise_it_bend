import { times } from 'lodash';
import faker from 'faker/locale/en';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import model from '../models';
import { generateAdminAuthToken } from '../../helpers/generateAuthToken';
import generateUniqueId from '../../helpers/generateUniqueId';
import { hashPassword } from '../../helpers/passwordHelpers';

const { Op } = Sequelize;

dotenv.config();

const { Admin } = model;
faker.seed(555);

const seedSuperAdmin = () => new Promise((resolve) => {
  try {
    times(1, async () => {
      const {
        SU_FIRSTNAME,
        SU_LASTNAME,
        SU_PASSWORD,
        SU_PHONE,
        SU_EMAIL,
      } = process.env;

      const admin = await Admin.findOne({
        where: {
          [Op.or]: [{ email: SU_EMAIL.trim() }, { level: 'SuperAdmin' }],
        },
      });

      if (admin) {
        const message = process.env.NODE_ENV !== 'production'
          ? 'Either Super Admin is seeded or this email is Taken'
          : '';
        return resolve(console.log(message, '\n'));
      }

      const hashedPassword = hashPassword(SU_PASSWORD.trim());

      const superAdmin = await Admin.create({
        uniqueId: generateUniqueId(),
        phone: SU_PHONE,
        email: SU_EMAIL,
        password: hashedPassword,
        secretKey: `${generateUniqueId()}-${SU_EMAIL}`,
        level: 'SuperAdmin',
      });

      const token = process.env.NODE_ENV !== 'production'
        ? generateAdminAuthToken(superAdmin)
        : '';
      return resolve(console.log('SuperAdmin Token:::\n', token, '\n'));
    });
  } catch (error) {
    console.log(error);
    throw error;
    // process.exit();
  }
});

export default seedSuperAdmin;
