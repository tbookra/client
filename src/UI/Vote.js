import axios from "axios";
import { useEffect, useState } from "react";
import Result from "../components/Result";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Vote = () => {
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState({});
  const [questionResult, setQuestionResult] = useState(null);
  const getQuestions = async () => {
    const questionsRes = await axios.get("http://localhost:5000/questions");
    setQuestions(questionsRes?.data);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  const handleChange = (event, qId) => {
    console.log("qId", qId);
    console.log("event.target.value", event.target.value);
    console.log("event.target.name", event.target.name);

    setValue({ ...value, [qId]: event.target.value });
  };
  console.log("value111", value);
  //   const handleClick = async (q_id, answer) => {
  //     console.log(555, q_id, answer);
  //     const { data } = await axios.get(
  //       `http://localhost:5000/questions/vote/${q_id}/${answer.answerId}`
  //     );
  //     setQuestionResult(data);
  //   };
  console.log("questions", questions);
  return (
    <div className="container">
      <h2>Questions</h2>
      <div className="box">
        {questions
          ? questions.map((question) => (
              <div className="questionContainer">
                <FormControl key={question?.question?.idquestions}>
                  <FormLabel id={question?.question?.question}>
                    {question?.question?.question}
                  </FormLabel>
                  <RadioGroup
                    name={question?.question?.question}
                    // id={question?.question?.idquestions}
                    value={value[question?.question?.question]}
                    onChange={(e) =>
                      handleChange(e, question?.question?.idquestions )
                    }
                  >
                    {question?.answerOptions.map((answer) => (
                      <FormControlLabel
                        value={answer.answerValue} //answerId
                        id={answer?.answerId}
                        control={<Radio />}
                        label={answer.answerValue}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {/* <button
                  className="button"
                  onClick={() =>
                    handleClick(question, value[question?.question?.question])
                  }
                >
                  Submit
                </button> */}
                <Result question={question} value={value} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default Vote;
