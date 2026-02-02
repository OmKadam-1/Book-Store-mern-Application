import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
   
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import {Edit} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { getBookById,updateBook } from "../service/admin";
const defaultTheme=createTheme();
export default function UpdateBook() {
  const { id } = useParams();

   const [conditions] = useState(["New", "Like New", "Used - Good", "Used - Acceptable"]);
         const [genres] = useState([
          "Fiction",
          "Non-Fiction",
          "Mystery",
          "Thriller",
          "Science Fiction",
          "Fantasy",
          "Historical Fiction",
          "Romance",
          "Horror",
          "Biography",
          "Memoir",
          "Self-Help",
          "Health & Wellness",
          "Travel",
          "Science",
          "Philosophy",
          "Psychology",
          "Poetry",
          "Religion & Spirituality",
          "Cooking",
          "Art & Photography",
          "Children's Literature",
          "Young Adult",
          "Graphic Novel",
          "Drama",
          "Business & Economics",
          "Education",
          "Politics",
          "Law",
          "Anthology",
          "Adventure",
          "Classics",
          "Short Stories",
          "Humor",
          "Sports",
          "Music",
          "True Crime"
      ]);
      const [statuses] = useState(["Available", "Sold"]);

      const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    genre: '',
    condition: '',
    edition: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const fetchBook = async () => {
  setLoading(true);
  try {
    const response = await getBookById(id);
    if (response.status === 200) {
      setBook(response.data);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchBook();
}, []);

  const handleInputChange = (event) => {
  const { name, value } = event.target;
  const numericValue = (name === "price") ? parseInt(value, 10) : value;

  setBook({
    ...book,
    [name]: numericValue
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await updateBook(id, book);

    if (response.status === 200) {
      navigate('/admin/dashboard');
      enqueueSnackbar('Book updated successfully', {
        variant: 'success',
        autoHideDuration: 5000,
      });
    }
  } catch (error) {
    enqueueSnackbar('Getting error while updating book', {
      variant: 'error',
      autoHideDuration: 5000,
    });
  } finally {
    setLoading(false);
  }
};

  
  return (
    <>
    <ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="xs">
    <CssBaseline />

    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <Edit />
      </Avatar>

      <Typography component="h1" variant="h5">
        Update Book
      </Typography>
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
  <TextField
    margin="normal"
    required
    fullWidth
    id="imageUrl"
    label="Enter image url"
    name="imageUrl"
    type="text"
    autoComplete="imageUrl"
    autoFocus
    value={book.imageUrl}
    onChange={handleInputChange}
  />
<TextField
  margin="normal"
  required
  fullWidth
  id="title"
  label="Enter title"
  name="title"
  type="text"
  autoComplete="title"
  value={book.title}
  onChange={handleInputChange}
/>

<TextField
  margin="normal"
  required
  fullWidth
  id="author"
  label="Enter author"
  name="author"
  type="text"
  autoComplete="author"
  value={book.author}
  onChange={handleInputChange}
/>
<TextField
  margin="normal"
  required
  fullWidth
  name="description"
  label="Enter Description"
  type="text"
  id="description"
  autoComplete="description"
  value={book.description}
  onChange={handleInputChange}
/>

<TextField
  margin="normal"
  required
  fullWidth
  id="price"
  label="Enter Price"
  name="price"
  type="number"
  autoComplete="price"
  value={book.price}
  onChange={handleInputChange}
/>
<FormControl fullWidth margin="normal">
  <InputLabel id="genre-label">Select genre</InputLabel>
  <Select
    labelId="genre-label"
    id="genre"
    value={book.genre}
    onChange={handleInputChange}
    name="genre"
    label="Select genre"
  >
    <MenuItem value="">Select genre</MenuItem>
    {genres.map((genre) => (
      <MenuItem key={genre} value={genre}>
        {genre}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl fullWidth margin="normal">
  <InputLabel id="condition-label">Select condition</InputLabel>
  <Select
    labelId="condition-label"
    id="condition"
    value={book.condition}
    onChange={handleInputChange}
    name="condition"
    label="Select condition"
  >
    <MenuItem value="">Select condition</MenuItem>
    {conditions.map((condition) => (
      <MenuItem key={condition} value={condition}>
        {condition}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<TextField
  margin="normal"
  required
  fullWidth
  id="edition"
  label="Enter edition"
  name="edition"
  type="text"
  autoComplete="edition"
  value={book.edition}
  onChange={handleInputChange}
/>
<FormControl fullWidth margin="normal">
  <InputLabel id="status-label">Select Status</InputLabel>
  <Select
    labelId="status-label"
    id="status"
    value={book.status}
    onChange={handleInputChange}
    name="status"
    label="Select status"
  >
    <MenuItem value="">Select status</MenuItem>
    {statuses.map((status) => (
      <MenuItem key={status} value={status}>
        {status}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{ mt: 3, mb: 2 }}
  disabled={
    !book.title ||
    !book.author ||
    !book.description ||
    !book.price ||
    !book.genre ||
    !book.condition ||
    !book.edition ||
    !book.imageUrl ||
    !book.status
  }
>
  {loading ? (
    <CircularProgress color="success" size={24} />
  ) : (
    'Update Book'
  )}
</Button>
</Box>
</Box>
</Container>
</ThemeProvider>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="success" />
</Backdrop>

    </>
  );
}
