const Client = require('@notionhq/client').Client
const dotenv = require('dotenv')

dotenv.config()

const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY })
const DATABASE_ID = process.env.NOTION_DATABASE_ID

async function getDatabaseData(client, databaseId) {
  const response = await client.databases.query({
    database_id: databaseId,
  })

  console.log(response)
}

getDatabaseData(NOTION_CLIENT, DATABASE_ID)
