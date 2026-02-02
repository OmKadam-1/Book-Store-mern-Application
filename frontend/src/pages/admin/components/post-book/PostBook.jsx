import { useState } from "react";
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

import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { postBook } from "../service/admin";

const defaultTheme = createTheme();
export default function PostBook() {
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


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "price") {
      updatedValue = value === "" ? "" : Number(value);
    }

    setBook((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postBook(book);

      if (response.status === 201) {
        enqueueSnackbar("Book posted successfully!", {
          variant: "success",
          autoHideDuration: 5000,
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      enqueueSnackbar("Getting error while posting book", {
        variant: "error",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <BookIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Post Book
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
                  !book.imageUrl
                }
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  "Post Book"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>


    </>
  );
}
