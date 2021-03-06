import React from "react";
import styled from "styled-components";
import styles from "../css/Newnews.module.css";


const PageUl = styled.ul`
justify-content : center; 
  float: center;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
//   border-top: 3px solid #186ead;
//   border-bottom: 3px solid #186ead;
//   background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`

  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 50px;
  
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
    
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
    
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <nav className={styles.pagination}>
                <PageUl>
                    {pageNumbers.map((number) => (
                        <PageLi key={number} className="page-item">
                            <PageSpan onClick={() => paginate(number)} className="page-link">
                                {number}
                            </PageSpan>
                        </PageLi>
                    ))}
                </PageUl>
            </nav>
        </div>
    );
};

export default Pagination;