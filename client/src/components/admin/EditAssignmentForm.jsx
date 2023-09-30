import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function EditAssignmentForm() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="bg-white w-[90%] border-gray-200 rounded-2xl p-[80px]">
      <h3 className="text-xl">Course</h3>
      <FormControl variant="filled" sx={{ m: 0, minWidth: "45%", paddingY: 2 }}>
        <InputLabel id="demo-simple-select-filled-label" className=" mt-4">
          Course Name
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
          className=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <div className="flex">
        <div className="w-[45%]">
          <h3 className="text-xl">Lesson</h3>
          <FormControl
            variant="filled"
            sx={{ m: 0, minWidth: "100%", paddingY: 2 }}
          >
            <InputLabel id="demo-simple-select-filled-label" className="mt-4">
              Lesson Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            ></Select>
          </FormControl>
        </div>
        <div className="w-[45%] ml-10">
          <h3 className="text-xl">Sub-lesson</h3>
          <FormControl
            variant="filled"
            sx={{ m: 0, minWidth: "100%", paddingY: 2 }}
          >
            <InputLabel id="demo-simple-select-filled-label" className="mt-4">
              Sub-lesson Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            ></Select>
          </FormControl>
        </div>
      </div>
      <hr className="mt-10 mb-7" />
      <h1 className="text-gray-600 text-2xl mb-10">Assignment detail</h1>
      <h3 className="mb-2 text-xl">Assignment *</h3>
      <TextField
        id="outlined-multiline-static"
        label="Assignment"
        multiline
        className="w-full mb-2"
      />
      <h3 className="mb-2 mt-5 text-xl">Duration of assignment (day)</h3>
      <FormControl variant="filled" sx={{ m: 0, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default EditAssignmentForm;
