module.exports = (sequilise, Sequelize) => {
    const User = sequilise.define('user',{
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        }
    })
    return User
}