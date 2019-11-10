import { times } from 'lodash';
import faker from 'faker/locale/en';
import dotenv from 'dotenv';

import { log } from 'util';
import { randomInt } from '../../utils/randomInt';
import CategoryRepo from '../../repositories/CategoryRepo';

dotenv.config();
// faker.seed(555);

const seedCategories = () => new Promise(() => {
  try {
    let count = 0;
    times(25, async () => {
      count += 1;
      const name = `${faker.commerce.productName()} Collection`;
      const imageId = randomInt(0, 100);
      const width = randomInt(200, 400);
      const height = randomInt(200, 400);

      await CategoryRepo.create({
        name,
        image: `https://picsum.photos/id/${imageId}/${width}/${height}`,
        // https://picsum.photos/seed/picsum/200/300
      });

      if (count >= 25) {
        return process.stdout.write(
          `${count} Categories seeded successfully \n`,
        );
      }
      return null;
    });
  } catch (error) {
    log(error);
    throw error;
  }
});

export default seedCategories;
