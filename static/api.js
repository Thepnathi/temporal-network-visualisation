async function get_dataset() {
    let response = await fetch("https://localhost:5000/dataset");
    let jsonResult = await response.json();
    console.log(jsonResult)
    return jsonResult
}

res = get_dataset()
console.log(res)