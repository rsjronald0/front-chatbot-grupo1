(async function () {
    app = document.querySelector(".app")

    app.querySelector(".chat-screen #send-message").addEventListener("click", async function() {
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message.length == 0){
            return;
        }
        renderMessage("my", {
            username: "Você",
            text: message
        });
        app.querySelector(".chat-screen #message-input").value = "";

        var payload = {
            "mensagem": message
        };
        fetch('http://127.0.0.1:5020/chatbot', {
            method: 'post',
            body: JSON.stringify(payload)
          }).then(async function(response) {
            renderMessage("bot", {
                text: await response.json()
            });
          })
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type == 'my') {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">Você</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "bot") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">SidX</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        }

        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();