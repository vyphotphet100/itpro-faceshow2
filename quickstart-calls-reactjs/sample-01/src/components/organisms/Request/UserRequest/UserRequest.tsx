import React, { Component } from 'react'

declare global {
  interface Window {
    subcribeRoom: (roomId: any) => void;
    sendMessageToRoom: (roomId: string, token: string, content: string) => void;
    setRooms: () => void;
    deleteRoom: (roomId: string) => void;
  }
}

class UserRequest extends Component {

  static userDto = {
    username: null,
    password: null,
    fullName: null,
    address: null,
    avatar: null,
    phone: null,
    status: null,
    token: null,
    roomIds: [],
    messageIds: [],
    joinedRoomIds: []
  };

  static getProfile = async (username: any, func: Function) => {
    // Where we're fetching data from
    try {
      const response = await fetch("http://localhost:8080/user/" + username + "/get-profile");
      const data = await response.json();
      func(data);
    } catch (error) {
      return console.error(error);
    }
  }

  static subcribeRoom = (roomId: string) => {
    window.subcribeRoom(roomId);
  }

  static sendMessageToRoom = (roomId: string, token: string, content: string) => {
    window.sendMessageToRoom(roomId, token, content);
  }

  static setRooms = () => {
    window.setRooms();
  }

  render() {
    return (
      ''
    )
  }
}

export default UserRequest