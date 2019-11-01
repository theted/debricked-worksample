import * as axios from 'axios'

// TODO: move hard-coded endpoint to common config file!
const ENDPOINT = 'http://localhost:4244/upload'

function upload(formData) {
    return axios.post(ENDPOINT, formData)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log('some error:', err)
            return 'ERROR:' + err
        })

}

export { upload }
