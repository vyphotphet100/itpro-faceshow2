import ApplicationInformation from 'components/organisms/ApplicationInformation';
import UserRequest from 'components/organisms/Request/UserRequest';
import BaseFunction from 'components/organisms/BaseFunction';
import DeviceSettings from 'components/organisms/DeviceSettings';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';

import Menu from 'components/organisms/Menu';
import { useSbCalls } from 'lib/sendbird-calls';
import { demi } from 'styles/fonts';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';
import { media, mediaMax } from 'utils';
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--purple-300);
  ${props => (props.theme.isWidget ? css`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  ` : ``)};
  
  ${media.main} {
    height: 48px;
  }
`;

const Items = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  align-items: center;
  
  ${media.main} {
    width: auto;
    flex-direction: row-reverse;
  }
`;

const UserDiv = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  ${media.main} {
    flex-direction: row-reverse;
    &:hover {
      cursor: pointer;
      background-color: var(--purple-400);
    }
  }
`;

const Profile = styled.div<{ profileUrl?: string }>`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-left: 24px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${props => (props.profileUrl ? css`
    background-image: url(${props.profileUrl});
  ` : css`
    background-image: url(/icons/icon-avatar.svg);
  `)};
  ${media.main} {
    width: 32px;
    height: 32px;
  }
`;

const Info = styled.div`
  ${mixins.flexColumn};
  justify-content: center;
`;

const Nickname = styled.div`
  ${fonts.demi};
  white-space: nowrap;
  color: var(--white);
  ${mediaMax.main} {
    ${fonts.midBig};
    ${fonts.heavy};
  }
  ${media.main} {
    ${fonts.normal};
    ${fonts.heavy};
  }
`;

const UserId = styled.div`
  ${fonts.small};
  color: #ffffff;
  ${media.main} {
    display: none;
  }
  word-break: break-all;
`;

const UserDetail = styled.div`
  display: flex;
  ${Profile} {
    width: 32px;
    height: 32px;
    margin-left: 0;
    margin-right: 16px;
  }
  ${Nickname} {
    color: var(--navy-900);
    ${demi};
  }
  ${UserId} {
    display: inherit;
    color: var(--navy-600);
    line-height: 1.33;
  }
`;

const MenuDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px 0;
  background-color: var(--navy-100);
`;

const Divider = styled.div`
  display: none;
  ${media.main} {
    display: inherit;
    width: 1px;
    height: 20px;
    margin: 0 8px;
    background-color: var(--purple-400);
  }
`;

const HeaderButtons = styled.div`
  ${mixins.flexCenter};
  margin-left: auto;
  margin-right: 14px;
  ${media.main} {
    margin-left: 14px;
    margin-right: 0;
  }
`;

const SettingsButton = styled.div`
  width: 48px;
  height: 48px;
  cursor: pointer;
  position: relative;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 4px;
  background-image: url(/icons/ic-settings.svg);
  background-repeat: no-repeat;
  background-position: center;
  
  &:hover {
    background-color: var(--purple-400);
  }
`;

const CloseButton = styled.div`
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: block;
  margin: 0 2px;
  border-radius: 4px;
  background-image: url(/icons/ic-close-24.svg);
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-color: var(--purple-400);
  }
  ${media.main} {
    display: none;
  }
`;

const HeaderLogo = styled.div`
  display: none;
  width: 108px;
  height: 24px;
  margin-left: 16px;
  
  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;
  }
  ${media.main} {
    display: block;
  }
`;

interface HeaderProps { }
const Header = () => {
  const sbCalls = useSbCalls();
  const { isWidget } = useTheme();
  const history = useHistory();
  const { user } = sbCalls;
  let userDto = {};

  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(false);

  function setCookie(cname: string, cvalue: string, exMinutes: number) {
    var d = new Date();
    d.setTime(d.getTime() + (exMinutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  // const fetchUsers = (func: any) => {
  //   // Where we're fetching data from
  //   return fetch("http://localhost:8080/user/user1/get-profile")
  //     // We get the API response and receive data in JSON format
  //     .then((response) => response.json())
  //     .then((data) => {
  //       func(data);
  //     })
  //     .catch((error) => console.error(error));
  // }

  useEffect(() => {
    UserRequest.getProfile(BaseFunction.getCookie('username'), function (data: any) {
      UserRequest.userDto = data;
      document.getElementById('nick-name2')!.innerText = data.fullName;
    });

  }, []);

  return (
    <Wrapper>
      <HeaderLogo />
      <Items>
        <Menu
          items={[
            {
              label: 'User Detail',
              element: (
                <UserDetail>
                  <Profile profileUrl={user?.profileUrl} />
                  <Info>
                    <Nickname id="nick-name1">{UserRequest.userDto.fullName}</Nickname>
                    <UserId>User ID: {user?.userId || ''}</UserId>
                  </Info>
                </UserDetail>
              ),
              disabled: true,
            },
            {
              label: 'Profile',
              handleClick: () => {
                window.location.href = 'http://localhost:8080/profile.html';
              },
            },
            {
              label: 'Room management',
              handleClick: () => {
                window.location.href = '/list-room';
              },
            },
            {
              label: 'Sign out',
              handleClick: () => {
                BaseFunction.setCookie('username', 'null', 1);
                BaseFunction.setCookie('token', 'null', 1);
                sbCalls.deauth();
              },
            },
          ]}
          Dropdown={
            props => (
              <UserDiv {...props}>
                <Profile profileUrl={user?.profileUrl} />
                <Info>
                  <Nickname id="nick-name2">{UserRequest.userDto.fullName || '-'}</Nickname>
                  <UserId>User ID: {user?.userId || ''}</UserId>
                </Info>
              </UserDiv>
            )
          }
          Divider={MenuDivider}
          disabled={isWidget}
        />

        <Divider />

        <HeaderButtons>
          <Menu
            items={[
              {
                label: 'Device settings',
                handleClick: () => { setShowDeviceSettings(true); },
              },
              {
                label: 'Sign out',
                handleClick: () => {
                  BaseFunction.setCookie('username', 'null', 1);
                  BaseFunction.setCookie('token', 'null', 1);
                  sbCalls.deauth();
                },
              },
            ]}
            Dropdown={SettingsButton}
          />
          {isWidget && <CloseButton onClick={() => document.getElementById('widget-close-btn')?.click()} />}
        </HeaderButtons>
      </Items>
      <DeviceSettings
        isOpen={showDeviceSettings}
        close={() => setShowDeviceSettings(false)}
      />
      <ApplicationInformation isOpen={showAppInfo} close={() => setShowAppInfo(false)} />
    </Wrapper>


  );
};

export default Header;
