const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();

app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
