export default function BanWordList({
  words
}) {
  return (
    <>
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
                words?.map((data) => {
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