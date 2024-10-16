import React from "react";
import '../Styles/NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJfJxNICWwEhfVHlndd6JiMBFldjRXChU2q1znmqBP_q2Pdaptgm8fBnJhqbjceOLCVq8AWWMjJ-QAiRhtbCS-GhjF9EYCMmCjhi661-Tn3o82HSQ6rSz01WBtZbxS52i4GnBikKWIHjeNvVYn3wbUXP5aHxA8F8oypgWKq1uaTK1N6zCCUrNfDOW3kJRu/s1280/notfound-Photoroom.png" alt="" srcset="" />
      <h2 >404 - Page Not Found</h2>
      <p >Sorry, the page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
