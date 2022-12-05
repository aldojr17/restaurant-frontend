import { FormEvent, useEffect, useState } from "react";
import { createGame, fetchQuestion } from "../api/api";
import GameModal from "../components/Modal/GameModal";
import Navbar from "../components/Navbar/Navbar";
import { IQuestionPayload } from "../redux/user/types";
import Title from "./Cart/style";

const Games = () => {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState<IQuestionPayload[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState([0, 0, 0, 0, 0]);

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
    answer[index] =
      event.currentTarget.value === questions.at(index)?.correct_answer
        ? 20
        : 0;
    setAnswer(answer);
  };

  const handleSubmit = async () => {
    await createGame(answer.reduce((acc, val) => acc + val, 0));
    setShowModal(false);
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
