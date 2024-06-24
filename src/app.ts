import{ Application, NextFunction, Request, Response } from 'express';

import connectDb from './utils/db';
import createServer from './server';

require('dotenv').config();

export const app: Application = createServer()
const PORT = process.env.PORT || 5000;



app.listen(PORT, async () => {
   await connectDb();
   console.log(`App is running at http://localhost:${PORT}`);
});
