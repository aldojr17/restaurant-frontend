import moment from "moment";
import { FormEvent, useEffect, useState } from "react";
import {
  createGame,
  fetchHistoryGame,
  fetchLeaderboards,
  fetchQuestion,
} from "../api/api";
import GameModal from "../components/Modal/GameModal";
import Navbar from "../components/Navbar/Navbar";
import Toast from "../components/Toast/Toast";
import {
  IGamePayload,
  ILeaderboardPayload,
  IQuestionPayload,
} from "../redux/user/types";
import Title from "./Cart/style";

const Games = () => {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState<IQuestionPayload[]>([]);
  const [leaderboards, setleaderboards] = useState<ILeaderboardPayload[]>([]);
  const [historyGame, setHistoryGame] = useState<IGamePayload[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState([0, 0, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllQuestion = async () => {
    setQuestions(await fetchQuestion());
  };

  const getLeaderboards = async () => {
    setleaderboards(await fetchLeaderboards());
  };

  const getHistory = async () => {
    setHistoryGame(await fetchHistoryGame());
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
    setScore(answer.reduce((acc, val) => acc + val, 0));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    getLeaderboards();
    getHistory();
    setIndex(0);
  };

  useEffect(() => {
    getAllQuestion();
    getLeaderboards();
    getHistory();
  }, []);

  return (
    <>
      <Navbar isLogged active="games" />
      <div className="container">
        <div className="position-relative">
          <div className="toast-container position-absolute end-0">
            {showToast ? (
              <Toast
                type="Games"
                message={
                  score >= 80 ? "You got new coupon!" : "Your score below 80"
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <Title>GAMES</Title>
        <div className="d-flex flex-column gap-3">
          <span className="fs-3">
            Chances :{" "}
            {3 -
              historyGame.filter((val) =>
                moment(val.created_at).isAfter(moment())
              ).length}
          </span>
          <div>
            <button
              className="btn btn-dark"
              onClick={() => setShowModal(true)}
              disabled={
                3 -
                  historyGame.filter((val) =>
                    moment(val.created_at).isAfter(moment())
                  ).length ===
                0
              }
            >
              Play
            </button>
          </div>
        </div>

        <div className="row mt-5 container">
          <Title className="col p-0">LEADERBOARDS</Title>
          <Title className="col p-0">HISTORY</Title>
        </div>
        <div className="row container">
          <div className="row col flex-column gap-3 px-2">
            {leaderboards.length === 0 ? (
              <span className="fs-4 px-1">No Leaderboard</span>
            ) : (
              leaderboards.map((val) => (
                <div
                  key={val.id}
                  className="col-lg-6 justify-content-between align-items-center border border-2 rounded-3 border-dark p-3"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-4 fw-bold">
                      {val.user.full_name !== ""
                        ? val.user.full_name
                        : "Unknown"}
                    </span>
                    <span className="fs-4">Score: {val.accumulated_score}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="row col flex-column gap-3 px-2">
            {historyGame.length === 0 ? (
              <span className="fs-4 px-1">No History</span>
            ) : (
              historyGame.map((val, index) => (
                <div
                  key={index}
                  className="col-lg-8 justify-content-between align-items-center border border-2 rounded-3 border-dark p-3"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-4 fw-bold">
                      {moment(val.created_at).format("DD MMMM YYYY")}
                    </span>
                    <span className="fs-4">Score: {val.score}</span>
                  </div>
                </div>
              ))
            )}
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
