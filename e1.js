const express = require("express"); //importamos express
const app = express(); //inicializar express
const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));