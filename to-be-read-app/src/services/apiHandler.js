export default async function todoApi(route, method, body) {
    console.log(body)
    const response = await fetch(`http://localhost:4000/livros/${route}`, {
        method: method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body)
    })
    return response.json()
}