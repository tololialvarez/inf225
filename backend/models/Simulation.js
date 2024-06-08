// backend/models/Simulation.js
module.exports = (sequelize, DataTypes) => {
    const Simulation = sequelize.define('Simulation', {
        rut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        monto_uf: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        meses: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        resultado: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Simulation;
};
