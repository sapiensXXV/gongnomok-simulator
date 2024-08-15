import styled from "./FeedbackBanner.module.css";

export default function FeedbackBanner() {
  return (
    <>
      <main className={styled.container}>
        <span>
          버그, 건의사항은 <a href="https://forms.gle/Wsf2tfZz9xfDJyat8">[링크]</a>로 부탁드립니다  
        </span>
      </main>
    </>
  );
}