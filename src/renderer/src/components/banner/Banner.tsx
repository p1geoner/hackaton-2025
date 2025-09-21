import {useStyles} from "./styles";
import {Typography} from "antd";


const {Title} = Typography
export const Banner = ({title}:{title: string}) => {
    const {styles } = useStyles()
    return <div className={styles.wrapper}>
        <Title level={2}>{title}</Title>
    </div>
}