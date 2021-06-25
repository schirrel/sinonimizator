const api = window.location.port ? "http://localhost:3000" : "https://marvelous-stump-wasp.glitch.me/"
import Request from "https://unpkg.com/@schirrel/request@1.2.0/Request.js"

const request = async(data) => {

    try {
        return await Request.post(api, {
            body: data,
            mode: 'cors'
        })
    } catch (err) {
        console.warn(err)
        alert("Ow foi mal, mas deu merda.")
    }
}

export default request