import TextField from '@mui/material/TextField';
import { createTheme, styled } from '@mui/material/styles';
import Autocomplete from "@mui/material/Autocomplete";

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
      color: 'var(--primary-text-color)',
    },
    '& label': {
      color: 'var(--primary-text-color)',
    },
    '& label.Mui-focused': {
      color: 'var(--primary-text-color)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--secondary-color)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--primary-text-color)',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
  });

  const StyledAutocomplete = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root:{
            width: "100%",
            margin: "0",
          },
          expanded:{
            color: "var(--primary-color)",
          },
          }
        }
      }
    });
    
export default StyledTextField;
export {StyledAutocomplete};