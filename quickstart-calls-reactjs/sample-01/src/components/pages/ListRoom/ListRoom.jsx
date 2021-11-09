import SendbirdCalls from 'sendbird-calls';
import styled from 'styled-components';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';
import { media } from 'utils';

import Logo from 'components/atoms/Logo';
import LoginForm from 'components/organisms/LoginForm';
import Screen from 'components/templates/Screen';

import BaseFunction from 'components/organisms/BaseFunction';
import RoomRequest from 'components/organisms/Request/RoomRequest';
import UserRequest from 'components/organisms/Request/UserRequest';

import pack from '../../../../package.json';
import { useEffect } from 'react';

const Wrapper = styled(Screen)`
  width: 100vw;
  height: 100vh;
  ${mixins.flexCenter};
  color: rgb(33, 34, 66);
  background-color: rgb(255, 255, 255);
  ${media.main} {
    background-color: rgb(246, 248, 252);
  }
`;

const Content = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  ${media.main} {
    height: auto;
    margin-top: 134px;
    margin-bottom: auto;
  }
`;

const Title = styled.div`
  ${fonts.big};
  ${fonts.demi};
  margin-bottom: 40px;
`;

const VersionInfo = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  bottom: 24px;
  position: absolute;
  ${media.main} {
    display: none;
  }
`;

const VersionText = styled.div`
  ${fonts.small};
  margin-left: 8px;
  margin-right: 8px;
`;



const ListRoom = () => {
  useEffect(() => {
    UserRequest.setRooms();
  }, [])

  return (
    <Wrapper>
      <div>
        <div class="ListRoom">Room management</div>
        <table class="table__ListRoom">
          <thead>
            <tr>
              <th width="214.8623853211009" class="table__Cell-dhn9jj-7 bTBhlm"><span class="table__ColumnTitle-dhn9jj-0 iLFVMO">Room ID</span></th>
              <th width="214.8623853211009" class="table__Cell-dhn9jj-7 bTBhlm"><span class="table__ColumnTitle-dhn9jj-0 iLFVMO">Created on</span></th>
              <th width="146.1064220183486" class="table__Cell-dhn9jj-7 iubFET"><span class="table__ColumnTitle-dhn9jj-0 iLFVMO"><div class="RoomsTable__Header-sc-7akkds-0 ewMNhw">Action<div data-test-id="TooltipReference" class="TooltipWrapper__TooltipReference-i2o6ss-0 hzUdWP"><div class="TooltipTargetIcon__Wrapper-sc-1lw71nh-0 cLvFoa"></div></div></div></span></th>
            </tr>
          </thead>
          <tbody class="rooms">
            {/* <tr class="room">
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb dYcjxs"><span class="RoomType__RoomTypeWrapper-sc-10p3uka-0 hpnueF"><svg aria-labelledby="id_hhucZWqO-STpqzflccics" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="icon__StyledSvg-v7mmhy-0 eMuYDz icon__Icon-v7mmhy-1 dEyfsA" aria-label="video"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 4h15v5.131l5-4V18.87l-5-4V20H2V4z" clip-rule="evenodd"></path></svg></svg>NameOfRoom</span></td>
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb iFyXnp"><div class="RoomsTable__RoomIdWrapper-sc-7akkds-1 iatsYL"><a href="/C5F210C7-1B3B-4A20-90AE-41D4C33821EA/calls/group-calls/4f363995-5938-41b7-bf23-981ba0dc518d"><span class="bamm">4f363995-5938-41b7-bf23-9810dc518d</span></a></div></td>
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb iFyXnp">Nov 7, 2021 at 1:00 AM</td>
              <td width="146.1064220183486" data-is-last-column="true" class="table__Cell-dhn9jj-7 tb dYcjxs">
                <button class="delete_bt">
                  <img width="15" src="https://iconarchive.com/download/i104176/custom-icon-design/flatastic-9/Save.ico" />
                </button>
                <button class="delete_bt">
                  <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/17/000000/external-delete-miscellaneous-kiranshastry-gradient-kiranshastry.png" />
                </button>
              </td>
            </tr>
            <tr class="room">
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb dYcjxs"><span class="RoomType__RoomTypeWrapper-sc-10p3uka-0 hpnueF"><svg aria-labelledby="id_hhucZWqO-STpqzflccics" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="icon__StyledSvg-v7mmhy-0 eMuYDz icon__Icon-v7mmhy-1 dEyfsA" aria-label="video"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 4h15v5.131l5-4V18.87l-5-4V20H2V4z" clip-rule="evenodd"></path></svg></svg>NameOfRoom</span></td>
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb iFyXnp"><div class="RoomsTable__RoomIdWrapper-sc-7akkds-1 iatsYL"><a href="/C5F210C7-1B3B-4A20-90AE-41D4C33821EA/calls/group-calls/4f363995-5938-41b7-bf23-981ba0dc518d"><span class="bamm">4f363995-5938-41b7-bf23-9810dc518d</span></a></div></td>
              <td width="214.8623853211009" data-is-last-column="false" class="table__Cell-dhn9jj-7 tb iFyXnp">Nov 7, 2021 at 1:00 AM</td>
              <td width="146.1064220183486" data-is-last-column="true" class="table__Cell-dhn9jj-7 tb dYcjxs">
                <button class="delete_bt">
                  <img width="15" src="https://iconarchive.com/download/i104176/custom-icon-design/flatastic-9/Save.ico" />
                </button>
                <button class="delete_bt">
                  <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/17/000000/external-delete-miscellaneous-kiranshastry-gradient-kiranshastry.png" />
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
        <div>
          <button>
            <a href="/group-call/full-screen?room_id=">Home</a>
          </button>
        </div>
      </div>
    </Wrapper>
  )
}
export default ListRoom;
