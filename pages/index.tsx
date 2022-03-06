import type { NextPage } from 'next'
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Header from '../components/home/header';

const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MainContainer = styled.div`

`

const Home: NextPage = () => {
  return (
    <HomeContainer >
      <Header />
      
        <p >
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </p>
      
      </HomeContainer>
  )
}

export default Home
