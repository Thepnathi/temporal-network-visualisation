async function get_dataset() {
    let response = await fetch("http://localhost:5000/dataset");
    let jsonResult = await response.json();
    return jsonResult
}

// res = get_dataset()
// console.log(res)