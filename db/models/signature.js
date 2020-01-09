'use strict';
module.exports = (sequelize, DataTypes) => {
  const Signature = sequelize.define('Signature', {
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      }
    },
    firstName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    location: {
      type: DataTypes.STRING(50),
    },
    targetPerson: {
      type: DataTypes.STRING(50),
    },
    recaptchaScore: {
      type: DataTypes.FLOAT(),
    }
  }, {});
  Signature.associate = function(models) {
    // associations can be defined here
  };
  return Signature;
};
