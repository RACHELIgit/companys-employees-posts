import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ onChange }) => {
  return (
    <TextField
      variant="outlined"
      placeholder='Search by name or email'
      onChange={onChange}
      style={{ width: '250px', borderRadius: '50px', marginLeft: '20px' }}
      InputProps={{
        startAdornment: (
          <SearchIcon style={{ marginRight: '8px' }} />
        ),
      }}
    />
  );
};

export default SearchBox;