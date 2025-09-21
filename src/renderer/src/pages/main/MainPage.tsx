import { Button, Flex, Layout, Typography } from 'antd'
import { useWindowSize } from '../../hooks/useWindow'
import { useState, useEffect, useMemo } from 'react'
import ImgIntro from '../../assets/intro.png'
import ImgLogo from '../../assets/logo.png'
import { Link } from 'react-router'

const { Title, Text } = Typography

export const MainPage = () => {
  const { width, height } = useWindowSize()
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey(prev => prev + 1)
  }, [width, height])

  const deviceType = useMemo(() => {
    if (width < 768) return 'mobile'
    if (width >= 768 && width < 1024) return 'tablet'
    return 'desktop'
  }, [width])

  const isMobile = deviceType === 'mobile'
  const isTablet = deviceType === 'tablet'
  const isDesktop = deviceType === 'desktop'

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electron) {
      window.electron?.resize?.()
    }
  }, [width, height])

  return (
    <Layout style={{
      minHeight: '100vh',
      maxHeight: '100vh',
      overflow: 'hidden'
    }}>
      <Layout.Content style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>
        <Flex
          key={key}
          vertical
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            transition: 'all 0.1s ease'
          }}
        >
          <div style={{
            padding: isMobile ? '16px' : '20px 40px',
            width: '100%',
            boxSizing: 'border-box',
            flexShrink: 0
          }}>
            <img
              src={ImgLogo}
              alt="Logo"
              style={{
                height: isMobile ? '32px' : '40px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          </div>

          <Flex
            vertical={!isDesktop}
            flex={1}
            justify="center"
            align="center"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding:  '0 24px',
              flex: 1
            }}
          >
            <Flex
              vertical
              align={isMobile ? 'center' : 'flex-start'}
              gap={isMobile ? 32 : 48}
              style={{
                maxWidth: '1200px',
                width: '100%',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              <Flex vertical gap={isMobile ? 20 : 32}>
                <Title
                  level={isMobile ? 3 : 1}
                  style={{
                    fontSize: isMobile ? '24px' : isTablet ? '45px' : '60px',
                    margin: 0,
                    lineHeight: isMobile ? '1.2' : '1.1',
                    transition: 'font-size 0.2s ease'
                  }}
                >
                  Быстрое обнаружение{' '} <br/> опасных
                  <span style={{
                    color: '#ff4d4f',
                  }}>
                    {' '} объектов
                  </span>
                </Title>

                <Text
                  style={{
                    fontSize: isMobile ? '14px' : isTablet ? '22px' : '30px',
                    lineHeight: isMobile ? '1.4' : '1.3',
                    maxWidth: isMobile ? '100%' : '800px',
                    transition: 'font-size 0.2s ease'
                  }}
                >
                  Децентрализованная сеть, которая обеспечит вам безопасность
                </Text>
              </Flex>

              <Flex justify={isMobile ? 'center' : 'flex-start'}>
                <Link to={'/list'}>
                  <Button
                    type={'primary'}
                    size={isMobile ? 'middle' : 'large'}
                    style={{
                      fontSize: isMobile ? '14px' : '18px',
                      height: isMobile ? '40px' : '56px',
                      padding: isMobile ? '0 24px' : '0 40px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Стать участником
                  </Button>
                </Link>

              </Flex>
            </Flex>

            <Flex
              justify="center"
              style={{
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <img
                src={ImgIntro}
                style={{
                  maxWidth: '100%',
                  height: isMobile? '50%' : 'calc(100vh - 86px)',
                  objectFit: 'contain',
                  transition: 'height 0.2s ease'
                }}
                alt="intro"
              />
            </Flex>
          </Flex>
        </Flex>

      </Layout.Content>
    </Layout>
  )
}
