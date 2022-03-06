import React from 'react';
import DashLayout from '../../../components/layout/layout';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';

const CarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 30px;
  background: #ececec;
`;

export default function ManagerPage() {

  return (
    <DashLayout>
      <CarContainer>
        <Row gutter= {8}>
          <Col span={11}>
            <Card title="Student Overview" bordered={true} style={{ borderRadius: 5, cursor: 'pointer' }}>
              Card content
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Course Overview" bordered={true} style={{ borderRadius: 5, cursor: 'pointer' }}>
              Card content
            </Card>
          </Col>
        </Row>
      </CarContainer>
    </DashLayout>
  )
}
