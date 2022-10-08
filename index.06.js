const Client = require('@notionhq/client').Client
const dotenv = require('dotenv')

dotenv.config()

const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY })
const DATABASE_ID = process.env.NOTION_DATABASE_ID

async function getDatabaseData(client, databaseId) {
  try {
    let results = []

    const response = await client.databases.query({
      database_id: databaseId,
    })
    results = [...results, ...response.results]

    // while loop variables
    let hasMore = response.has_more
    let nextCursor = response.next_cursor

    // keep fetching while there are more results
    while (hasMore) {
      const response = await client.databases.query({
        database_id: databaseId,
        start_cursor: nextCursor,
      })
      results = [...results, ...response.results]
      hasMore = response.has_more
      nextCursor = response.next_cursor
    }

    return results
  } catch (error) {
    console.error(error)
  }
}

async function main() {
  const data = await getDatabaseData(NOTION_CLIENT, DATABASE_ID)
  const firstDataItem = data[0]

  console.log(JSON.stringify(firstDataItem, null, 2))
}

main()
