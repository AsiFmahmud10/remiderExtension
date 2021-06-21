const getClass = (cls) => {
    return document.getElementsByClassName(`${cls}`)
}
const getId = (id) => {
    return document.getElementById(`${id}`)
}
const fetchQuote = async(url) => {
    try {
        let data = await fetch(url)
        data = await data.json()
        updateData(data)
    } catch (err) {
        return err.message
    }
}
const updateData = (data) => {
    getId('quotes').innerHTML = JSON.stringify(data.description)
    console.log(data)

}
const ran = (limit) => {
    return Math.floor(Math.random() * limit).toString()
}

// main.js
document.addEventListener('DOMContentLoaded', function() {

    fetchQuote(`https://bn-hadith-api.herokuapp.com/hadiths/${ran(60)}`)
});