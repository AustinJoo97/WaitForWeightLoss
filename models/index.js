const User = require('./User');
const Weight = require('./Weight');

User.hasMany(Weight, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Weight.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Weight };
