import styled from '@emotion/styled';

const StyledImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 60px;
`;

interface ProfileImgProps {
  src?: string;
  ref?: any;
}

const ProfileImg = (props: ProfileImgProps) => {
  const { src, ref, ...rest } = { ...props };

  return (
    <div>
      <StyledImg alt="Profile Image" src={src} ref={ref} {...rest} />
    </div>
  );
};

export default ProfileImg;
