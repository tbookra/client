import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioGroupCom = ({ question, value, setValue }) => {
  const handleChange = (event, qId) => {
    setValue({ ...value, [qId]: event.target.value });
  };
  return (
    <FormControl key={question?.question?.idquestions}>
      <FormLabel id={question?.question?.question}>
        {question?.question?.question}
      </FormLabel>
      <RadioGroup
        name={question?.question?.question}
        // id={question?.question?.idquestions}
        value={value[question?.question?.question]}
        onChange={(e) => handleChange(e, question?.question?.idquestions)}
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
  );
};

export default RadioGroupCom;
