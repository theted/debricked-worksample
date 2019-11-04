import * as axios from 'axios'
import config from '../config.js'

function upload(formData) {
    return axios.post(config.endpoint + 'upload', formData)
        .then(data => {
            return data
        })
        .catch(err => {
            console.log('some error:', err)
            return 'ERROR:' + err
        })

}

export { upload }
