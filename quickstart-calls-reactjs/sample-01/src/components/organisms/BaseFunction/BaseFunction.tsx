import React, { Component } from 'react'

class BaseFunction extends Component {

    static getCookie = (cname: any) => {
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

    static setCookie = (cname: any, cvalue: any, exMinutes: any) => {
        var d = new Date();
        d.setTime(d.getTime() + (exMinutes * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    render() {
        return (
            ''
        )
    }
}

export default BaseFunction