import { StatusCodes } from "http-status-codes";
import Book from "../models/bookModel.js";

// add book
const addBook = async (req, res) => {
  const { title, author, isbn, publicationYear } = req.body;

  try {
    // check if book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Book already exists." });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      publicationYear,
    });

    const savedBook = await newBook.save();

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Book created successfully", savedBook });
  } catch (error) {
    console.log("Error creating book", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

// fetch book by id
const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const fetchedBook = await Book.findById(id);
    if (!fetchedBook) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Book not found" });
    }
    res.status(StatusCodes.OK).json({ fetchedBook });
  } catch (error) {
    console.log("Error fetching book", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

// fetch all books
const getAllBooks = async (req, res) => {
  try {
    const fetchedBooks = await Book.find();
    res.status(StatusCodes.OK).json({ fetchedBooks });
  } catch (error) {
    console.log("Error fetching books", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

// update book
const updateBook = async (req, res) => {
  const { id } = req.params;

  const { title, author, isbn, publicationYear, favorite } = req.body;

  // check if at least one field is provided
  if (!title && !author && !isbn && !publicationYear && !favorite) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "At least one field is required" });
  }
  try {
    // filtering out undefined book fields
    const updateFields = { title, author, isbn, publicationYear, favorite };
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    const updatedBook = await Book.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    // if book is not found
    if (!updatedBook) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Book not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: "Book updated successfully", updatedBook });
  } catch (error) {
    console.log("Error updating book", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

// delete book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Book not found" });
    }
    res.status(StatusCodes.OK).json({ msg: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

// book recommendation
const recommendBook = async (req, res) => {
  try {
    // count the total number of books in the db
    const total = await Book.countDocuments();

    if (total === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No books are available" });
    }

    const randomNum = Math.floor(Math.random() * total);

    const randomBook = await Book.findOne().skip(randomNum);

    res.status(StatusCodes.OK).json({ recommendation: randomBook });
  } catch (error) {
    console.log("Error occured while book recommendation", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

// marks book as favorite
const favoriteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { favorite: true },
      { new: true }
    );

    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Book not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: "Book marked as favorite successfully", book });
  } catch (error) {
    console.log("Error occured while marking book as favorite", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error please try again later" });
  }
};

export {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
  recommendBook,
  favoriteBook,
};
