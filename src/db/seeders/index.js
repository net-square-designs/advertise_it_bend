import seedSuperAdmin from './seedSuperAdmin';
import seedProducts from './seedProducts';
import seedUsers from './seedUsers';
import seedCategories from './seedCategories';

const seedAll = async () => {
  await Promise.all([
    seedSuperAdmin(),
    seedUsers(),
    seedCategories(),
    seedProducts(),
  ]);
  process.exit();
};

seedAll();
