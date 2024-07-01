import style from './BanWordForm.module.css'

export default function BanWordForm({
  inputChangeHandler,
  addBanWordBtnClickedHandler
}) {
  return (
    <>
      <form className={`${style.add_form} mt-3`}>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <input type="text" className="form-control input-sm" aria-describedby="passwordHelpInline" onChange={(e) => inputChangeHandler(e)} />
          </div>
          <div className="col-auto">
            <button className='btn btn-primary btn-sm' type='button' onClick={(e) => addBanWordBtnClickedHandler(e)}>추가</button>
          </div>
        </div>
      </form>
    </>
  )
}