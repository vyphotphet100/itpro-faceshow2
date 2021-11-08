class UserRequest {
    static logIn(username, password) {
        return $.ajax({
            url: Base.apiUrl + '/user/log-in',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                username : username,
                password : password
            }),
            success: function(userDto) {
                return userDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static createAccount(username, password, fullName, address) {
        return $.ajax({
            url: Base.apiUrl + '/user/create-account',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                username : username,
                password : password,
                fullName : fullName,
                address : address
            }),
            success: function(userDto) {
                return userDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static updateProfile(userDto) {
        return $.ajax({
            url: Base.apiUrl + '/user/update-profile',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            data: JSON.stringify(userDto),
            success: function(userDto) {
                return userDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static getProfile(username) {
        return $.ajax({
            url: Base.apiUrl + '/user/'+ username +'/get-profile',
            type: 'GET',
            async: false,
            contentType: 'application/json',
            success: function(userDto) {
                return userDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static sendMessageToRoom(messageDto) {
        // userUsername must be token code
        stompClient.send("/user/send-message-to-room", {}, JSON.stringify(messageDto));
    }

    static sendInviteMessage(messageDto) {
        // userUsername must be token code
        stompClient.send("/user/send-invite-message", {}, JSON.stringify(messageDto));
    }

    static joinRoom(roomId, hiddenPassword) {
        return $.ajax({
            url: Base.apiUrl + '/user/join-room/' + roomId + '/' + hiddenPassword,
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            data: JSON.stringify(),
            success: function(userDto) {
                return userDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }
}