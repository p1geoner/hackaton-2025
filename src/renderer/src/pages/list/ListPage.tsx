import {Flex, Segmented, Table, TableProps} from "antd";
import {Banner} from "../../components/banner/Banner";
import {useStyles} from "./styles";
import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router";
import axios from "axios";

export interface TAlarm {
    id: number
    user_id: number
    speed: number
    magnetic: number
    scatter_area: number
    grade_humanize: string
    other_user_grade_humanize: string | null
    created_at: string
    updated_at: string
}

export interface TAlarmsResponse {
    count: number
    next: string | null
    previous: string | null
    results: Alarm[]
}

const columns: TableProps<TAlarm>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
    },
    {
        title: 'Отправитель',
        dataIndex: 'user_id',
        key: 'user_id',
        width: '10%',
    },
    {
        title: 'Скорость (км/ч)',
        dataIndex: 'speed',
        key: 'speed',
        width: '10%',
    },
    {
        title: 'ЭПР (кв.м)',
        dataIndex: 'scatter_area',
        key: 'scatter_area',
        width: '10%',
    },
    {
        title: 'Магнитное поле (нТл)',
        dataIndex: 'magnetic',
        key: 'magnetic',
        width: '10%',
    },
    {
        title: 'Оценка отправителя',
        dataIndex: 'other_user_grade_humanize',
        key: 'other_user_grade_humanize',
        width: '10%',
    },
    {
        title: 'Ваша оценка',
        dataIndex: 'grade_humanize',
        key: 'grade_humanize',
        width: '10%',
    },
]

export const ListPage = () => {
    const {styles} = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentMode, setCurrentMode] = useState('Входящие');
    const [queryData, setQueryData] = useState()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const data = [
        {
            id: 4,
            speed: 353,
            magnetic: 1,
            scatter_area: 4698,
            grade_humanize: "168451% - Опасно",
            other_user_grade_humanize: null,
            created_at: "2025-09-21T00:51:41.760636+03:00",
            updated_at: "2025-09-21T00:51:41.760640+03:00"
        },
        {
            id: 4,
            speed: 353,
            magnetic: 1,
            scatter_area: 4698,
            grade_humanize: "168451% - Опасно",
            other_user_grade_humanize: null,
            created_at: "2025-09-21T00:51:41.760636+03:00",
            updated_at: "2025-09-21T00:51:41.760640+03:00"
        },
        {
            id: 4,
            speed: 353,
            magnetic: 1,
            scatter_area: 4698,
            grade_humanize: "168451% - Опасно",
            other_user_grade_humanize: null,
            created_at: "2025-09-21T00:51:41.760636+03:00",
            updated_at: "2025-09-21T00:51:41.760640+03:00"
        }
    ]

    const getData = () => {
        setIsLoading(true);
        const response = axios.get(`http://localhost:8000/api/alarms/${currentMode ==='Входящие' ? '' : '?alarm_type=personal'}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get'
        })
        if('data' in response) {
            console.log(response.data)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setSearchParams(currentMode ==='Входящие' ? '' : '?alarm_type=personal')
        getData()
    }, [currentMode]);

    useEffect(() => {
        setCurrentMode(searchParams.get('alarm_type') ? 'Собственные' : 'Входящие')
    }, [searchParams]);

    return <Flex className={styles.layout} vertical gap={32}>
        <Banner title={'Обнаруженные объекты'} />
        <Flex vertical gap={12}>
            <Flex>
                <Segmented size={'large'} options={['Входящие','Собственные']} onChange={(value)=> setCurrentMode(value)} value={currentMode} />
            </Flex>
            <Table<TAlarm> loading={isLoading} dataSource={data} columns={columns} /><></>
        </Flex>
    </Flex>
}