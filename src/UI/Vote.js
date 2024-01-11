import axios from "axios";
import { useEffect, useState } from "react";
import Result from "../components/Result";
import RadioGroupCom from "../components/RadioGroup";



const Vote = () => {
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState({});
  const getQuestions = async () => {
    const questionsRes = await axios.get("http://localhost:5000/questions");
    setQuestions(questionsRes?.data);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  
  return (
    <div className="container">
      <h2>Questions</h2>
      <div className="box">
        {questions
          ? questions.map((question) => (
              <div className="questionContainer">
                <RadioGroupCom question={question} value={value} setValue={setValue}  />
                <Result question={question} value={value} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default Vote;
