import React from 'react';
import { Row, Col, Result } from 'antd';

/**
 * ErrorResult Component
 * This component displays an error message using Ant Design's Result component.
 * 
 * @returns - The rendered error result component.
 */
const ErrorResult = ({ error }) => {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col>
                <Result
                    status="error"
                    title="Error"
                    subTitle={`Sorry, something went wrong. Error: ${error}`}
                />
            </Col>
        </Row>
    )
}

export default ErrorResult