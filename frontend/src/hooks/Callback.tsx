import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      fetch('http://k8a402.p.ssafy.io/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: 'your_client_id',
          client_secret: 'your_client_secret',
          code: code,
          redirect_uri: 'http://k8a402.p.ssafy.io/login/oauth2/code/gitlab',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 액세스 토큰을 처리하는 코드 작성
          console.log(data.access_token);
          navigate('/project'); // 로그인 성공 후 리다이렉트할 경로
        })
        .catch((error) => {
          // 에러 처리하는 코드 작성
          console.error(error);
          navigate('/'); // 로그인 실패 후 리다이렉트할 경로
        });
    }
  }, [location, history]);

  return <div>Loading...</div>; // 로딩 중 화면
}

export default Callback;
