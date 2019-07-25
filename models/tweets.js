module.exports = (sequelize, DataTypes) =>{
    const Tweets = sequelize.define('tweets',{
        date:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        userID:{
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        comments:{
            type: DataTypes.STRING,
            allowNull: true,

        },retweets:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        likes:{
            type: DataTypes.INTEGER,
            allowNull: true,

        }

    })
    return Tweets;
}