module.exports = {
    mongodb_host: process.env.DB_URL_DATABASE ? process.env.DB_URL_DATABASE : 'mongodb://localhost:27017/pokecoin',
    use_rs: "false",
    mongodb_port: process.env.DB_PORT ? process.env.DB_PORT : '27017',
    mongodb_db: process.env.DB_NAME ? process.env.DB_NAME : 'pokecoin'
};