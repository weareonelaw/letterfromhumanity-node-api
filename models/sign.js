module.exports = (sequelize, DataTypes) => {
  const Sign = sequelize.define('sign', {
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      notNull: true,
      validate: {
        isUUID: 4,
        notNull: true,
      }
    },
    firstName: {
      type: DataTypes.STRING(50)
    },
    lastName: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      }
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    location: {
      type: DataTypes.STRING(50)
    },
  });


  Sign.associate = function(models) {

  };

  return Sign;
};
