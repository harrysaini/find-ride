import express, { Router, Request, Response } from 'express';
import { getNearbyDriversReqHandler, updateLocationReqHandler } from './controller';


const app: express.Application = express();

const port: string | number = process.env.PORT || '3000';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('server started')
})

// setup api router
const apiRouter = Router()

apiRouter.put('/update', updateLocationReqHandler);
apiRouter.get('/nearby', getNearbyDriversReqHandler);

router.use('/api', apiRouter)


app.use(router);


export default app;
