const app = require('./app')
const env = require('./config/env')

app.listen(env.port, () => {
  console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`)
})
