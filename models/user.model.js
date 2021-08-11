module.exports = (sequelise, Sequelize) => {
    const User = sequelise.define('user',{
        user_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[-._a-z0-9]+$/gi,
                len: [4,50],
                notNull: true,
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                is: /[A-Z]/g,
                notNull: true,
                notEmpty: true,
            }
        }
    })
    return User
}