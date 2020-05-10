'use strict';

let bcrypt = require('bcryptjs')
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
       type: DataTypes.STRING,
       unique: true,
       allowNull: false
      },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set (){
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  return User;
};