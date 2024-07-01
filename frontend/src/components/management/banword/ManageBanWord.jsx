import { useEffect, useState } from 'react'
import style from './ManageBanWord.module.css'
import axios from 'axios';
import { BASE_URI } from '../../../global/uri';

export default function ManageBanWord() {

  const [banWordData, setBanWordData] = useState([]);
  const [page, setPage] = useState(0);
  const [newWordInput, setNewWordInput] = useState({word: ''});

  useEffect(() => {
    fetchBanWords();
  }, [])

  function fetchBanWords() {
    axios
      .get(`${BASE_URI}/api/manage/banword?page=${page}&size=20`)
      .then((response) => {
        console.log(response.data);
        setBanWordData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleNewWordInput(e) {
    e.preventDefault();
    console.log(`단어 추가 input=${e.target.value}`);
    setNewWordInput(e.target.value);
    
  }

  function addBanWord(e) { 
    e.preventDefault();
    console.log(`추가할 단어=${newWordInput}`);
    axios
      .post(
        `${BASE_URI}/api/manage/banword`,
        { word: newWordInput }
      )
      .then((response) => {
        console.log(response);
        const copy = {...banWordData}
        copy.words = [newWordInput, ...copy.words];
        setBanWordData(copy);
      })
      .catch((error) => {
        console.log(error);
        alert('등록 불가')
      })
  }

  return (
    <>
      <h1 className={style.title}>금칙어 관리 페이지</h1>
      <form className={`${style.add_form} mt-3`}>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <input type="text" className="form-control input-sm" aria-describedby="passwordHelpInline" onChange={(e) => handleNewWordInput(e)}/>
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

    </>
  )
}