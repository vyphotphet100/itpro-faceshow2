import {
  CallButton,
  EndButton,
  MuteButton,
  StartVideoButton,
  StopVideoButton,
  UnmuteButton,
} from 'components/atoms/CallButtons';
import { InputWithCopyIcon } from 'components/molecules/Info';
import DeviceSettings from 'components/organisms/DeviceSettings';
import React, { Component } from "react";
import MediaContent from 'components/organisms/GroupCall/MediaContent';
import { RoomInfo } from 'components/organisms/RoomCreated/RoomCreated';
import type { StatefulRoom, StatefulParticipant } from 'lib/sendbird-calls';
import Modal from 'components/templates/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { demi, heavy, heading2text1, midBig, normal, small } from 'styles/fonts';
import Input, { useTextInput } from 'components/atoms/Input';
import BaseFunction from 'components/organisms/BaseFunction';
import RoomRequest from 'components/organisms/Request/RoomRequest';
import UserRequest from 'components/organisms/Request/UserRequest';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--navy-900);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  flex: 0;
  height: 64px;
  padding: 22px 24px;
  background-color: var(--navy-900);
  ${heading2text1};
  ${demi};
  color: white;
  z-index: 10;
`;

const ChevronRight = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(/icons/ic-chevron-right.svg);
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 6px;
`;

const Footer = styled.div`
  height: 88px;
  padding: 0 48px;
  background-color: var(--neutral-navy-800);
  display: flex;
  justify-content: space-between;
  z-index: 10;
`;

const Button = styled.div`
  width: 80px;
  height: 88px;
  padding: 20px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${normal};
  ${heavy}:
  letter-spacing: -0.1px;
  color: var(--white);
`;

const Button2 = styled.div`
  width: 80px;
  height: 20px;
  padding: 18px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: var(--black);
  background-color: white;
`;

const ButtonIcon = styled.div<{ src: string }>`
  background-image: ${props => css`url(${props.src})`};
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
`;

const UtilityButtons = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  ${CallButton} {
    width: 48px;
    height: 48px;
    background-size: 24px 24px;
    padding: 12px;
  }
`;

const Side = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 376px;
  background-color: var(--white);
  ${props => props.show ? css`
  
` : css`
  margin-right: -376px;
`};
`;

const SideTitle = styled.div`
  ${midBig};
  ${demi};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 63px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--navy-100);
`;

const SideClose = styled.div`
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  > div {
    width: 20px;
    height: 20px;
    background-image: url(/icons/ic-close.svg);
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const Participants = styled.div`
  width: 100%;
  padding: 0 24px;
  flex: 1;
`

const ParticipantWrapper = styled.div<{ src: string; }>`
  display: flex;
  align-items: center;
  height: 60px;
  &>div:first-child {
    width: 32px;
    height: 32px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    flex-shrink: 0;
    border-radius: 50%;
    margin-right: 12px;
  }
`

const ParticipantNickname = styled.div`
  ${normal};
  ${heavy};
  color: var(--navy-900);
`;

const ParticipantId = styled.div`
  ${small};
  color: var(--navy-600);
`;

const InputLabel = styled.label`
  height: 12px;
  display: inline-block;
  margin-top: 6px;
  margin-bottom: 6px;
  &:first-of-type {
    margin-top: 38px;
  }
`;

const Participant = ({ participant }: { participant: StatefulParticipant }) => {
  return (
    <ParticipantWrapper src={participant.user.profileUrl || '/icons/icon-avatar.svg'}>
      <div />
      <div>
        {/* <ParticipantNickname>{participant.user.nickname || '—'}</ParticipantNickname> */}
        <ParticipantId>User ID: {participant.user.userId}</ParticipantId>
      </div>
    </ParticipantWrapper>
  )
};

const ShareWrapper = styled.div`
  padding: 24px;
  label {
    ${normal};
    ${demi};
    letter-spacing: -0.1px;
  }
