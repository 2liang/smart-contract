import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';

class Common extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { payroll, web3 } = this.props;

        const updateInfo = (error, result) => {
            if (!error) {
                this.getInfo();
            }
        }

        this.addFund = payroll.AddFund(updateInfo);
        this.getPaid = payroll.GetPaid(updateInfo);
        this.addEmployee = payroll.AddEmployee(updateInfo);
        this.updateEmployee = payroll.UpdateEmployee(updateInfo);
        this.removeEmployee = payroll.RemoveEmployee(updateInfo);

        this.getInfo();
    }

    componentWillUnmount() {

        this.addFund.stopWatching();
        this.getPaid.stopWatching();
        this.addEmployee.stopWatching();
        this.updateEmployee.stopWatching();
        this.removeEmployee.stopWatching();
    }

    getInfo = () => {
        const { payroll, web3 } = this.props;
        payroll.getInfo.call().then((result) => {
            this.setState({
                balance: web3.fromWei(result[0].toNumber()),
                runway: result[1].toNumber(),
                employeeCount: result[2].toNumber()
            })
        });
    }

    render() {
        const { balance, runway, employeeCount } = this.state;

        return (
            <div>
                <h2>通用信息</h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="合约金额"> {balance} Ether </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="员工人数"> {employeeCount} </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="可支付次数"> {runway} </Card>
                    </Col>
                </Row>               
            </div>
        )
    }
}

export default Common