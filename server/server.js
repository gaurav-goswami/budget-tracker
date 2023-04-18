const app = require('./app');
const connectDB = require('./database/db');


// server

const PORT = process.env.PORT;

connectDB();

const server = app.listen(PORT , () => {
    console.log(`Server is Listening on PORT ${PORT}`)
});
