const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/addRoutes');
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
const URL = `mongodb+srv://Alucard2169:${process.env.DB_PASS}@idea-web.nmpbz3x.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})
    })
    .catch((err) => {
    console.log(err)
})



app.get("/", (req, res) => {
    res.redirect('/idea')
})
app.use(router)