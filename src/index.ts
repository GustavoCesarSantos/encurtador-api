import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.listen(parseInt(process.env.POST as string) || 3000, console.log('Server on in port 3000') )