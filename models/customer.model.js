module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("customer", {
      name: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
    
    });
  
    return Tutorial;
  };