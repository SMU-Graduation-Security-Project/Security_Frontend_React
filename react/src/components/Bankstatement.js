import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "../css/Bankstatement.module.css";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Bankstatement = () => {
  const navigate = useNavigate();

  // const [isAccount, setIsAccount] = React.useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [accountNum, setAccountNum] = React.useState("");
  const [name, setName] = React.useState("");
  const [balanceNum, setBalanceNum] = React.useState("");
  const [inquireNum, setInquireNum] = React.useState("");
  const [info, setInfo] = React.useState([]);
  const [info2, setInfo2] = React.useState([]);
  console.log(startDate);
  console.log(endDate);

  let accountNumber;

  const handleAccountNum = (e) => {
    accountNumber = e.target.options[e.target.selectedIndex].value;
    // setAccountNum(e.target.options[e.target.selectedIndex].value)
    // setAccountNum(accountNum)
  };

  let balance;
  let inquireNumber = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  // useEffect(() => {
  // }, [isRender]);

  // useEffect(() => {
  //   if (sessionStorage.getItem('loginId') !== null) {
  //     Axios.get('/users/accounts/inquiry',
  //       // { params: { userId: sessionStorage.getItem('loginId') } }
  //       { params: { userId: sessionStorage.getItem('loginId') } }

  //     )
  //       .then(res => {
  //         if (Object.keys(res.data.data).length === 0)
  //           console.log('isAccount ?? :: ', isAccount)
  //         else {
  //           console.log('isAccount ?? :: ', isAccount)
  //           // setAccountNum(res.data.data[0].accountNumber)
  //           // account = res.data.data[0].accountNumber
  //           // balance = res.data.data[0].balance
  //           setIsAccount(true)
  //         }
  //       })
  //       .catch()
  //   }
  // })

  let i;
  let senderAccount;
  let transactionDate;
  let transactionTime;
  let amount;
  let depositAmount;
  let withdrawAmount;
  let infoTest = [];
  let tempInfoTest = [];
  const onClickInquiry = () => {
    setCurrentPage(1);
    setAccountNum(accountNumber);
    // setIsRender(isRender + 1)

    {
      Axios.get(
        "/users/accounts/inquiry",
        // { params: { userId: sessionStorage.getItem('loginId') } }
        { params: { userId: sessionStorage.getItem("loginId") } }
      )
        .then((res) => {
          for (i = 0; i < res.data.data.length; i++) {
            if (accountNumber == res.data.data[i].accountNumber) {
              balance = res.data.data[i].balance;
            }
          }
          setBalanceNum(balance);
        })
        .catch();
    }

    {
      Axios.get("/users/", {
        params: { loginId: sessionStorage.getItem("loginId") },
      })
        .then((res) => {
          setName(res.data.data.name);
        })
        .catch();
    }

    if (
      /*isAccount === true && */ accountNumber !== undefined &&
      accountNumber !== "????????? ??????????????????"
    ) {
      // Axios.get('/users/transactions/' + account,
      // )
      Axios.post("/users/transactions/inquiry", {
        accountNumber: accountNumber,
        endDate: endDate,
        startDate: startDate,
      })
        .then((res) => {
          if (Object.keys(res.data.data).length === 0) {
            console.log("??????????????? ???????????? ????????????.");
            setInquireNum(0);
            tempInfoTest = [];
            setInfo(tempInfoTest);
          } else {
            for (i = 0; i < res.data.data.length; i++) {
              // for (i = 0; i < res.data.data.length - (res.data.data.length-10); i++) {

              // console.log(res.data.data[i].sendMoney)
              // console.log(typeof(res.data.data[i].sendMoney))
              // if (res.data.data[i].sendMoney <= 0){
              //   amount = res.data.data[i].sendMnoney.toString()
              //   console.log(amount)
              // }
              // else{
              //   amount = res.data.data[i].sendMnoney.toString()
              //   console.log(amount)
              // }
              // amount = (res.data.data[i].sendMoney >= 0) ? res.data.data[i].sendMoney : Math.abs(res.data.data[i].sendMoney)
              inquireNumber = inquireNumber + 1;
              transactionDate = res.data.data[i].transactionDate.substring(
                0,
                10
              );
              transactionTime = res.data.data[i].transactionDate.substring(
                11,
                19
              );
              amount = res.data.data[i].sendMoney;

              if (amount >= 0) {
                senderAccount = res.data.data[i].senderAccount;
                depositAmount = amount;
                withdrawAmount = "-";

                // console.log(i + 1 + '?????? ???????????? = ' + ' ????????????:' + transactionDate + ' ????????????' + transactionTime + ' ??????(???):' + withdrawAmount + ' ??????(???)' + depositAmount + ' ??????:' + res.data.data[i].toReceiverMessage
                // )
                infoTest = {
                  id: i + 1,
                  transactionDate: transactionDate,
                  transactionTime: transactionTime,
                  withdrawAmount: withdrawAmount,
                  depositAmount: depositAmount,
                  senderAccount: senderAccount,
                  memo: res.data.data[i].toReceiverMessage,
                };
                tempInfoTest.push(infoTest);

                // .push(transactionDate, transactionTime, withdrawAmount, depositAmount, res.data.data[i].toReceiverMessage)
                // console.log(tempInfoTest)
              } else {
                senderAccount = "-";
                depositAmount = "-";
                withdrawAmount = Math.abs(amount);
                // console.log(i + 1 + '?????? ???????????? = ' + ' ????????????:' + transactionDate + ' ????????????' + transactionTime + ' ??????(???):' + withdrawAmount + ' ??????(???)' + depositAmount + ' ??????:' + res.data.data[i].toSenderMessage
                // )
                infoTest = {
                  id: i + 1,
                  transactionDate: transactionDate,
                  transactionTime: transactionTime,
                  withdrawAmount: withdrawAmount,
                  depositAmount: depositAmount,
                  senderAccount: senderAccount,
                  memo: res.data.data[i].toSenderMessage,
                };
                tempInfoTest.push(infoTest);
              }
              setInfo(tempInfoTest);

              // console.log(i + 1 + '?????? ???????????? = ' + ' ????????????:' + transactionDate + '??????????????????:'
              //   + res.data.data[i].senderAccount + ' ??????????????????:' + res.data.data[i].receiverAccount + ' ????????????:' + res.data.data[i].sendMoney + '???????????? ??????:' + res.data.data[i].toReceiverMessage + '???????????? ??????:' + res.data.data[i].toSenderMessage
              // )
            } // ???????????? ????????? ???????????????, ???????????? - ?????? ?????????

            // console.log(transactionDate)
            // console.log(`${res.data.data[i].sendMoney}`)
            setInquireNum(inquireNumber);

            //???????????????
          }
        })
        .catch();
    } else if (
      /*isAccount === true &&*/ accountNumber === undefined ||
      accountNumber === "????????? ??????????????????"
    )
      alert("??????????????? ??????????????????");
    else document.location.href = "CreateAccountpage";
  };

  const onClickTransfer = () => {
    if (accountNumber === undefined || accountNumber === "????????? ??????????????????")
      alert("??????????????? ??????????????????");
    else {
      console.log(accountNumber);
      navigate("/transfer", { state: accountNumber });
    }
  };

  useEffect(() => {
    Axios.get("/users/accounts/inquiry", {
      params: { userId: sessionStorage.getItem("loginId") },
    })
      .then((res) => setInfo2(res.data.data))
      // .then(res => console.log(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const Tr2 = ({ info }) => {
    return (
      <Form.Select
        className={styles.accountInput}
        aria-label="Default select example"
        onChange={handleAccountNum}
      >
        <option>????????? ??????????????????</option>
        {info.map((item, idx) => {
          return <Td2 key={item.accountNumber} item={item} />;
        })}
      </Form.Select>
    );
  };

  const Td2 = ({ item }) => {
    return (
      <>
        <option value={item.accountNumber}>{item.accountNumber}</option>
      </>
    );
  };

  const Tr = ({ info }) => {
    // let infoReverse = info.slice(0).reverse()
    return (
      <tbody>
        {info.map((item, idx) => {
          return <Td key={item.id} item={item} />;
        })}
      </tbody>
    );
  };

  const Td = ({ item }) => {
    return (
      <>
        <tr>
          <td>{item.transactionDate}</td>
          <td>{item.transactionTime}</td>
          <td>{item.withdrawAmount}</td>
          <td>{item.depositAmount}</td>
          <td>{item.senderAccount}</td>
          <td>{item.memo}</td>
          <td>????????????</td>
        </tr>
      </>
    );
  };

  return (
    <Row>
      <div className={styles.bs_border}>
        <Row>
          <Col>
            <div className={styles.statement_text}>???????????? ??????</div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <ul className={styles.nobullet}>
              <li className={styles.leftalign}>????????????</li>
            </ul>
          </Col>
          <Col lg={9}>
            <ul className={styles.nobullet}>
              <li>?????? ?????????</li>
              <DatePicker
                dateFormat="yyyy??? MM??? dd???"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </ul>
            <ul className={styles.nobullet2}>
              <li>?????? ?????????</li>
              <DatePicker
                dateFormat="yyyy??? MM??? dd???"
                selected={endDate}
                onChange={(date) => setendDate(date)}
              />
            </ul>
          </Col>
        </Row>

        {/* <Row>
          <Col className={styles.bs_search}>
            <ul className={styles.nobullet}>
              <li className={styles.leftalign}>????????????</li>
              <li className={styles.leftalign}>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-1">
                      <Form.Check
                        className={styles.bs_form}
                        inline
                        label="????????????"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        className={styles.bs_form}
                        inline
                        label="????????????"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        className={styles.bs_form}
                        inline
                        label="????????????"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form>
              </li>
            </ul>
          </Col>
        </Row> */}
        <Row>
          <Col lg={3} className={styles.bs_search}>
            <ul className={styles.nobullet}>
              <li className={styles.leftalign}>????????????</li>
            </ul>
          </Col>
          <Col lg={5}>
            {/* <Form.Control className={styles.accountinput} type="text" placeholder="" onChange={handleAccountNum} /> */}
            {/* <Form.Select className={styles.genderinput} aria-label="Default select example">
              <option>????????? ??????????????????.</option>
              <option value="1">??????</option>
              <option value="2">??????</option>
            </Form.Select> */}
            <Tr2 info={info2} />
          </Col>
        </Row>
        <Row>
          <Col lg={5}></Col>
          <Col lg={1}>
            <Button variant="primary" size="lg" onClick={onClickInquiry}>
              <div className={styles.leftalign2}>??????</div>
            </Button>{" "}
          </Col>

          <Col lg={1}>
            <Button variant="primary" size="lg" onClick={onClickTransfer}>
              <div className={styles.leftalign3}>??????</div>
            </Button>{" "}
          </Col>
        </Row>
      </div>

      <Row>
        <Col lg={6}>
          <ul className={styles.nobullet}>
            <li>{inquireNum}?????? ??????????????? ????????????</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <ul className={styles.nobullet}>
            <li>???????????? : {accountNum}</li>
          </ul>
        </Col>
        <Col lg={6}>
          <ul className={styles.nobullet}>
            <li> ????????? : {name} </li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <ul className={styles.nobullet}>
            <li>????????????</li>
          </ul>
        </Col>

        <Col lg={6}>
          <ul className={styles.nobullet}>
            <li>?????? : {balanceNum}???</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>????????????</th>
                <th>????????????</th>
                {/* <th>??????</th> */}
                <th>??????(???)</th>
                <th>??????(???)</th>
                <th>????????? ??????</th>
                {/* <th>??????(????????????)</th> */}
                <th>??????</th>
                {/* <th>??????(???)</th> */}
                <th>?????????</th>
              </tr>
            </thead>
            <Tr info={currentPosts(info.slice(0))}></Tr>
          </Table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={info.length}
            paginate={setCurrentPage}
          ></Pagination>
        </Col>
      </Row>
    </Row>
  );
};

export default Bankstatement;
