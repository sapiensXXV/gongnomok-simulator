import { useEffect, useState } from 'react'
import style from './ManageBanWord.module.css'
import axios from 'axios';
import { BASE_URI } from '../../../global/uri';
import BanWordPagination from './BanWordPagination';

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
        copy.words = [newWordInput, ...copy.words];
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
      <form className={`${style.add_form} mt-3`}>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <input type="text" className="form-control input-sm" aria-describedby="passwordHelpInline" onChange={(e) => handleNewWordInput(e)} />
          </div>
          <div className="col-auto">
            <button className='btn btn-primary btn-sm' type='button' onClick={(e) => addBanWord(e)}>추가</button>
          </div>
        </div>
      </form>

      <div className='row justify-content-center mt-3'>
        <div className='col-auto'>
          <table className={`table table-striped table-hover text-center`}>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>단어</th>
              </tr>
            </thead>
            <tbody>
              {
                banWordData?.words?.map((data) => {
                  return (
                    <tr key={`${data.id}_${data.word}`}>
                      <th scope='col'>{data.id}</th>
                      <td>{data.word}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      <BanWordPagination
        currentPage={page}
        totalPage={banWordData.totalPage}
        pageClickHandler={handlePageClicked}
      />

    </>
  )
}