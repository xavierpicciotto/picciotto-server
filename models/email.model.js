module.exports = (sequelise, Sequelize) => {
    const Email = sequelise.define('email', {
        email: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [1, 100],
                notNull: true,
                notEmpty: true
            }
        },
        verifyCode: {
            type: Sequelize.DataTypes.STRING,
            validate: {
                is: /^[\d]+$/g,
                len: [4,4]
            }
        },
        linkCode: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[\d]{20}$/g,
                len: [1,30]
            }
        }
    })
    return Email
}