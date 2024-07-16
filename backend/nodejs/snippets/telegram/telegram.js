const https = require('https');

sendTelegram(`<b>bold text</b> \n nextline! \n <a href="https://example.com">Link!</a>`);

// https://core.telegram.org/bots/api#html-style
function sendTelegram(message) {
    let encodedMessage = encodeURIComponent(message);
    let botId = 'bot54454312';
    let token = 'SDJSA28jskdj-SJDK83jdkj8JSDKJ8s';
    let chatId = '-28343277134';
    let url = `https://api.telegram.org/${botId}:${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${encodedMessage}&disable_web_page_preview=True`;

    https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let jsonResponse = JSON.parse(data);
            if (!jsonResponse.ok) {
                console.log(jsonResponse);
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}