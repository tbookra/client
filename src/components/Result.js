import axios from "axios";
import { useState } from "react";

const Result = ({ question, value }) => {
  const [questionResult, setQuestionResult] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const handleClick = async (q_id, answer) => {
    if (!answer) return;
    setButtonDisable(true);
    const { data } = await axios.post(
      `http://localhost:5000/questions/insert`,
      {
        question_id: q_id.question.idquestions,
        answer_value: answer,
      }
    );
    setQuestionResult(data);
  };

  const correct = question.question.right_answer
    ? value[question.question.idquestions]?.toString() ===
      question.question.right_answer?.toString()
      ? "correct"
      : "incorrect"
    : null;
  return (
    <div className="resultContainer">
      <button
        className="button"
        disabled={buttonDisable}
        onClick={() =>
          handleClick(question, value[question?.question?.idquestions])
        }
      >
        Submit
      </button>
      {questionResult ? (
        <div className="resultsContainer">
          {/* <div>{correct ?(correct ==="correct" ? "Correct!" : "wrong"): null}  </div> */}
          {correct ? (
            <div>{correct === "correct" ? "Correct!" : "wrong"} </div>
          ) : null}
          <div>answered like you: {questionResult.count}</div>
        </div>
      ) : null}
    </div>
  );
};
export default Result;
