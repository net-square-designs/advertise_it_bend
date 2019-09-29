import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import dotenv from 'dotenv';

// Repositories
import UserRepo from '../repositories/UserRepo';
import generateUniqueId from '../helpers/generateUniqueId';

dotenv.config();
const configurePassport = async () => {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        /**
         * TODO:
         * The [profile] returned above contains the user's email, so
         * remember to do the following
         * [1] - Check the db whether a user with the given ([profile.email]) already exists
         *  if no user
         * [2] - Create and return a new user using the data within the profile object
         *  else
         * [3] - Return the existing user
         */
        const email = profile.emails[0].value;
        const lastname = profile.name.familyName;
        const firstname = profile.name.familyName;

        const user = await UserRepo.getByEmail(email);

        if (!user) {
          // Create new user here
          const newUser = await UserRepo.create({
            email,
            password: '',
            uniqueId: generateUniqueId(),
            secretKey: `${generateUniqueId()}-${email}`,
            phone: '',
            accountType: 'Customer',
            authType: 'Facebook',
            userProfile: {
              firstname,
              lastname,
            },
          });

          return done(null, newUser);
        }

        return done(null, user);
      },
    ),
  );
};

export { configurePassport };
