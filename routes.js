const fs = require('fs')

const getUserList = () => {
    let usersContent = fs.readFileSync('./users.txt')
    return usersContent.toString('utf-8').split("\n")
}

const pushToUserList = (user) => {
    fs.appendFile('./users.txt', getUserList().length > 0 ? `\n${user}` : user, function (err) {
      if (err) throw err
    })
}

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if(method === 'GET') {
        if(url === '/') {
            res.write('<html>')
            res.write('<head><title>Greetings</title></head>')
            res.write('<body><h1>Greetings</h1></body>')
            res.write('<form action="/create-user" method="POST"><input type="text" name="username" placeholder="Username"/><button type="submit">Create</button></form>')
            res.write('</html>')
            return res.end()
        }
        if(url === '/users') {
            res.write('<html>')
            res.write('<head><title>Users</title></head>')
            res.write('<body>')
            res.write('<h1>Users</h1></body>')
            res.write('<ul>')
            getUserList().forEach( (user) => {
                res.write(`<li>${user}</li>`)
            })
            res.write('</ul>')
            res.write('</body>')
            res.write('</html>')
            return res.end()
        }
    }
    if(method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            user = parsedBody.split('=')[1]
            pushToUserList(user)
            res.statusCode = 302
            res.setHeader('Location', '/users')
            return res.end()
        })
    }
}
module.exports = requestHandler