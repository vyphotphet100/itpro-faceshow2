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

function setRooms() {
    var roomDtos = RoomRequest.getRoomByHostName(getCookie("username"));
    var roomBoxStr = `
            <tr class="room">
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb dYcjxs"><span class="RoomType__RoomTypeWrapper-sc-10p3uka-0 hpnueF"><svg aria-labelledby="id_hhucZWqO-STpqzflccics" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="icon__StyledSvg-v7mmhy-0 eMuYDz icon__Icon-v7mmhy-1 dEyfsA" aria-label="video"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 4h15v5.131l5-4V18.87l-5-4V20H2V4z" clip-rule="evenodd"></path></svg></svg>ID</span></td>
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb iFyXnp">CREATED</td>
              <td width="146.1064220183486" data-is-last-column="true" class="table__Cell-dhn9jj-7 tb dYcjxs">
                <button class="delete_bt" onClick="deleteRoom('ID');">
                  <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/17/000000/external-delete-miscellaneous-kiranshastry-gradient-kiranshastry.png" />
                </button>
              </td>
            </tr>
    `;

    for (var i=0; i<roomDtos.resultList.length; i++) {
        var roomBoxStrTmp = roomBoxStr.replace('ID', roomDtos.resultList[i].id);
        roomBoxStrTmp = roomBoxStrTmp.replace('ID', roomDtos.resultList[i].id);
        roomBoxStrTmp = roomBoxStrTmp.replace('CREATED', roomDtos.resultList[i].createdDate);
        document.getElementsByClassName('rooms')[0].innerHTML += roomBoxStrTmp;
    }

}

function deleteRoom(roomId) {
    RoomRequest.delete(roomId);
    window.location.reload();
}

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
        if (document.getElementsByClassName('messages')[0] == null)
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



