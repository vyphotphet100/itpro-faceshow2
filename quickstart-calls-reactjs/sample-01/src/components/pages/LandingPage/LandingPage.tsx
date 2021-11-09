import ChoicesTemp from '../../templates/Choices';
import styled from 'styled-components';
import * as mixins from 'styles/mixins';

const Wrapper = styled.div`
  ${mixins.fullScreen};
  ${mixins.bgWhite};
  padding: 33px;
`;

const Logo = styled.img`
  display: block;
  width: 122px;
  height: 27px;
`;

const LandingPage = () => {

  // inject
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

  function main() {
    document.title = 'FaceShow';
    if (getCookie('token') == null ||
      getCookie('token') == 'null' ||
      getCookie('token').trim() == '') {
      window.location.href = 'http://localhost:8080/signin.html';
    }
    else {
      window.location.href = '/group-call';
    }
  }
  main();



  return (
    <Wrapper>
      {/* <Logo
        src="/icons/ic-logo-horizontal.svg"
        alt="Sendbird horizontal logo svg icon"
      /> */}
      <ChoicesTemp
        title="FaceShow"
        desc="Choose the call type you want to use."
        choices={[{
          to: 'direct-call',
          title: 'Direct Call',
          icon: '/icons/ic-direct-call-filled.svg',
          desc: 'Using a web application, make 1-to-1 voice and video calls on a full-screen or a widget.'
        }, {
          to: 'group-call',
          title: 'Group Call',
          icon: '/icons/ic-group-call-filled.svg',
          desc: 'In Rooms, multiple users can come in to participate in group calls. '
        }]}
      />
    </Wrapper>


  );
}

export default LandingPage;
