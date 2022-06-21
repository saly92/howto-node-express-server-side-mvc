import express from 'express';
import { siteData } from './src/models.js';

const app = express();
const port = process.env.PORT || 3007;
const fullUrl = `http://localhost:${port}`;
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
        body { background-color: #fff;
        
        }
        a{
            color: black;
            text-decoration: none;
        }
        </style>
    </head>
    <body>
        <h1>info Api </h1>
        <ul>
        ${Object.keys(siteData)
			.map((key) => {
				return `<li><a href="${fullUrl}/${key}">${fullUrl}/${key}</a></li>`;
			})
			.join(' ')}
        
        </ul>

    </body>
    </html>
    `);
});
//to display data under urls
Object.entries(siteData).forEach(entry => {
    const key= entry[0]
    const value= entry[1]
    app.get(`/${key}`,(req, res) => {
        res.send(value);
    })
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
