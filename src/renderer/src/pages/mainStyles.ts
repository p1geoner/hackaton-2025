import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  layout: css`
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
  `,

  header: css`
    width: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
  `,

  logo: css`
    width: auto;
    height: 40px;

    @media (max-width: 768px) {
      height: 32px;
    }
  `,

  content: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
  `
}));
