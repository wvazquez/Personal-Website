const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.static('./dist'));

app.get('/', (request, response)=> {
  response.render('index');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
