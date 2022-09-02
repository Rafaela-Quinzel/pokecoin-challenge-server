module.exports = {
    aes: process.env.AES ? process.env.AES : "5ba43c7df7211e829af39f35cb8dc873",
    saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10
}