`;

type GroupCallProps = {
  room: StatefulRoom;
}
const GroupCall = ({ room }: GroupCallProps) => {
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [showSide, setShowSide] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [messageContent, messageContentInput] = useTextInput({ id: 'messageContentInput', initValue: "", placeholder: "Enter Message" });

  const { participants, localParticipant, remoteParticipants } = room;

  const sendMessageToRoom = () => {

    UserRequest.sendMessageToRoom(room.roomId, BaseFunction.getCookie("token"), messageContent);

  }

  return (
    <Wrapper>
      <Main>
        <Header>
          <span onClick={() => {
            setShowRoomInfo(true);
          }} style={{ cursor: 'pointer' }}>{room.roomId}</span>
          <ChevronRight />
        </Header>

        <MediaContent room={room} />

        <Footer>
          <Button onClick={() => setShowDeviceSettings(true)}>
            <ButtonIcon src="/icons/ic-settings.svg" />
            Settings
          </Button>
          <UtilityButtons>
            {localParticipant.isAudioEnabled ? <MuteButton onClick={() => localParticipant.muteMicrophone()} /> :
              <UnmuteButton onClick={() => localParticipant.unmuteMicrophone()} />}
            {localParticipant.isVideoEnabled ? <StopVideoButton onClick={() => localParticipant.stopVideo()} /> :
              <StartVideoButton onClick={() => localParticipant.startVideo()} />}
            <EndButton onClick={() => room.exit()} />
          </UtilityButtons>
          <UtilityButtons>
            <Button id="message-button" onClick={() => setShowMessages(!showMessages)} >
              <ButtonIcon src="/icons/mess.svg" />
              Messages
            </Button>
            <Button onClick={() => setShowParticipants(!showParticipants)} >
              <ButtonIcon src="/icons/ic-user.svg" />
              Participants
            </Button>
          </UtilityButtons>
        </Footer>
        <DeviceSettings
          isOpen={showDeviceSettings}
          close={() => setShowDeviceSettings(false)}
        />
        <RoomInfo
          isOpen={showRoomInfo}
          room={room}
          close={() => setShowRoomInfo(false)}
        />
      </Main>
      <Side show={showMessages}>
        <SideTitle>
          <div>
            Participants ({room.participants.length})
          </div>
          <SideClose onClick={() => setShowMessages(false)}><div /></SideClose>
        </SideTitle>
        <div className="messages">
          <div className="chat-messages">
            <div className="message">
              <p className="user-fullname"><strong>Room </strong></p>
              <p className="content">
                Hello everyone!
              </p>
            </div>
          </div>
        </div>
        <ShareWrapper>
          <div className="chat-form-container">
            <div id="chat-form">
              <span>
                {messageContentInput}
                <button onClick={() => sendMessageToRoom()} id="msgb" className="btn"><i className="fas fa-paper-plane"></i> Send</button>
              </span>
            </div>
          </div>
        </ShareWrapper>
      </Side>

      {/* { <Modal
        isOpen={showMessages}
        close={() => setShowMessages(false)}
        shouldCloseOnOverlayClick
        title="Messages"
        content={(
          <Side show={true}>
            <Participants className="messages">
              <div className="chat-messages">
                <div className="message">
                  <p className="user-fullname"><strong>Room </strong></p>
                  <p className="content">
                    Hello everyone!
                  </p>
                </div>
              </div>
            </Participants>
            <ShareWrapper>
              <div className="chat-form-container">
                <div id="chat-form">
                  <UtilityButtons>
                    {messageContentInput}
                   
                    <Button2 onClick={() => sendMessageToRoom()} >
                      <strong>Send</strong>
                    </Button2>
                  </UtilityButtons>
                </div>
              </div>
            </ShareWrapper>
          </Side>
        )}
        footer={{}}
        {...null}
      /> } */}

      <Modal
        isOpen={showParticipants}
        close={() => setShowParticipants(false)}
        shouldCloseOnOverlayClick
        title="Participants"
        content={(
          <Side show={true}>
            <Participants>
              {participants.map(p => <Participant participant={p} />)}
            </Participants>
            <ShareWrapper>
              <InputWithCopyIcon title="Share room ID" text={room.roomId} />
            </ShareWrapper>
          </Side>
        )}
        footer={{}}
        {...null}
      />

    </Wrapper>
  );
};

export default GroupCall;
