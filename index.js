const express = require('express');
const app = express();
const cors = require("cors");
const consumerRoutes = require("./routes/consumer.js");
const superAdminRoute = require("./routes/superAdmin.js");
const contributorRoute = require("./routes/contributor.js");




app.use(cors())
const PORT = process.env.PORT || 3055;
app.set('port', PORT);
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
});

//statisk fil -->  levererar endast innehållet. Inget händer. 
const static = express.static('public'); //foldern/mappen vi vill leveerera statiska filer ifrån. Komemr foldra under public mappen att hantera statiska filer..
app.use(express.json()); // middleware, säger att vi vill anv json.
app.use(static);//talar om för appen att detta ska anv. static här är variablen i rad 21.


//body-parser --> Used for HTML input... You need to parse the body to get the method param:
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', consumerRoutes); // callback = routes -> den metod vi vill ska hantera endpointen(request)
app.use('/', superAdminRoute);
app.use('/', contributorRoute);







