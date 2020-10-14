module.exports = (sequelize, Sequelize) => {
    const Subordinate = sequelize.define("subordinate", {
      name: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      customerEmail: {
        type: Sequelize.STRING
      }
    });
  
    return Subordinate;
  };