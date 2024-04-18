import express from 'express';
import { usuarios } from './public/assets/js/usuarios.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})


const miMiddelware = (req, res, next) => {
    console.log('pasaste por el middelware')
    const user = false
    if (user) {
        next()
    } else {
        res.status(401).send('FAIASTEEE')
    }
}

app.get("/abracadabra/usuarios", (req, res) => {
    res.json(usuarios)
})
app.get("/abracadabra/juego/:usuario", (req, res) => {
    const usuario = req.params.usuario
    if(usuarios[usuario]){
        res.sendFile(__dirname + '/public/index.html');
    }else{
        res.sendFile(__dirname + '/public/assets/who.jpeg')
    }

})
app.get("/abracadabra/conejo/:n", (req, res) => {
    const nAleatoreo = Math.floor(Math.random() * 4) + 1
    const nSeleccionado = req.params.n
    if(nAleatoreo == nSeleccionado){
        res.sendFile(__dirname + '/public/assets/conejito.jpg')
    }else{
        res.sendFile(__dirname + '/public/assets/voldemort.jpg')
    }
})
app.get("/*", (req,res)=>{
    res.send("404 Error not found")
})