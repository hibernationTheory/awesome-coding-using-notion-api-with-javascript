const dotenv = require('dotenv')

dotenv.config()

console.log(process.env.NOTION_KEY)
console.log(process.env.NOTION_DATABASE_ID)
