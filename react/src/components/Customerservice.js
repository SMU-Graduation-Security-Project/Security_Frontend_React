import Table from "react-bootstrap/Table";
import styles from "../css/Customerservice.module.css";
// import Pagination from "react-bootstrap/Pagination";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "./pagination";
import Axios from "axios";

const Customerservice = () => {
  const navigate = useNavigate();
  const onClickTitle = (params, e) => {
    // console.log(params);
    e.preventDefault();
    navigate("/customerservice_detail", {
      state: [{ params: params }],
    });
    // console.log();
  };
  const [info, setInfo] = useState([]);
  const [posts, setPosts] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(14);

  useEffect(() => {
    Axios.get(
      "/api/v1/user/cont/counsels",
      // { params: { userId: sessionStorage.getItem('loginId') } }
      {
        params: { loginId: sessionStorage.getItem("loginId") },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Authorization-refresh": localStorage.getItem("jwtRefreshToken"),
        },
      }
    )
      .then((res) => setInfo(res.data.data))
      // .then(res => console.log(res.data.data))
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const Tr = ({ info }) => {
    // let infoReverse = info.slice(0).reverse()
    return (
      <tbody>
        {info.map((item, idx) => {
          // console.log(item)
          return <Td key={item.id} idx={idx} item={item} />;
        })}
      </tbody>
    );
  };

  const Td = ({ item, idx }) => {
    return (
      <>
        <tr>
          <td className={styles.index}>{idx + 1}</td>
          <td className={styles.title}>
            <Link
              to="/customerservice_detail"
              onClick={(e) => {
                onClickTitle(item.id, e);
              }}
            >
              {item.title}
            </Link>
          </td>
          <td className={styles.date}>{item.createDate.substr(0, 10)}</td>
        </tr>
      </>
    );
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <Tr info={currentPosts(info.slice(0))}></Tr>
      </Table>
      <Row>
        <Col lg={12}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={info.length}
            paginate={setCurrentPage}
          ></Pagination>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Button className={styles.write_style} variant="secondary" size="lg">
            <Link to="/qa">글쓰기</Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Customerservice;
