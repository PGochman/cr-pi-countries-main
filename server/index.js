const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {createDatabase} = require("./src/utils/createDatabase")

conn.sync({ force: false }).then(() => {
  createDatabase()
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
