// importera paket
const express = require('express')
const app = express()
const usersRouter = require('./routes/users.js')

// konfigurera
const PORT = process.env.PORT || 1337


// middleware
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body);
	next()
})

// routes / endpoints
app.use('/users', usersRouter)

// starta servern
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
})
