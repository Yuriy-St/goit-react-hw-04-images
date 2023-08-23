import { css } from '@emotion/react';
import { color } from 'constants/theme';

export const GlobalStyles = () => {
  return css`
    body {
      height: 100vh;
      color: ${color.grey_800};
      background-color: ${color.grey_100};
    }
  `;
};
