const express = require('express');
const app = express();
app.use(express.json());

    
// Show server being hit
app.get('/hello', (req, res) => {
    console.log("I've been hit");
})


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

