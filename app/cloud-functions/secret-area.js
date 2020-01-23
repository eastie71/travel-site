exports.handler = function(event, context, callback) {
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
    }

    if (event.httpMethod !== "POST") {
        return callback(null, {
            statusCode: 200,
            headers,
            body: "This was NOT a POST request"
        })
    }

    const secretContent = `
        <h3>Congratulations! You have accessed the Secret Area!</h3>
        <p>Did you know that the Richmond Tigers won the AFL premiership in 2017 AND 2019! <strong>WOO HOO!</strong></p>
    `
    let body

    if (event.body) {
        body = JSON.parse(event.body)
    } else {
        body = {}
    }

    if (body.password == "secretpassword") {
        callback(null, {
            statusCode: 200,
            headers,
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401,
            headers
        })
    }
}