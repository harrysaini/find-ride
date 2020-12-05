const conf = {
  db: {
    host: "localhost" || process.env.DATABASE_HOST,
    username: "root" || process.env.DATABASE_USERNAME,
    password: "olx@1234" || process.env.DATABASE_PASSWORD,
    database: "find_ride_2" || process.env.DATABASE_NAME
  }
}

export default conf;
