import { useState, useContext, useEffect } from 'react';
import WritingInput from '../components/write/WritingInput';
import styled from 'styled-components';
import { DataContext, SignUpContext } from '../App';
import { useNavigate } from 'react-router-dom';

const WritingPage = ({ isEdit, curItem }) => {
  const { data, setData, onEdit } = useContext(DataContext);
  const { name } = useContext(SignUpContext);
  const navigate = useNavigate();
  const [writeInput, setWriteInput] = useState({
    title: '',
    category: '',
    desc: '',
  });
  const [fileImage, setFileImage] = useState('');
  const [price, setPrice] = useState('');
  const [isNotCorrect, setIsNotCorrect] = useState(true);

  useEffect(() => {
    if (
      writeInput.title &&
      writeInput.category &&
      writeInput.desc &&
      fileImage &&
      price
    ) {
      setIsNotCorrect(false);
    } else {
      setIsNotCorrect(true);
    }
  }, [
    writeInput.title,
    writeInput.category,
    writeInput.desc,
    fileImage,
    price,
  ]);

  const onSaveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const onChangeWriteInput = (e) => {
    setWriteInput({
      ...writeInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        !isEdit ? '새 글을 작성하시겠습니까?' : '글을 수정하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        setData([
          ...data,
          {
            id: data[data.length - 1].id + 1,
            title: writeInput.title,
            category: writeInput.category,
            price: price,
            img: fileImage,
            desc: writeInput.desc,
            writer: name,
          },
        ]);
      } else {
        onEdit(
          curItem.id,
          writeInput.title,
          writeInput.category,
          price,
          fileImage,
          writeInput.desc
        );
      }

      navigate('/');
    }
  };

  useEffect(() => {
    if (isEdit) {
      setWriteInput({
        title: curItem.title,
        category: curItem.category,
        desc: curItem.desc,
      });
      setPrice(curItem.price);
      setFileImage(curItem.img);
    }
  }, [isEdit, curItem]);

  const onPriceComma = (e) => {
    e.target.value = String(e.target.value)
      .replace(/[^\d]+/g, '')
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    setPrice(e.target.value);
  };

  return (
    <>
      <WriteContainer>
        {!isEdit ? <h3>내 물건 팔기</h3> : <h3>내 게시글 수정</h3>}
        <hr />
        <WriteForm onSubmit={onSubmit}>
          <WriteImgBox>
            <WritingInput
              title='이미지'
              division='input'
              name='image'
              type='file'
              accept='image/*'
              onChange={onSaveFileImage}
            />
            {fileImage && <WriteImg src={fileImage} />}
          </WriteImgBox>
          <WritingInput
            title='제목'
            division='input'
            name='title'
            type='text'
            placeholder='제목을 입력하세요.'
            onChange={onChangeWriteInput}
            required
            value={writeInput.title}
          />
          <WritingInput
            title='카테고리'
            division='select'
            name='category'
            onChange={onChangeWriteInput}
            required
            value={writeInput.category}
          />
          <WritingInput
            title='가격'
            division='input'
            name='price'
            type='text'
            placeholder='가격을 입력하세요.'
            onChange={onPriceComma}
            required
            value={price}
          />
          <WritingInput
            title='자세한 설명'
            division='textarea'
            name='desc'
            onChange={onChangeWriteInput}
            required
            textarea
            value={writeInput.desc}
          />
          {!isEdit ? (
            <WriteSubmitBtn disabled={isNotCorrect}>작성완료</WriteSubmitBtn>
          ) : (
            <WriteSubmitBtn>수정완료</WriteSubmitBtn>
          )}
        </WriteForm>
      </WriteContainer>
    </>
  );
};

const WriteContainer = styled.div`
  height: 140vh;
  width: 40vw;
  margin: 0 auto;
  margin-top: 170px;
`;

const WriteImgBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteImg = styled.img`
  margin: 30px;
  height: 30%;
  width: 30%;
`;
const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const WriteSubmitBtn = styled.button`
  cursor: pointer;
  margin-top: 30px;
  padding: 14px;
  background-color: #ff8a3d;
  border-radius: 30px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: white;
  :hover {
    background-color: #ff8b3dcf;
  }
  :disabled {
    background-color: lightgray;
  }

  transition: all 0.2s;
`;

export default WritingPage;
