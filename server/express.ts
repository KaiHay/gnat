import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { appRouter } from './index';

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use('/trpc', createExpressMiddleware({ router: appRouter }));

const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`tRPC endpoint: http://localhost:${port}/trpc`);
});
