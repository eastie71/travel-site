exports.handler = function(event, context, callback) {
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
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401
        })
    }
    
}