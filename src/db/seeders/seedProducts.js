import { times } from 'lodash';
import faker from 'faker/locale/en';
import dotenv from 'dotenv';

import { log } from 'util';
import ProductRepo from '../../repositories/ProductRepo';
import ProductImageRepo from '../../repositories/ProductImageRepo';

dotenv.config();
faker.seed(555);

const seedProducts = () => new Promise(() => {
  try {
    let count = 0;
    times(25, async () => {
      count += 1;
      const title = faker.random.words(3);
      const price = faker.finance.amount();
      const description = faker.lorem.paragraph(1);
      const userId = count;

      const product = await ProductRepo.create({
        title,
        price,
        description,
        userId,
      });

      const getRandomInt = (min, max) => {
        const newMin = Math.ceil(min);
        const newMax = Math.floor(max);
        return (
          Math.floor(Math.random() * (newMax - newMin + 1)) + newMin
        );
      };

      const imageId = getRandomInt(0, 100);
      const width = getRandomInt(200, 400);
      const height = getRandomInt(200, 400);
      // https://picsum.photos/seed/picsum/200/300

      const images = [
        {
          image: `https://picsum.photos/id/${imageId}/${width}/${height}`,
          isMainImage: faker.random.boolean(),
          productId: product.id,
        },
      ];

      await ProductImageRepo.createMany(images);

      if (count >= 25) {
        return process.stdout.write(
          `${count} Products seeded successfully \n`,
        );
      }

      return null;
    });
  } catch (error) {
    log(error);
    throw error;
    // process.exit();
  }
});

export default seedProducts;
