var stompClient = null;

// socket
function connect() {
    var socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/' + getCookie('username'), function (messageDto) {
            //showGreeting(JSON.parse(greeting.body).content);
            console.log(messageDto);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

connect();

function subcribeRoom(roomId) {
    stompClient.subscribe('/room/' + roomId, function (messageDto) {
        //showGreeting(JSON.parse(greeting.body).content);
        console.log(messageDto);

        var messageBoxStr = `
            <div class="chat-messages">
                <div class="message">
                    <p class="user-fullname"><strong>USER_FULLNAME</strong></p>
                    <p class="content">CONTENT</p>
                </div>
            </div>
        `;
        var userDto = UserRequest.getProfile(JSON.parse(messageDto.body).userUsername);
        messageBoxStr = messageBoxStr.replace('USER_FULLNAME', userDto.fullName);
        messageBoxStr = messageBoxStr.replace('CONTENT', JSON.parse(messageDto.body).content);
        if (document.getElementsByClassName('messages') == null)
            document.getElementById('message-button').click();

        setTimeout(function () {
            document.getElementsByClassName('messages')[0].innerHTML += messageBoxStr;
            document.getElementById('messageContentInput').value = '';
            if (document.getElementsByClassName('message').length == 6)
                document.getElementsByClassName('message')[0].remove();
        }, 1000);

    });
}

function sendMessageToRoom(roomId, token, content) {
    stompClient.send("/user/send-message-to-room", {}, JSON.stringify(
        {
            'content': content,
            'roomId': roomId,
            'userUsername': token
        }
    ));
}

// cookie
function setCookie(cname, cvalue, exMinutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exMinutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



