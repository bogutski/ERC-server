import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  port: 8889,
  database: 'erc1',
  username: 'erc1',
  password: 'erc1',
  dialect: 'mysql',
});

sequelize.sync();

export default sequelize;
