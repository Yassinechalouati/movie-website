const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors({
    origin: "*"
}))



const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginRouter = require('./routes/log_in')
const signupRouter = require('./routes/sign_up')
const moviesRouter = require('./routes/movies')
const descriptionRouter = require('./routes/desc_page')
const commentsRouter = require('./routes/comment')
const writecommentsRouter = require('./routes/write_comment')
const seriesRouter = require('./routes/series')
const description2Rtouer = require('./routes/desc_page2')
const series_commentsRouter = require('./routes/series_comment')
const series_writecommentsRouter = require('./routes/series_write_comment')
const mylistRouter = require('./routes/mylist')
const serieslikeRouter = require('./routes/series_like')
const likesRouter = require('./routes/liked')

app.use('/', loginRouter)
app.use('/', signupRouter)
app.use('/', moviesRouter)
app.use('/', descriptionRouter)
app.use('/', commentsRouter)
app.use('/', writecommentsRouter)
app.use('/', seriesRouter)
app.use('/', description2Rtouer)
app.use('/', series_commentsRouter)
app.use('/', series_writecommentsRouter)
app.use('/', mylistRouter)
app.use('/', serieslikeRouter)
app.use('/', likesRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });