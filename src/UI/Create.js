import axios from "axios";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Create = () => {
  const [questionValue, setQuestionValue] = useState("");
  const [answerTypeValue, setAnswerTypeValue] = useState("");
  const [rightAnswerValue, setRightAnswerValue] = useState("");
  const [questionErrorMSG, setQuestionErrorMSG] = useState("");
  const [answerTypes, setAnswerTypes] = useState([]);

  const getAnswerTypes = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/questions/answerTypes"
    );
    setAnswerTypes(data);
  };
  useEffect(() => {
    getAnswerTypes();
  }, []);

  useEffect(() => {
    if (questionValue.length > 200) {
      setQuestionErrorMSG("question too long");
    }
  }, [questionValue]);
  const handleChange = (event) => {
    setAnswerTypeValue(event.target.value);
  };
  const handleSubmit = async () => {
    if(!questionValue.length){
        setQuestionErrorMSG("Mandatory Field")
        return
    }
    if(questionErrorMSG) return
    if(rightAnswerValue && answerTypeValue){

        const response = await axios.post(`http://localhost:5000/questions/addQuestion`,{
            question_val: questionValue,
            answer_type:answerTypeValue,
            right_answer:rightAnswerValue
        })
        if(response.request.status === 201) {
            alert("question added successfully")
        } else {
            alert("somthing went wrong")
        }
        setQuestionValue("")
        setAnswerTypeValue("")
        setRightAnswerValue("")
    }
  }

  return (
    <div className="container">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="inputsContainer"
      >
        <div>
          <TextField
            id="question"
            label="add here the question"
            variant="filled"
            value={questionValue}
            onChange={(e) => setQuestionValue(e.target.value)}
          />
          {questionErrorMSG && <p className="error">{questionErrorMSG}</p>}
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Answer Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={answerTypeValue}
            label="Answer Type"
            onChange={handleChange}
          >
            {answerTypes &&
              answerTypes.map((ans) => (
                <MenuItem key={ans} value={ans}>
                  {ans}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          id="rightAnswer"
          label="what is the correct answer"
          variant="filled"
          value={rightAnswerValue}
          onChange={(e)=>setRightAnswerValue(e.target.value)}
        />
      </Box>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
export default Create;
