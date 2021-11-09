class RoomRequest {
    static getUserStatus(roomId) {
        return $.ajax({
            url: Base.apiUrl + '/room/' + roomId + '/get-user-status',
            type: 'GET',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            success: function(roomDto) {
                return roomDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static createRoom() {
        return $.ajax({
            url: Base.apiUrl + '/room/create-room',
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            success: function(roomDto) {
                return roomDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static removeUser(roomId, username) {
        return $.ajax({
            url: Base.apiUrl + '/room/'+ roomId +'/remove-user/' + username,
            type: 'POST',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            success: function(roomDto) {
                return roomDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static getRoomByHostName(username) {
        return $.ajax({
            url: Base.apiUrl + '/room/get-by-host-name/' + username,
            type: 'GET',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            success: function(roomDto) {
                return roomDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }

    static delete(roomId) {
        return $.ajax({
            url: Base.apiUrl + '/room/'+ roomId,
            type: 'DELETE',
            async: false,
            headers: { 'Authorization': 'Token ' + getCookie('token') },
            contentType: 'application/json',
            success: function(roomDto) {
                return roomDto;
            },
            error: function(error) {
                alert(error.responseJSON.message);
                return error;
            }
        }).responseJSON;
    }
}
