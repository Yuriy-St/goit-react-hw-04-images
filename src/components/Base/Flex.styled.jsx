import { css } from '@emotion/react';

export const flexCent = css`
  align-items: center;
  label: flexCent;
  justify-content: center;
`;

export const flexCol = css`
  label: flexCol;
  display: flex;
  flex-direction: column;
`;

export const flexColCent = css`
  ${flexCent}
  label: flexColCent;
  flex-direction: column;
`;
