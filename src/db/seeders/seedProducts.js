import { times } from 'lodash';
import faker from 'faker/locale/en';
import dotenv from 'dotenv';

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

      const images = [
        {
          image: faker.random.image(),
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
    });
  } catch (error) {
    console.log(error);
    throw error;
    // process.exit();
  }
});

export default seedProducts;
