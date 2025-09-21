import {FC} from "react";
import {Col, Flex, Row} from "antd";
import {useStyles} from "./styles";
import {Banner} from "../../components/banner/Banner";
import { MapComponent} from "../../components/map/Map";

export const MapPage: FC = () => {
const {styles} = useStyles();

    return <Flex className={styles.layout} vertical gap={32}>
        <Banner title={'Карта'}/>
        <MapComponent />
    </Flex>;
}