import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  header: css`
    border-bottom: 1px solid rgba(67, 134, 30, 0.2) !important;
    padding: 12px 24px;
    height: 67px;
  `,
  sider: css`
    border-right: 1px solid rgba(67, 134, 30, 0.2) !important;
  `,
  id: css`
    color: ${token.colorPrimary} ;
    font-size: 16px;
    font-weight: 500;
  `,
  content: css`
    height: 100vh;
    overflow: auto;
  `
}));
