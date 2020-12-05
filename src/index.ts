import app from './app';
import { initTables, seedDatabase } from './helpers/setupDB';
import DatabaseConnection from './mysqlConn';
const port = app.get('port');


const setServer = async () => {
  const connection = await DatabaseConnection.getSetupConnection();
  connection.connect();
  DatabaseConnection.checkConnection(connection);
  await initTables(connection)
  await seedDatabase()
}


setServer().then(() => {
  app.listen(port, () => {
    console.log('server started:' + `Listening on ${port}`);
  });
}).catch((err) => {
  console.log(err);
});
