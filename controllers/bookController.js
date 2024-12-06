import { StatusCodes } from "http-status-codes";
import Book from "../models/bookModel.js";

// add book
const addBook = async (req, res) => {
  const { title, author, isbn, publicationYear } = req.body;
  const { userId } = req.user;

  const createdBy = userId;

  try {
    // check if book already exists
    const existingBook = await Book.findOne({ title, createdBy });
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
      createdBy,
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

// fetch book - specific to a user
const getBooks = async (req, res) => {
  const { userId } = req.user;
  const { favorite } = req.query;

  try {
    let query = { createdBy: userId }; // filter by createdBy field
    if (favorite) {
      query.favorite = favorite === "true";
    }
    const books = await Book.find(query);
    if (!books.length) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "No books found" });
    }
    res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    console.log("Error fetching books", error);
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
  const { userId, role } = req.user;
  try {
    let recommendations;

    if (role === "admin") {
      // for admin recommend books from all registered books
      recommendations = await Book.find().limit(5);
    } else {
      recommendations = await Book.find({ createdBy: userId }).limit(5);

      if (recommendations.length === 0) {
        recommendations = await Book.find().sort({ createdAt: -1 }).limit(5);
      }
    }
    if (!recommendations.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No books available for recommendation." });
    }

    res.status(StatusCodes.OK).json({ recommendations });
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
  const { userId } = req.user;

  try {
    const book = await Book.findByIdAndUpdate({
      id,
      createdBy: userId,
    });

    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Book not found or is not created by the authenticated user",
      });
    }

    // mark book as favorite
    book.favorite = true;
    await book.save();

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
  getBooks,
  getAllBooks,
  updateBook,
  deleteBook,
  recommendBook,
  favoriteBook,
};
