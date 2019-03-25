npx sequelize db:create --env=development;
npx sequelize db:migrate --env=development;
npx sequelize db:seed:all --env=development;
npx sequelize db:create --env=test;
npx sequelize db:migrate --env=test;
#npx sequelize db:seed:all --env=test;