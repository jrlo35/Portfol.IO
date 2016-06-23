var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var salt = bcrypt.genSaltSync(10);

//JAWSDB for Heroku deployment
if (process.env.DEPLOYED === 'TRUE') {
    var orm = new Sequelize(process.env.JAWSDB_URL);
} else {
    var orm = new Sequelize('Pistonsdb', 'root', '');
}

//User Model
var User = orm.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    // Badge related behavior
    badgeJoined: Sequelize.BOOLEAN,
    firstPlaces: Sequelize.INTEGER,
    secondPlaces: Sequelize.INTEGER,
    thirdPlaces: Sequelize.INTEGER,
    badgeLastLogin: Sequelize.DATE,
    averageReturn: Sequelize.INTEGER,
    leaguesJoined: Sequelize.INTEGER,

    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    image: Sequelize.TEXT
}, {
    instanceMethods: {
        hashPassword: function () {
            "use strict";
            return bcrypt.hashSync(this.password, salt);
        },
        validPassword: function (inputpass, pass) {

            "use strict";
            return bcrypt.compareSync(inputpass, pass);
        }
    }
});

User.beforeCreate(function (user) {

    "use strict";
    user.password = user.hashPassword();
});

var Watchlist = orm.define('Watchlist', {
    symbol: Sequelize.STRING
});

//Portfolio Model
var Portfolio = orm.define('Portfolio', {
    balance: Sequelize.INTEGER,
    portfolioValue: Sequelize.FLOAT,
    numOfTrades: Sequelize.INTEGER,
    username: Sequelize.STRING,
    leaguename: Sequelize.STRING,
    rank: Sequelize.INTEGER,
    leagueEnded: Sequelize.BOOLEAN,
    returnPercentage: Sequelize.FLOAT
});

// Forum & Topics Model
var Forum = orm.define('Forum', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    creatorName: Sequelize.STRING,
    creatorId: Sequelize.INTEGER
});

var Topic = orm.define('Topic', {
    topicId: Sequelize.INTEGER,
    message: Sequelize.TEXT,
    userName: Sequelize.STRING,
    userId: Sequelize.STRING
});

// DirectMessage
var DirectMessage = orm.define('DirectMessage', {
    username: Sequelize.STRING,
    recipientId: Sequelize.INTEGER,
    recipientUsername: Sequelize.STRING,
    message: Sequelize.TEXT,
    read: Sequelize.BOOLEAN,
    closed: Sequelize.BOOLEAN
});

//Transaction Model
var Transaction = orm.define('Transaction', {

    symbol: Sequelize.STRING,
    company: Sequelize.STRING,
    price: Sequelize.FLOAT,
    marketPrice: Sequelize.FLOAT,
    return: Sequelize.FLOAT,
    buysell: Sequelize.BOOLEAN,
    shares: Sequelize.INTEGER

});

//Order Model
var Order = orm.define('Order', {

    symbol: Sequelize.STRING,
    company: Sequelize.STRING,
    price: Sequelize.FLOAT,
    buysell: Sequelize.BOOLEAN,
    shares: Sequelize.INTEGER,
    executed: Sequelize.BOOLEAN,
    dayorder: Sequelize.BOOLEAN

});

//Message Board Model

var Message = orm.define('Message', {
    name: Sequelize.STRING,
    message: Sequelize.STRING
});


//League Model
var League = orm.define('league', {
    ownerid: Sequelize.INTEGER,
    name: Sequelize.STRING,
    maxNum: Sequelize.INTEGER,
    startbalance: Sequelize.FLOAT,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    private: Sequelize.BOOLEAN,
    code: Sequelize.STRING,
    duration: Sequelize.STRING,
    hasEnded: Sequelize.BOOLEAN
});

// Badges
var Badge = orm.define('Badge', {
    name: {type: Sequelize.STRING, unique: true},
    text: Sequelize.STRING,
    icon: Sequelize.STRING
});

//League Invite
var LeagueInvite = orm.define('LeagueInvite', {
    receiverId: Sequelize.INTEGER,
    leaguename: Sequelize.STRING,
    leagueId: Sequelize.STRING,
    username: Sequelize.STRING,
    read: Sequelize.BOOLEAN,
    start: Sequelize.STRING,
    end: Sequelize.STRING
});

//Join table for League and user
var League_user = orm.define('League_user', {
});

// Join table for badge and user
var Badge_user = orm.define('Badge_user', {
});

//Badge to User - Many to Many
User.belongsToMany(Badge, {through: 'Badge_user'});
Badge.belongsToMany(User, {through: 'Badge_user'});

Message.belongsTo(User);
User.hasMany(Message);

League.hasMany(Message);
Message.belongsTo(League);

//League to User - Many to Many
League.belongsToMany(User, {through: 'League_user'});
User.belongsToMany(League, {through: 'League_user'});

//League to Portfolio - One to Many
League.hasMany(Portfolio);
Portfolio.belongsTo(League);

//User to watchlist - One to One

Watchlist.belongsTo(User);

//Portfolio to User - One to Many
User.hasMany(Portfolio);
Portfolio.belongsTo(User);

//Transaction to User - One to Many

Portfolio.hasMany(Transaction);
Transaction.belongsTo(Portfolio);

//Transaction to portfolio - One to Many

Portfolio.hasMany(Order);
Order.belongsTo(Portfolio);

// User to DirectMessage - One to Many
User.hasMany(DirectMessage);
DirectMessage.belongsTo(User);

//league invite
User.hasMany(LeagueInvite);
LeagueInvite.belongsTo(User);


User.sync();
League.sync();
Portfolio.sync();
Transaction.sync();
League_user.sync();
Badge_user.sync();
Message.sync();
Forum.sync();
Topic.sync();
Order.sync();
Badge.sync();
DirectMessage.sync();
Watchlist.sync();
LeagueInvite.sync();

exports.League_user = League_user;
exports.Badge_user = Badge_user;
exports.User = User;
exports.League = League;
exports.Portfolio = Portfolio;
exports.Transaction = Transaction;
exports.Message = Message;
exports.Forum = Forum;
exports.orm = orm;
exports.Topic = Topic;
exports.Order = Order;
exports.Badge = Badge;
exports.DirectMessage = DirectMessage;
exports.Badge = Badge;
exports.Watchlist = Watchlist;
exports.LeagueInvite = LeagueInvite;
