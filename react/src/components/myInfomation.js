import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/myInfomation.module.css';
import React, { useEffect } from 'react';
import Axios from 'axios';



function MyInfomation() {

    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [info, setInfo] = React.useState([]);
    const [info2, setInfo2] = React.useState([]);
    const [info3, setInfo3] = React.useState([]);

    useEffect(() => {
        Axios.get('/users/',
            { params: { loginId: sessionStorage.getItem('loginId') } }
        )
            .then(res => {
                setId(res.data.data.loginId)
                setName(res.data.data.name)
                setAge(res.data.data.age)
                setGender(res.data.data.sex)
                setEmail(res.data.data.email)
                setPhoneNumber(res.data.data.phoneNumber)
            }
            )
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        Axios.get('/users/accounts/inquiry',
            { params: { userId: sessionStorage.getItem('loginId') } }
        )
            .then(res => setInfo(res.data.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        Axios.get('/users/card/cardlist',
            { params: { loginId: sessionStorage.getItem('loginId') } }
        )
            .then(res => setInfo2(res.data.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        Axios.get('/users/loans/loanlist',
            { params: { loginId: sessionStorage.getItem('loginId') } }
        )
            .then(res => setInfo3(res.data.data))
            .catch(err => console.log(err));
    }, []);

    const Tr = ({ info }) => {
        return (
            <Form.Select className={styles.AccountNumber} aria-label="Default select example">
                <option>????????????</option>
                {
                    info.map((item, idx) => {
                        return (
                            <Td key={item.accountNumber} item={item} />
                        )
                    })
                }
            </Form.Select>
        );
    };

    const Td = ({ item }) => {
        return (
            <>
                <option value={item.accountNumber}>{item.accountNumber}</option>
            </>
        )
    }

    const Tr2 = ({ info }) => {
        return (
            <Form.Select className={styles.CardList} aria-label="Default select example">
                <option>????????????</option>
                {
                    info.map((item, idx) => {
                        return (
                            <Td2 key={item.cardType} item={item} />
                        )
                    })
                }
            </Form.Select>
        );
    };

    const Td2 = ({ item }) => {
        return (
            <>
                <option value={item.cardType}>{item.cardType}</option>
            </>
        )
    }

    const Tr3 = ({ info }) => {
        return (
            <Form.Select className={styles.LoanList} aria-label="Default select example">
                <option>????????????</option>
                {
                    info.map((item, idx) => {
                        return (
                            <Td3 key={item.loanList} item={item} />
                        )
                    })
                }
            </Form.Select>
        );
    };

    const Td3 = ({ item }) => {
        return (
            <>
                <option value={item.loanList}>{item.loanList}</option>
            </>
        )
    }


    return (
        <div className={styles.MyInfomation}>
            <Container fluid>
                <Row>
                    <Col lg={4}>
                        <h4 className={styles.myInfomation}>???????????? ??????</h4>
                        <h4 className={styles.id}>?????????</h4>
                        <h4 className={styles.name}>??????</h4>
                        <h4 className={styles.age}>??????</h4>
                        <h4 className={styles.gender}>??????</h4>
                        <h4 className={styles.email}>?????????</h4>
                        <h4 className={styles.phoneNumber}>????????????</h4>
                        <h4 className={styles.accountNumber}>????????????</h4>
                        <h4 className={styles.cardList}>????????????</h4>
                        <h4 className={styles.loanList}>????????????</h4>
                    </Col>
                    <Col lg={8}>
                        <h4 className={styles.Id}>{id}</h4>
                        <h4 className={styles.Name}>{name}</h4>
                        <h4 className={styles.Age}>{age}</h4>
                        <h4 className={styles.Gender}>{gender}</h4>
                        <h4 className={styles.Email}>{email}</h4>
                        <h4 className={styles.PhoneNumber}>{phoneNumber}</h4>

                        {/* <Form.Select className={styles.AccountNumber} aria-label="Default select example">
                            <option>????????????</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                        <Form.Select className={styles.CardList} aria-label="Default select example">
                            <option>????????????</option>
                            <option value="1">????????????</option>
                        </Form.Select>
                        <Form.Select className={styles.LoanList} aria-label="Default select example">
                            <option>????????????</option>
                            <option value="1">????????????</option>
                        </Form.Select> */}
                        <Tr info={info} />
                        <div className={styles.readMore}>
                            <Link to="/Bankstatementpage">???????????????</Link>
                        </div>
                        <Tr2 info={info2} />
                        <div className={styles.readMore}>
                            <Link to="/cardlist">???????????????</Link>
                        </div>
                        <Tr3 info={info3} />
                        <div className={styles.readMore}>
                            <Link to="/loanlist">???????????????</Link>
                        </div>

                    </Col>
                    <Button className={styles.checkbutton} variant="primary">
                        <Link to="/">??????</Link>
                    </Button>{' '}
                </Row>
            </Container>
        </div>
    );
}

export default MyInfomation;






















