import React, { useContext } from 'react';
import { DataContext, DetailContext, SignUpContext } from '../App';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const { data, setData } = useContext(DataContext);
  const { detailData } = useContext(DetailContext);
  const { name } = useContext(SignUpContext);

  const { title, category, price, img, desc, writer } = detailData;
  const navigate = useNavigate();

  const onDetailEdit = () => {
    navigate('/write');
  };

  const onDetailDelete = () => {
    const result = confirm('정말 삭제하시겠습니까?');
    if (result) {
      alert('삭제가 완료되었습니다.');
      data.pop();
      setData([...data]);
      navigate('/');
    }
  };

  return (
    <DetailContainer>
      <img src={img} alt={title} />
      <div>
        <h1>{title}</h1>
        <span>{writer}</span>
        <span>{category}</span>
        <span>{price}원</span>
        <p>{desc}</p>
      </div>
      {writer === name && (
        <div>
          <button onClick={onDetailEdit}>수정</button>
          <button onClick={onDetailDelete}>삭제</button>
        </div>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  margin-top: 200px;
`;

export default DetailPage;
