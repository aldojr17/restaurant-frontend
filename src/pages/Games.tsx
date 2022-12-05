import { FormEvent, useEffect, useState } from "react";
import { fetchQuestion } from "../api/api";
import GameModal from "../components/Modal/GameModal";
import Navbar from "../components/Navbar/Navbar";
import { IQuestionPayload } from "../redux/user/types";
import Title from "./Cart/style";

const Games = () => {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState<IQuestionPayload[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllQuestion = async () => {
    setQuestions(await fetchQuestion());
  };

  const handleNextQuestion = () => {
    setIndex((index) => index + 1);
  };

  const handlePrevQuestion = () => {
    setIndex((index) => index - 1);
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setAnswer({
      ...answer,
      [index]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    console.log(answer);
  };

  useEffect(() => {
    getAllQuestion();
  }, []);

  return (
    <>
      <Navbar isLogged active="games" />
      <div className="container">
        <Title>GAMES</Title>
        <div className="d-flex flex-column gap-3">
          <span className="fs-3">Chances : 3</span>
          <div>
            <button className="btn btn-dark" onClick={() => setShowModal(true)}>
              Play
            </button>
          </div>
        </div>
      </div>

      <GameModal
        show={showModal}
        handleClose={handleCloseModal}
        questions={questions}
        index={index}
        handleNextQuestion={handleNextQuestion}
        handlePrevQuestion={handlePrevQuestion}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Games;
