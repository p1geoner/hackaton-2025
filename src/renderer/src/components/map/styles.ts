import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  red: css`
    width: 20px;
    height: 20px;
    path {
      fill: red;
      
    }
  `,
  orange: css`
    width: 15px;
    height: 15px;
    path {
      fill: orange;
    }
  `,
  green: css`
    width: 15px;
    height: 15px;
    path {
      fill: green;
    }
  `
}));
