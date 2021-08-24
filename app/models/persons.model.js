module.exports = (sequelize, Sequelize) => {
    const Persons = sequelize.define("persons", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      ip_address: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      }
    }, {
      timestamps: false
    });
  
    return Persons;
};