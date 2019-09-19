import seedSuperAdmin from './seedSuperAdmin';
import seedUsers from './seedUsers';

const seedAll = async () => {
  await seedSuperAdmin();
  await seedUsers();

  process.exit();
};

seedAll();
