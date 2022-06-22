import express from 'express';
import { siteData } from './src/models.js';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3007;
const fullUrl = `http://localhost:${port}`;
app.use(express.static('public'));
//hier sagen wir welche front end darf auf unsere backend kommen (cors)
app.use (cors());
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
       <li><a href="${fullUrl}/all">${fullUrl}/all</a></li>
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
app.get('/all', (req, res) => {
    res.send(siteData);
})
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
