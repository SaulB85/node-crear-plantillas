const codigo = {
    head: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Title</title>
</head>
<body>
`,

    footer: `<footer></footer>  
</body>
</html>
`,

    template: `{{> head}}
        
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

{{> footer}}
`,

    server: {
        data: `const express = require('express');
const app = express();
const hbs = require('hbs');
        
app.use(express.static('public'));
        
app.set('view engine', 'hbs');
        
hbs.registerPartials(__dirname + '/views/partials');

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});
`,

        getRender(file, update = false) {
            let archivo = `
app.get('/', (req, res) => {    
res.render('${file}');
});
`;
            if (update) {
                archivo = `
app.get('/${file}', (req, res) => {
res.render('${file}');
});
`;
            }

            return archivo;
        }

    }

};

module.exports = { codigo }