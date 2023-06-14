function askGPT() {
    var inputText = document.getElementById("myInput").value;

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const message = inputText;
    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": message }],
        temperature: 0.7,
        max_tokens: 100,
        stop: "\n",
        frequency_penalty: 0,
        presence_penalty: 0
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API-KEY'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            const apiResponse = JSON.parse(JSON.stringify(data, null, 2));
            const agentMessage = apiResponse.choices[0].message.content;

            var chatLog = document.getElementById("chat-log");
            var messageNode = document.createElement("p");
            messageNode.textContent = "OPEN AI: " + agentMessage;
            chatLog.appendChild(messageNode);
        })
        .catch(error => console.error(error));

}
