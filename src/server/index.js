import dotenv from 'dotenv';
dotenv.config();

import app from '../app.js';

const port = process.env.PORT || 3982;
app.listen(port, () => {
  console.log(`✅ Server running: http://localhost:${port}`);
});