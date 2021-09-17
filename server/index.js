import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/router.js';

const app = express();

// set up port

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
// add routes

app.use('/api', router);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
