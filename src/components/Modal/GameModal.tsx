import { Dispatch, FormEvent, SetStateAction } from "react";
import { IQuestionPayload } from "../../redux/user/types";
import { ModalWrapper } from "./style";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  questions: IQuestionPayload[];
  index: number;
  handleNextQuestion: () => void;
  handlePrevQuestion: () => void;
  handleSubmit: () => void;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
}

const GameModal = ({
  show,
  handleClose,
  questions,
  index,
  handleNextQuestion,
  handlePrevQuestion,
  handleChange,
  handleSubmit,
}: IModalProps) => {
  return (
    <ModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="gameModal"
      tabIndex={-1}
      aria-labelledby="gameModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4" id="gameModalLabel">
              Game
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body mb-3">
            <div className="row gap-3 flex-column px-2 mb-3">
              <span className="fs-3">{questions.at(index)?.question}</span>
              <div className="form-check ps-5">
                <input
                  className="form-check-input fs-4"
                  type="radio"
                  name="option"
                  id="option1"
                  value={questions.at(index)?.option_one}
                  onChange={handleChange}
                />
                <label className="form-check-label fs-4" htmlFor="option1">
                  {questions.at(index)?.option_one}
                </label>
              </div>
              <div className="form-check ps-5">
                <input
                  className="form-check-input fs-4"
                  type="radio"
                  name="option"
                  id="option2"
                  value={questions.at(index)?.option_two}
                  onChange={handleChange}
                />
                <label className="form-check-label fs-4" htmlFor="option2">
                  {questions.at(index)?.option_two}
                </label>
              </div>
              <div className="form-check ps-5">
                <input
                  className="form-check-input fs-4"
                  type="radio"
                  name="option"
                  id="option3"
                  value={questions.at(index)?.option_three}
                  onChange={handleChange}
                />
                <label className="form-check-label fs-4" htmlFor="option3">
                  {questions.at(index)?.option_three}
                </label>
              </div>
              <div className="form-check ps-5">
                <input
                  className="form-check-input fs-4"
                  type="radio"
                  name="option"
                  id="option4"
                  value={questions.at(index)?.option_four}
                  onChange={handleChange}
                />
                <label className="form-check-label fs-4" htmlFor="option4">
                  {questions.at(index)?.option_four}
                </label>
              </div>
            </div>
            <div className={`modal-footer px-0}`}>
              <div className="d-flex gap-3">
                {index === 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handlePrevQuestion}
                  >
                    Prev
                  </button>
                )}
                {index === 4 ? (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default GameModal;
