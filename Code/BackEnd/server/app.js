import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));
app.use(routes);


app.listen(PORT, (err) => {
    if (err) { console.log(err); }
    else {
        console.log(`listening on Port: ${PORT}`);
    }
});
