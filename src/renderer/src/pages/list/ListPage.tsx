import {Divider, Flex, Segmented, Skeleton, Table, TableProps, Tag, Typography} from "antd";
import {Banner} from "../../components/banner/Banner";
import {useStyles} from "./styles";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

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
    results: TAlarm[]
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
        render: (_,{other_user_grade_humanize}) => (
            <>
                {other_user_grade_humanize &&
                    <Tag color={other_user_grade_humanize.includes('Высокий') ? 'error' :other_user_grade_humanize.includes('Низкий') ? 'success' : other_user_grade_humanize.includes('Средний') ? 'warning' : '' }>{other_user_grade_humanize}</Tag>

                }
            </>
            )
    },
    {
        title: 'Ваша оценка',
        dataIndex: 'grade_humanize',
        key: 'grade_humanize',
        width: '10%',
        render: (_,{grade_humanize}) => (
            <>
                {grade_humanize &&
                    <Tag  color={grade_humanize.includes('Высокий') ? 'error' :grade_humanize.includes('Низкий') ? 'success' : grade_humanize.includes('Средний') ? 'warning' : '' }>{grade_humanize}</Tag>
                }
            </>
        )
    },
]

export const ListPage = () => {
    const {styles} = useStyles();
    const ref = useRef(null);

    const [currentMode, setCurrentMode] = useState('Входящие');
    const [queryData, setQueryData] = useState<TAlarmsResponse>()
    const [listData,setListData] = useState<TAlarm[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState(1);
    const listDataRef = useRef<TAlarm[]>([]);

    useEffect(() => {
        listDataRef.current = listData;
    }, [listData]);

    const getData = async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/alarms/${currentMode ==='Входящие' ? `?page=${1}` : `?alarm_type=personal&page=${1}`}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get'
        })
        if('data' in response) {
            setQueryData({...response.data});
            setListData(response.data.results);
        }

        setIsLoading(false);
    }

    const getNewData = async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/alarms/${currentMode ==='Входящие' ? `?page=${1}&start_time=${listDataRef.current[0].created_at}` : `?alarm_type=personal&page=${1}`}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get'
        })
        if('data' in response) {
            console.log([...response.data.results, ...listDataRef.current]);
            setListData([...response.data.results, ...listDataRef.current]);
        }

        setIsLoading(false);
    }


    const getMoreData = async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/alarms/${currentMode ==='Входящие' ? `?page=${page+1}` : `?alarm_type=personal&page=${page+1}`}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get'
        })

        if('data' in response) {
            setQueryData({...response.data});
            setListData([...listData, ...response.data.results]);
            setPage(page + 1);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setPage(1)
        getData()
    }, [currentMode]);

    useEffect(() => {
        const timeout = setInterval(() => {
            if('current' in listDataRef && listDataRef.current[0].created_at) {
                getNewData()
            }
        },3000)

        return () => clearInterval(timeout)
    }, []);

    return <Flex className={styles.layout} vertical gap={32} id="scrollableDiv">
        <Banner title={'Обнаруженные объекты'}/>
        <Flex vertical gap={12}>
            <Flex>
                <Segmented size={'large'} options={['Входящие', 'Собственные']}
                           onChange={(value) => setCurrentMode(value)} value={currentMode}/>
            </Flex>
            <InfiniteScroll
                dataLength={listData.length}
                next={queryData && queryData.next && getMoreData}
                hasMore={listData.length < 50}
                loader={isLoading &&<Skeleton avatar paragraph={{rows: 3}} active/>}
                endMessage={<Divider plain>Все данные получены 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <Table<TAlarm> pagination={false} scroll={{y: 'max-content'}} rowKey="id" ref={ref} loading={isLoading}
                               dataSource={listData} columns={columns}/>
            </InfiniteScroll>
        </Flex>
    </Flex>;
}