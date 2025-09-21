import {Button, Divider, Flex, Input, Table, TableProps, Space} from "antd";
import {useEffect, useState} from "react";
import {useStyles} from "./styles";
import {TAlarm} from "../list/ListPage";
import {Banner} from "../../components/banner/Banner";
import axios from "axios";
import {DeleteOutlined} from "@ant-design/icons";

type TSubscription = {
    id: number;
    code:string
}

export const SubscriptionsPage = () => {
    const {styles }= useStyles()
    const [listData,setListData] = useState<TSubscription[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [id, setId] = useState<string>('')

    const getData = async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/subscribers/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get'
        })
        if('data' in response) {
            setListData(response.data);
        }

        setIsLoading(false);
    }

    const onSubmit = async () => {
        setIsLoading(true);
        const response = await axios.post(`http://localhost:8000/api/subscribers/`, {
            user_uuid: id
        })
        if('data' in response) {
            getData()
        }

        setIsLoading(false);
    }

    const onDelete = async (id: any) => {
        setIsLoading(true);
        const response = await axios.delete(`http://localhost:8000/api/subscribers/${id}/`, )
        if('data' in response) {
            getData()
        }

        setIsLoading(false);
    }

    useEffect(() => {
        getData()
    }, []);

    const columns: TableProps<TAlarm>['columns'] = [

        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
        },
        {
            title: 'ID Пользователя',
            dataIndex: 'code',
            key: 'code',
            width: '80%',
        },
        {
            title: '',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            render: (_,item) =>
                <Flex justify="center" align="center">
                    <Button color={'danger'} variant={'filled'} icon={<DeleteOutlined />} onClick={() =>onDelete(item.codemap.svg
                    ) }  />
                </Flex>
        },
    ]


    return <Flex className={styles.layout} vertical gap={32}>
        <Banner title={'Активные соединения'}/>
        <Flex vertical gap={12}>
            <Flex>
                <Space.Compact style={{ width: '100%' }}>
                    <Input value={id} onChange={(e)=>setId(e.target.value)} placeholder={'id пользователя'} />
                    <Button onClick={onSubmit} type="primary">Добавить</Button>
                </Space.Compact>
            </Flex>
                <Table<TSubscription[]> pagination={false} scroll={{y: 'max-content'}} rowKey="id"  loading={isLoading}
                               dataSource={listData} columns={columns}/>
        </Flex>
    </Flex>;
}