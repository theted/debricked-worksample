const ENVIRONMENT = (window.location.hostname === 'localhost') ? 'development' : 'production'
const ENDPOINT = (ENVIRONMENT === 'production') ? 'https://' + window.location.hostname : 'http://localhost:4244/'

console.log('use endpoint:', endpoint)

const config = {
  endpoint: ENDPOINT
}

export default config
