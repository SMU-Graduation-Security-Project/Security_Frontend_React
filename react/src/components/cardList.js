import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/cardList.module.css';
import React, { useEffect } from 'react';
import Axios from 'axios';



function CardList() {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        Axios.get('/users/card/cardlist',
            { params: { loginId: sessionStorage.getItem('loginId') } }
        )
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.CardList}>
            <Container fluid>
                <Row>
                    <Col lg={6}>
                        <h4 className={styles.cardList}>카드 목록</h4>
                        {data.map((data) => (
                            <div className = {styles.cardType}>
                                <div className = {styles.cardName}>{data.cardType}</div>
                                <div className={styles.box}></div>
                            </div>
                        ))}
                        
                    </Col>
                    <Col lg={6}>
                        {data.map((data)=> (
                            <div className = {styles.cardInfo}>
                                <div className = {styles.cardNumber}>카드번호: {data.cardNumber}</div>
                                <div className = {styles.expireDate}>만료날짜: {data.expireDate}</div>
                            </div>
                        ))}

                        
                    </Col>
                    <Button className={styles.checkbutton} variant="primary">
                        <Link to="/myinfo">확인</Link>
                    </Button>{' '}
                </Row>
            </Container>
        </div>
    );
}

export default CardList;






















