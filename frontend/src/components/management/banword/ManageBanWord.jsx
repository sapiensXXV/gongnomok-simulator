import { useEffect, useState } from 'react'
import style from './ManageBanWord.module.css'
import axios from 'axios';
import { BASE_URI } from '../../../global/uri';
import BanWordPagination from './BanWordPagination';
import BanWordList from './BanWordList';
import BanWordForm from './BanWordForm';

export default function ManageBanWord() {

  const [banWordData, setBanWordData] = useState([]);
  const [page, setPage] = useState(1);
  const [newWordInput, setNewWordInput] = useState({ word: '' });

  useEffect(() => {
    fetchBanWords();
  }, [])

  function fetchBanWords() {
    axios
      .get(`${BASE_URI}/api/manage/banword?page=${page-1}&size=20`)
      .then((response) => {
        setBanWordData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleNewWordInput(e) {
    e.preventDefault();
    setNewWordInput(e.target.value);

  }

  function addBanWord(e) {
    e.preventDefault();
    axios
      .post(
        `${BASE_URI}/api/manage/banword`,
        { word: newWordInput }
      )
      .then((response) => {
        const copy = { ...banWordData }
        copy.words = [{word: newWordInput}, ...copy.words];
        setBanWordData(copy);
      })
      .catch((error) => {
        console.log(error);
        alert('등록 불가')
      })
  }

  function handlePageClicked(e, clickedPage) {
    e.preventDefault();
    axios
      .get(`${BASE_URI}/api/manage/banword?page=${clickedPage-1}&size=20`)
      .then((response) => {
        const newBanWordData = response.data;
        setBanWordData(newBanWordData);
        setPage(clickedPage);
      })
      .catch((error) => {
        console.log(error)
        alert('불러오기 실패');
      })

  }

  return (
    <>
      <h1 className={style.title}>금칙어 관리 페이지</h1>
      <BanWordForm
        inputChangeHandler={handleNewWordInput}
        addBanWordBtnClickedHandler={addBanWord}
      />
      <BanWordList
        words={banWordData?.words}
      />
      <BanWordPagination
        currentPage={page}
        totalPage={banWordData.totalPage}
        pageClickHandler={handlePageClicked}
      />

    </>
  )
}