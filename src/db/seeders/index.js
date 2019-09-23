import seedSuperAdmin from './seedSuperAdmin';
import seedProducts from './seedProducts';
import seedUsers from './seedUsers';

const seedAll = async () => {
  await Promise.all([seedSuperAdmin(), seedUsers(), seedProducts()]);
  process.exit();
};

seedAll();
