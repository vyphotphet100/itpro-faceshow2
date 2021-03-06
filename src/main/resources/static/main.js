function logIn() {
    let username = $('#username').val();
    let password = $('#password').val();
    let userDto = UserRequest.logIn(username, password);
    if (userDto.httpStatus == 'OK') {
        setCookie("username", userDto.username, 60 * 24);
        setCookie("token", userDto.token, 60 * 24);
        window.location.href = 'http://localhost:3000';
    }
}

function signUp() {
    let fullName = $('#fullName').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let address = $('#address').val();
    let confirmPassword = $('#confirmPassword').val();

    if (password != confirmPassword) {
        alert("Your confirm password is not the same with password");
        return;
    }

    let userDto = UserRequest.createAccount(username, password, fullName, address);
    if (userDto.httpStatus == 'OK') {
        setCookie("username", userDto.username, 60 * 24);
        setCookie("token", userDto.token, 60 * 24);
        alert(userDto.message);
        window.location.href = 'http://localhost:3000';
    }
}

function setProfile() {
    var userDto = UserRequest.getProfile(getCookie("username"));
    if (userDto.httpStatus != "OK") {
        alert("Something's wrong");
        return;
    }

    $('#fullName').val(userDto.fullName);
    document.getElementById("fullName2").innerText = userDto.fullName;
    $('#username').val(userDto.username);
    $('#address').val(userDto.address);
    $('#phone').val(userDto.phone);
}

if (window.location.href.includes("profile"))
    setProfile();