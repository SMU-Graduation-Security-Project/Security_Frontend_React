import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/selectAccount2.module.css";
import { Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Axios from 'axios';
import Transfer from './transfer';

function SelectAccount2() {

    const [info2, setInfo2] = React.useState([]);
    const navigate = useNavigate();
    let accountNumber
    const [info, setInfo] = React.useState([]);
    // const [interestRate, setInterestRate] = React.useState([]);
    let loanType
    // const [index, setIndex] = React.useState([]);
    let index



    useEffect(() => {
        Axios.get('/users/accounts/inquiry',
            { params: { userId: sessionStorage.getItem('loginId') } }
        )
            .then(res => setInfo2(res.data.data))
            // .then(res => console.log(res.data.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        Axios.get('/users/loanlist')
            .then(res => {
                setInfo(res.data.data)
                // setInterestRate(res.data.data[0].interestRate)
            })
            // .then(res => console.log(res.data.data))
            .catch(err => console.log(err));
    }, []);

    // useEffect(() => {
    //     Axios.get('/users/loanlist/'+index, { params: { id: index } })
    //         .then(res => {
    //             console.log(index)
    //             console.log('test')
    //             // setInfo(res.data.data)
    //             setInterestRate(res.data.data.interestRate)
    //             console.log(interestRate)
    //         })
    //         // .then(res => console.log(res.data.data))
    //         .catch(err => console.log(err));
    // }, [index]);

    const handleAccountNum = (e) => {
        accountNumber = e.target.options[e.target.selectedIndex].value
        // setAccountNum(e.target.options[e.target.selectedIndex].value)
        // setAccountNum(accountNum)
    }

    const handleLoanType = (e) => {
        loanType = e.target.options[e.target.selectedIndex].text
        // setIndex(e.target.options[e.target.selectedIndex].index)    
        index = e.target.options[e.target.selectedIndex].index
        console.log(index)    
    };

    const onClickNext = () => {
        // console.log(accountNumber)
        // console.log(loanType)
        if (accountNumber === undefined || accountNumber === '????????? ??????????????????')
            alert('?????? ????????? ????????? ??????????????????')
        else if (loanType === undefined || loanType === '??????????????? ??????????????????')
            alert('??????????????? ??????????????????')
        else {
            console.log(accountNumber)
            console.log(loanType)
            navigate('/loanapply',
                {
                    state: [
                        {
                            accountNumber: accountNumber,
                            loanType: loanType,
                            // interestRate: interestRate
                        }
                    ]
                }
            )
        }
    }

    const Tr = ({ info }) => {
        return (
            <Form.Select className={styles.loantypeinput} aria-label="Default select example" onChange={handleLoanType}>
                <option>??????????????? ??????????????????</option>
                {
                    info.map((item, idx) => {
                        return (
                            <Td key={item.title} item={item} />
                        )
                    })
                }
            </Form.Select>
        );
    };

    const Td = ({ item }) => {
        return (
            <>
                <option value={item.title}>{item.title}</option>
            </>
        )
    }

    const Tr2 = ({ info }) => {
        return (
            <Form.Select className={styles.accountinput} aria-label="Default select example" onChange={handleAccountNum}>
                <option>????????? ??????????????????</option>
                {
                    info.map((item, idx) => {
                        return (
                            <Td2 key={item.accountNumber} item={item} />
                        )
                    })
                }
            </Form.Select>
        );
    };

    const Td2 = ({ item }) => {
        return (
            <>
                <option value={item.accountNumber}>{item.accountNumber}</option>
            </>
        )
    }

    return (
        <div className={styles.SelectAccount}>
            <Container fluid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={1}>
                        <h2 className={styles.loanapply}>????????????</h2>
                        <h3 className={styles.accountNumber}>????????????</h3>
                        <h3 className={styles.loanType}>????????????</h3>

                    </Col>
                    <Col lg={4}>
                        
                        <Tr2 info={info2} />
                        <Tr info={info} />
                        <Button className={styles.nextbutton} variant="primary" size="lg" onClick={onClickNext}>??????
                        </Button>
                    </Col>
                    <Col lg={4}></Col>

                </Row>
            </Container>
        </div>
    );
}

export default SelectAccount2;
