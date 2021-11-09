import { ErrorMessage } from 'components/atoms/Toast';
import { useEffect } from 'react';
import { useLocation } from 'react-use';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Input, { useTextInput } from 'components/atoms/Input';
import { useSbCalls } from 'lib/sendbird-calls';
import { SoundType } from 'sendbird-calls';
import type { AuthOption } from 'sendbird-calls';
import { toast } from 'react-toastify';
import storage from 'lib/storage';
import * as fonts from 'styles/fonts';

import { media } from 'utils';

const FormContainer = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  background-color: var(--white);
  
  ${Input} {
    margin-bottom: 16px;
  }
  
  ${media.main} {
    max-width: 500px;
    border: solid 1px #dee2f2;
    border-radius: 4px;
    padding: 0 48px;
  }
`;

const InputLabel = styled.label`
  ${fonts.small};
  ${fonts.heavy};
  height: 12px;
  display: inline-block;
  margin-top: 6px;
  margin-bottom: 6px;
  &:first-of-type {
    margin-top: 38px;
  }
`;

const LoginButton = styled(Button)`
  ${fonts.normal};
  ${fonts.demi};
  color: var(--white);
  width: 100%;
  margin-bottom: 40px;
`;

interface LoginFormProps { }
const LoginForm = (props: LoginFormProps) => {

  // INJECT
  function getCookie(cname: string) {
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


  const sbCalls = useSbCalls();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  let authArgs: any = {};
  const authQuery = query.get('q');
  if (authQuery) {
    try {
      authArgs = JSON.parse(atob(authQuery));
    } catch (e) { }
  }

  const stored = storage.getItem('sbCalls');

  //const APP_ID = authArgs.app_id || stored?.appId || process.env.REACT_APP_APP_ID || '' || '5041B796-B367-4769-B2AF-7D707AA84233';
  //const USER_ID = authArgs.user_id || stored?.userId || process.env.REACT_APP_USER_ID || '';
  const APP_ID = '5041B796-B367-4769-B2AF-7D707AA84233';
  const USER_ID = getCookie('username');
  const ACCESS_TOKEN = authArgs.access_token || stored?.accessToken || process.env.REACT_APP_ACCESS_TOKEN || '';
  const IS_ACCESS_TOKEN_NEEDED = process.env.REACT_APP_IS_ACCESS_TOKEN_NEEDED === 'true';
  const ROOM_ID = authArgs.room_id || '';

  const [appId, appIdInput] = useTextInput({ id: 'appIdInput', initValue: APP_ID });
  const [userId, userIdInput] = useTextInput({ id: 'userIdInput', initValue: USER_ID });
  const [accessToken, accessTokenInput] = useTextInput({ id: 'accessTokenInput', initValue: ACCESS_TOKEN });

  const login = () => {
    const option: AuthOption = { userId };
    if (IS_ACCESS_TOKEN_NEEDED || authArgs.access_token) option.accessToken = accessToken;
    sbCalls.init(appId);
    sbCalls.addDirectCallSound(SoundType.DIALING, '/sounds/Dialing.mp3');
    sbCalls.addDirectCallSound(SoundType.RINGING, '/sounds/Ringing.mp3');
    sbCalls.addDirectCallSound(SoundType.RECONNECTING, '/sounds/Reconnecting.mp3');
    sbCalls.addDirectCallSound(SoundType.RECONNECTED, '/sounds/Reconnected.mp3');

    return sbCalls.auth(option)
      .then(user => {
        storage.setItem('sbCalls', { appId, userId });
        history.push(`${query.get('referrer') ? query.get('referrer') + `?room_id=${ROOM_ID}` : '/'}`);
      })
      .catch(error => {
        toast.error(<ErrorMessage message={`Check entered information and try again.`} />, { autoClose: 2000 });
      })
  }

  useEffect(() => {
    //if (authArgs.app_id) login();
    document.title = "FaceShow";
    if (USER_ID == 'null') {
      window.location.href = 'http://localhost:8080/signin.html';
    } else
      login();
  }, [])

  return (
    <FormContainer>
      {/* <InputLabel htmlFor="appIdInput">App ID</InputLabel> */}
      {/* {appIdInput} */}
      {/* <InputLabel htmlFor="userIdInput">User ID</InputLabel> */}
      {/* {userIdInput} */}
      {
        IS_ACCESS_TOKEN_NEEDED
        && (
          <>
            <InputLabel htmlFor="accessTokenInput">Access Token</InputLabel>
            {accessTokenInput}
          </>
        )
      }
      {/* <LoginButton
        id="testID"
        primary
        size="mid"
        onClick={() => login()}
      >
        Sign in
      </LoginButton> */}
    </FormContainer>
  );
};

export default LoginForm;
