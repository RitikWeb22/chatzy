const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3080
app.post('/', async (req, res) => {
  const { message, currentModel } = req.body
  console.log(message, 'message')
  const response = await openai.createCompletion({
    model: 'models', //text-davinci-003',
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  })
  res.json({
    response: response.data.choices[0].text,
  })
})

app.use(bodyParser.json())
app.use(cors()) // Enable CORS
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const configuration = new Configuration({
  apiKey: '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', // replace with your OpenAI API key
  organization: 'org-c3mCpm5boDl4Tnfpqc1sDqDl', // replace with your OpenAI organization ID
})

const openai = new OpenAIApi(configuration)

app.get('/models', async (req, res) => {
  const response = await openai.listEngines()
  console.log(response.data.data)
  res.json({
    models: response.data.data,
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
