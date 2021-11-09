import React, { Component } from 'react'
import BaseFunction from 'components/organisms/BaseFunction';

class RoomRequest extends Component {

    static roomDto = {
        id: null,
        hostUserUsername: null,
        messageIds: [],
        joinedUserUsernames: [],
        name: null,
        hiddenPassword: null
    };

    static createRoom = async (roomId: string, func: Function) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + BaseFunction.getCookie('token')
            },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        try {
            const response = await fetch("http://localhost:8080/room/create-room/" + roomId, requestOptions);
            const data = await response.json();
            func(data);
        } catch (error) {
            return console.error(error);
        }
    }

    static findById = async (roomId: string, func: Function) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + BaseFunction.getCookie('token')
            }
        };

        try {
            const response = await fetch("http://localhost:8080/room/" + roomId, requestOptions);
            const data = await response.json();
            func(data);
        } catch (error) {
            return console.error(error);
        }
    }

    render() {
        return (
            ''
        )
    }
}

export default RoomRequest