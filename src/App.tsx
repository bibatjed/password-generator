import React from "react";
import "./App.css";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Checkbox,
  Card,
  CardContent,
  Typography,
  Select,
  Container,
  CardActions,
  Button,
  TextField,
  SelectProps,
} from "@material-ui/core";

import { weakSelectOptions, strongSelectOptions } from "./helpers/selectValue";

import { generatePassword } from "./helpers/generatePassword";

//TODO: CREATE A SEPARATE FILE ON EACH COMPONENTS
function App() {
  const [options, setOptions] = React.useState({
    checkedSpecialChar: true,
    checkedDigits: true,
    checkedLowerCaseChar: true,
    checkedUpperCaseChar: true,
    passwordLength: 6,
  });

  const [generatedPassword, setGeneratedPassword] = React.useState<string>();

  //React.ChangeEvent<HTMLSelectElement> not working for Select Element lol
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    setOptions((currentState) => ({
      ...currentState,
      [event.target.name]: event.target.value || event.target.checked,
    }));
  };

  const buttonOnClick = () => {
    setGeneratedPassword(generatePassword(options));
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <div className="label-checkbox-wrapper">
            <Typography variant="h6" component="h2">
              Password Length:
            </Typography>
            <Select
              native
              value={options.passwordLength}
              name="passwordLength"
              onChange={handleChange}
              id="grouped-native-select"
            >
              <optgroup label="Weak">
                {weakSelectOptions.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Strong">
                {strongSelectOptions.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </optgroup>
            </Select>
          </div>

          <div className="label-checkbox-wrapper">
            <Typography variant="h6" component="h2">
              Include Symbols:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.checkedSpecialChar}
                  onChange={handleChange}
                  name="checkedSpecialChar"
                  color="primary"
                />
              }
              label="( e.g. @#$% )"
            />
          </div>

          <div className="label-checkbox-wrapper">
            <Typography variant="h6" component="h2">
              Include Numbers:
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.checkedDigits}
                  onChange={handleChange}
                  name="checkedDigits"
                  color="primary"
                />
              }
              label="( e.g. 123456 )"
            />
          </div>

          <div className="label-checkbox-wrapper">
            <Typography variant="h6" component="h2">
              Include Lowercase Characters:
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.checkedLowerCaseChar}
                  onChange={handleChange}
                  name="checkedLowerCaseChar"
                  color="primary"
                />
              }
              label="( e.g. abcdefgh )"
            />
          </div>

          <div className="label-checkbox-wrapper">
            <Typography variant="h6" component="h2">
              Include Uppercase Characters:
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.checkedUpperCaseChar}
                  onChange={handleChange}
                  name="checkedUpperCaseChar"
                  color="primary"
                />
              }
              label="( e.g. ABCDEFGH )"
            />
          </div>
        </CardContent>
        <CardActions>
          <div className="btn-generate-password">
            <Button variant="contained" color="primary" onClick={buttonOnClick}>
              Generate Password
            </Button>
          </div>
        </CardActions>
        <CardActions>
          <div className="input-generate-password">
            <Typography variant="h6" component="h2">
              Generated Password:
            </Typography>
            <TextField
              id="standard-read-only-input"
              value={generatedPassword}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </CardActions>
      </Card>
    </Container>
  );
}

export default App;
