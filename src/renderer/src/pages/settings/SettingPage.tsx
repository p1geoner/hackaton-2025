import { FC, useState, useEffect } from "react";
import {Col, Flex, Row, InputNumber, Button, message, Segmented, Typography} from "antd";
import { useStyles } from "./styles";
import { Banner } from "../../components/banner/Banner";
import axios from "axios";

export interface TSettings {
    id: number;
    speed: number | null;
    speed_weight: number | null;
    magnetic: number | null;
    magnetic_weight: number | null;
    scatter_area: number | null;
    scatter_weight: number | null;
    created_at: string;
    updated_at: string;
}

export const SettingPage: FC = () => {
    const { styles } = useStyles();

    const [currentMode, setCurrentMode] = useState('Выключить');


    const [settings, setSettings] = useState<TSettings>({
        id: 0,
        speed: null,
        speed_weight: null,
        magnetic: null,
        magnetic_weight: null,
        scatter_area: null,
        scatter_weight: null,
        created_at: "",
        updated_at: ""
    });

    const [userSettings, setUserSettings] = useState<TSettings>({})

    const [defaultSettings, setDefaultSettings] = useState<TSettings>({})

    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const fetchDefaultSettings = async () => {
        try {
            setInitialLoading(true);
            const response = await axios.get('http://localhost:8000/api/default_settings/', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if ('data' in response) {
                setDefaultSettings(response.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            message.error('Ошибка загрузки настроек');
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            setInitialLoading(true);
            const response = await axios.get('http://localhost:8000/api/user/settings/', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if ('data' in response) {
                setUserSettings(response.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            message.error('Ошибка загрузки настроек');
        } finally {
            setInitialLoading(false);
        }
    };

    // Сохранение настроек
    const saveSettings = async () => {
        try {
            setLoading(true);
            const response = await axios.put('http://localhost:8000/api/user/settings/', settings, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if ('data' in response) {
                setSettings(response.data);
                message.success('Настройки успешно сохранены');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            message.error('Ошибка сохранения настроек');
        } finally {
            setLoading(false);
        }
    };

    const updateSetting = (field: keyof TSettings, value: number | null) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getUserData = async ()=> {
        const response = await axios.get(`http://localhost:8000/api/user/info/`)
        if('data' in response) {
            setCurrentMode(response.data.ai_analyse_enabled ? 'Включить' : 'Выключить')
        }

    }

    const ChangeAi = async (value: string)=> {
        const response = await axios.patch(`http://localhost:8000/api/user/ai_analyse/`, {
            ai_analyse_enabled: value === 'Включить',
        })
        if('data' in response) {
            setCurrentMode(response.data.ai_analyse_enabled ? 'Включить' : 'Выключить')
        }

    }

    useEffect(() => {
        getUserData()
    }, []);

    useEffect(() => {
        fetchDefaultSettings();
        fetchSettings();
    }, []);

    useEffect(() => {
        setSettings({
            id: userSettings.id,
            speed: userSettings.speed ?? defaultSettings.speed,
            speed_weight: userSettings.speed_weight ?? defaultSettings.speed_weight,
            magnetic: userSettings.magnetic ?? defaultSettings.magnetic,
            magnetic_weight: userSettings.magnetic_weight ?? defaultSettings.magnetic_weight,
            scatter_area: userSettings.scatter_area ?? defaultSettings.scatter_area,
            scatter_weight: userSettings.scatter_weight ?? defaultSettings.scatter_weight,
            created_at: userSettings.created_at ?? defaultSettings.created_at,
            updated_at: userSettings.updated_at ?? defaultSettings.updated_at
        })
    }, [defaultSettings,userSettings]);

    const replaceSettings = async () => {
        setSettings(defaultSettings);
            try {
                setLoading(true);
                const response = await axios.put('http://localhost:8000/api/user/settings/', defaultSettings, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if ('data' in response) {
                    setSettings(response.data);
                    message.success('Настройки успешно сохранены');
                }
            } catch (error) {
                console.error('Error saving settings:', error);
                message.error('Ошибка сохранения настроек');
            } finally {
                setLoading(false);
            }
    }

    if (initialLoading) {
        return (
            <Flex className={styles.layout} vertical gap={32}>
                <Banner title={'Настройки критериев'} />
                <div>Загрузка...</div>
            </Flex>
        );
    }

    return (
        <Flex className={styles.layout} vertical gap={32}>
            <Banner title={'Настройки критериев'} />

            <Flex vertical gap={12}>
                <Typography.Text>Включить AI анализ</Typography.Text>
                <Flex>
                    <Segmented size={'large'} options={['Включить', 'Выключить']}
                               onChange={(value) => {
                                   setCurrentMode(value)
                                   ChangeAi(value)
                               }} value={currentMode}/>

                </Flex>
                </Flex>


            <Row gutter={[16, 16]} align="middle">
                <Col span={6}></Col>
                <Col span={6}>Скорость (км/ч)</Col>
                <Col span={6}>ЭПР (кв.м)</Col>
                <Col span={6}>Магнитное поле (нТл)</Col>

                <Col span={6}>Норма</Col>
                <Col span={6}>
                    <InputNumber
                        disabled={currentMode === 'Включить'}
                        value={settings.speed}
                        onChange={(value) => updateSetting('speed', value)}
                        placeholder="Введите значение"
                        style={{ width: '100%' }}
                        min={0}
                    />
                </Col>
                <Col span={6}>
                    <InputNumber
                        disabled={currentMode === 'Включить'}
                        value={settings.scatter_area}
                        onChange={(value) => updateSetting('scatter_area', value)}
                        placeholder="Введите значение"
                        style={{ width: '100%' }}
                        min={0}
                    />
                </Col>
                <Col span={6}>
                    <InputNumber
                        disabled={currentMode === 'Включить'}
                        value={settings.magnetic}
                        onChange={(value) => updateSetting('magnetic', value)}
                        placeholder="Введите значение"
                        style={{ width: '100%' }}
                        min={0}
                    />
                </Col>

                <Col span={6}>Вес (Важность)</Col>
                <Col span={6}>
                    <InputNumber
                        disabled={currentMode === 'Включить'}
                        value={settings.speed_weight}
                        onChange={(value) => updateSetting('speed_weight', value)}
                        placeholder="Введите вес"
                        style={{ width: '100%' }}
                        min={0}
                        max={100}
                        step={0.1}
                    />
                </Col>
                <Col span={6}>
                    <InputNumber
                        disabled={currentMode === 'Включить'}
                        value={settings.scatter_weight}
                        onChange={(value) => updateSetting('scatter_weight', value)}
                        placeholder="Введите вес"
                        style={{ width: '100%' }}
                        min={0}
                        max={100}
                        step={0.1}
                    />
                </Col>
                <Col span={6}>
                    <InputNumber
                        disabled={currentMode === 'Включить'}
                        value={settings.magnetic_weight}
                        onChange={(value) => updateSetting('magnetic_weight', value)}
                        placeholder="Введите вес"
                        style={{ width: '100%' }}
                        min={0}
                        max={100}
                        step={0.1}
                    />
                </Col>
            </Row>

            <Flex justify="flex-end" gap={8}>
                <Button
                    onClick={replaceSettings}
                    loading={loading}
                    disabled={loading}
                >
                    Сбросить настройки
                </Button>
                <Button
                    type="primary"
                    onClick={saveSettings}
                    loading={loading}
                    disabled={loading}
                >
                    Сохранить настройки
                </Button>
            </Flex>
        </Flex>
    );
};