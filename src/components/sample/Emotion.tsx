/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = {
  loginButton: css`
    border: solid 1px;
    margin: 10px;
    background-color: gray;
  `,
};

const EmotionPage = () => {
  return (
    <>
      <button
        css={css`
          border: solid 1px;
          margin: 10px;
          background-color: yellow;
        `}
      >
        Login1
      </button>
      <button css={styles.loginButton}>Login2</button>
    </>
  );
};

export default EmotionPage;
