import { createStyles } from 'antd-style';
import banner from '../../assets/banner.png'
export const useStyles = createStyles(({ css }) => ({
    wrapper: css`
        border-radius: 10px;
        background-image: url(${banner});
        background-size: cover;
        width: 100%;
        height: 100px;
        h2 {
            color: white;
        }
        
        display: flex;
        align-items: center;
        padding: 0 32px;
    `
}));
