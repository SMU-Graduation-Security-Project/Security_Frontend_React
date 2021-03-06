import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/signup.module.css';
import React, { useEffect } from 'react';
import Axios from 'axios';

const Signup = () => {

    const [inputId, setInputId] = React.useState("");
    const [inputPw, setInputPw] = React.useState("");
    const [inputConPw, setInputConPw] = React.useState("");
    const [inputName, setInputName] = React.useState("");
    const [inputAge, setInputAge] = React.useState("");
    const [selectGender, setSelectGender] = React.useState("");

    const [inputEmail, setInputEmail] = React.useState("");
    const [selectEmail, setSelectEmail] = React.useState("");
    // const [inputPhonenumber, setInputPhonenumber] = React.useState("");
    const [inputPhonenumber2, setInputPhonenumber2] = React.useState("");
    const [inputPhonenumber3, setInputPhonenumber3] = React.useState("");
    const [selectQuestion, setSelectQuestion] = React.useState('');
    const [inputAnswer, setInputAnswer] = React.useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value)
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    };

    const handleInputConPw = (e) => {
        setInputConPw(e.target.value)
    };

    const handleInputName = (e) => {
        setInputName(e.target.value)
    };

    const handleInputAge = (e) => {
        setInputAge(e.target.value)
    };

    const handleGender = (e) => {
        setSelectGender(e.target.options[e.target.selectedIndex].text)
    };

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value)
    };

    const handleEmail = (e) => {
        setSelectEmail(e.target.options[e.target.selectedIndex].text);
    };

    // const handleInputPhonenumber = (e) => {
    //     setInputPhonenumber(e.target.value)
    // };

    const handleInputPhonenumber2 = (e) => {
        setInputPhonenumber2(e.target.value)
    };

    const handleInputPhonenumber3 = (e) => {
        setInputPhonenumber3(e.target.value)
    };

    const handleQuestion = (e) => {
        setSelectQuestion(e.target.options[e.target.selectedIndex].text);
    };

    const handleInputAnswer = (e) => {
        setInputAnswer(e.target.value)
    };

    // const gender = selectGender === '??????' ? 'M' : 'W';

    const onClickSignup = () => {

        const addPhonenumber = '010'.concat('-', inputPhonenumber2, '-', inputPhonenumber3);
        const addEmail = inputEmail.concat('@', selectEmail);

        let gender
        if (selectGender === '??????')
            gender = 'M'
        else if (selectGender === '??????')
            gender = 'W'
        else
            gender = 'X'
            
        if (inputId.length === 0 || inputPw.length === 0 || inputConPw.length === 0 || inputName.length === 0 || inputAge.length === 0 || addEmail.length === 1 || addPhonenumber.length === 1 ||selectQuestion.length === 0 || inputAnswer.length === 0) {
            alert('??????????????? ????????? ???????????? ????????? ????????????')
            console.log('????????? ????????????')
        }
        //?????? ?????? ??????????????? ??????????????? ????????? ????????? ????????????????

        else if(inputPw !== inputConPw){
            alert('??????????????? ????????????????????? ???????????? ????????????.')
            console.log('????????? ????????????')
        }

        else if(!inputId.match("^[a-zA-Z]{1}[a-zA-Z0-9]{4,11}$")){
            alert('???????????? ????????? ???????????? ????????????')
            console.log('????????? ????????????')
        }
        else if(!inputPw.match("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$")){
            alert('??????????????? ????????? ???????????? ????????????')
            console.log('????????? ????????????')
        }
        else if (gender === 'X'){
            alert('????????? ??????????????????')
            console.log('????????? ????????????')
        }
        else if (inputEmail.length === 0 || selectEmail.length === 0){
            alert('???????????? ?????? ??????????????????')
            console.log('????????? ????????????')
        }
        else if (addPhonenumber.length !== 13){
            alert('??????????????? ?????? ??????????????????')
            console.log('????????? ????????????')
        }

        else
            Axios.post('users/register', {
                "age": inputAge,
                "ansWord": inputAnswer,
                "email": addEmail,
                "loginId": inputId,
                "name": inputName,
                "password1": inputPw,
                "password2": inputConPw,
                "phoneNumber": addPhonenumber,
                "question": selectQuestion,
                "sex": gender
            }
            )
                .then(res => {
                    if (res.data.checker === true) {
                        console.log(res.data.checker, '??????')
                        document.location.href = '/signupcomplete'
                    }
                    else {
                        // console.log(res.data)
                        alert(res.data.message)
                    }
                })

                .catch()
    }

    return (
        <div className={styles.Signup}>
            <Container fluid>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={1}>
                        <h2 className={styles.informationinput}>????????????</h2>
                        <h5 className={styles.id}>?????????</h5>
                        <h5 className={styles.password}>????????????</h5>
                        <h5 className={styles.confirmpassword}>??????????????????</h5>
                        <h5 className={styles.name}>??????</h5>
                        <h5 className={styles.age}>??????</h5>
                        <h5 className={styles.gender}>??????</h5>
                        <h5 className={styles.email}>?????????</h5>
                        <h5 className={styles.phonenumber}>????????????</h5>
                        <h5 className={styles.findpassword}>?????????????????? ?????? / ??????</h5>
                    </Col>
                    <Col lg={4}>

                        <Form.Control className={styles.idinput} type="text" placeholder="" maxLength='12' onChange={handleInputId} />
                        <Form.Text className={styles.idrule} muted>
                            ???????????? ???????????? ???????????? ????????? ???????????? 5~12?????? ??????????????????.
                        </Form.Text>
                        <Form.Control className={styles.passwordinput} type="password" placeholder="" onChange={handleInputPw} />
                        <Form.Text className={styles.pwrule} muted>
                            ?????????, ??????????????? ???????????? 8~20?????? ??????????????????.
                        </Form.Text>
                        <Form.Control className={styles.confirmpasswordinput} type="password" maxLength='20' placeholder="" onChange={handleInputConPw} />
                        <Form.Control className={styles.nameinput} type="text" placeholder="" onChange={handleInputName} />
                        <Form.Control className={styles.ageinput} type="text" maxLength='3' placeholder="" onChange={handleInputAge} />
                        <Form.Select className={styles.genderinput} aria-label="Default select example" onChange={handleGender}>
                            <option>????????? ??????????????????</option>
                            <option value="1">??????</option>
                            <option value="2">??????</option>
                        </Form.Select>
                        {/* <Form className={styles.gendercheckbox} onChange = {handleGender}>
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check className={styles.gendermale}
                                        inline
                                        label="??????"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`
                                        }
                                    />
                                    <Form.Check className={styles.genderfemale}
                                        inline
                                        label="??????"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                </div>
                            ))}
                        </Form> */}
                        <Row>
                            <Col lg={6}>
                                <Form.Control className={styles.emailinput1} type="email" placeholder="" onChange={handleInputEmail} />
                            </Col>
                            <Col lg={1}>
                                <h5 className={styles.emailinput2}>@</h5>
                            </Col>
                            <Col lg={5}>
                                <Form.Select className={styles.emailinput3} aria-label="Default select example" onChange={handleEmail}>
                                    <option>???????????? ??????????????????</option>
                                    <option value="1">naver.com</option>
                                    <option value="2">daum.net</option>
                                    <option value="3">gmail.com</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <Form.Control className={styles.phonenumberinput1} type="tel" placeholder="010" disabled
                                    readOnly />
                            </Col>
                            <Col lg={1}>
                                <h5 className={styles.phonenumberinput2} >-</h5>
                            </Col>
                            <Col lg={3}>
                                <Form.Control className={styles.phonenumberinput3} type="tel" maxLength='4' placeholder="" onChange={handleInputPhonenumber2} />
                            </Col>
                            <Col lg={1}>
                                <h5 className={styles.phonenumberinput4} >-</h5>
                            </Col>
                            <Col lg={3}>
                                <Form.Control className={styles.phonenumberinput5} type="tel" maxLength='4' placeholder="" onChange={handleInputPhonenumber3} />
                            </Col>
                            <Col lg={2}></Col>
                        </Row>
                        <Form.Select className={styles.findpasswordquestion} aria-label="Default select example" onChange={handleQuestion}>
                            <option>????????? ??????????????????</option>
                            <option value="1">???????????????</option>
                            <option value="2">??????2</option>
                            <option value="3">??????3</option>
                        </Form.Select>
                        <Form.Control className={styles.findpasswordanswerinput} type="answer" placeholder="" onChange={handleInputAnswer} />
                        <Button className={styles.signupbutton} variant="primary" size="lg" onClick={onClickSignup}>
                            {/* <Link to="/signupcomplete">????????????</Link> */}
                            ????????????
                        </Button>
                    </Col>
                    <Col lg={4}></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;