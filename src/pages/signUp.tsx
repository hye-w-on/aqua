import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sessionApi from '../rest-api/session';
import Input from '../components/Input';
import ProfileImg from '../components/ProfileImg';
import { MemberProfile } from '../models/Member';

const SignUp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [memberProfile, setMemberProfile] = useState<MemberProfile>({
    socialPlatform: '',
    socialAccessToken: '',
    email: '',
    nickname: '',
    profileImageUrl: '',
    selfIntroduction: '',
    birthday: '',
    gender: '',
  });

  const handleSignUp = async () => {
    const response = await sessionApi.socialSignUp(memberProfile);
    if (response.successOrNot === 'Y') {
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (state) {
      setMemberProfile(state);
    }
  }, [state]);

  return (
    <div>
      회원가입
      {memberProfile.profileImageUrl && <ProfileImg src={memberProfile.profileImageUrl} />}
      <Input
        placeholder="Email"
        value={memberProfile.email ?? ''}
        onChange={(e) => setMemberProfile({ ...memberProfile, email: e.target.value })}
      />
      <Input
        placeholder="닉네임"
        value={memberProfile.nickname ?? ''}
        onChange={(e) => setMemberProfile({ ...memberProfile, nickname: e.target.value })}
      />
      <Input
        placeholder="자기소개"
        value={memberProfile.selfIntroduction ?? ''}
        onChange={(e) =>
          setMemberProfile({
            ...memberProfile,
            selfIntroduction: e.target.value,
          })
        }
      />
      <Input
        placeholder="생일"
        value={memberProfile.birthday ?? ''}
        onChange={(e) => setMemberProfile({ ...memberProfile, birthday: e.target.value })}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
