const httpModule = require("http");

const host = "0.0.0.0";
const port = 8000;

const users = [
    {id: 1, name: "John Johnson"},
    {id: 2, name: "Lika Beridze"},
    {id: 3, name: "Luka shengelia"},
]

const requestListener = function (req, res) {
    res.setHeader("Content-Type", 'application/json')
    res.setHeader('Access-Control-Allow-Origin', "*")
    console.log(req.url)
    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log(url)
    if (req.method === "GET") {
        // res.writeHead(200);
        // res.end("GET request detected");

        if (url.pathname === '/userInfo') {
            res.writeHead(200);
            res.end(JSON.stringify(users));
        } else if (url.pathname.startsWith("/userInfo/")) {
            const userId = Number(url.pathname.substring(10))

            if (String(userId) === 'NaN') {
                console.log(userId)
                res.writeHead(400)
                res.end(JSON.stringify({
                    success: false,
                    message: "Error: userId must be a number!"
                }))
            } else {
                const user = users.filter(user => user.id === userId);

                if (user.length) {
                    res.writeHead(200);
                    res.end(JSON.stringify(user[0]));
                } else {
                    res.writeHead(400)
                    res.end(JSON.stringify({
                        success: false,
                        message: "user with given Id could not be found"
                    }))
                }
    
            }
        }
    } else if (req.method === "POST") {
        if (url.pathname === '/addUser') {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            })

            req.on("end", () => {
                const newUser = JSON.parse(body);
                const ids = users.map(user => user.id);
                const sortedIds = ids.sort((a, b) => a - b);
                const newId = sortedIds.at(-1)+1;
                newUser.id = newId;
                users.push(newUser);
                res.writeHead(200);
                res.end(`\nNew user has been added ${JSON.stringify(newUser)}\n`);
            })
        }
    }
    else {
        res.writeHead(405);
        res.end("Only GET or POST Requests are allowed");
    }

}

const server = httpModule.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Your server is running at http://${host}:${port}`);
});