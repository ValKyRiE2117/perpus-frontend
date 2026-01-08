export const useBooks = () => {
  const {
    data: books,
    pending,
    error,
    refresh,
  } = useFetch("/api/books", {
    transform: (data) => {
      // Map API fields to template expectations
      return (data.books || []).map((book) => ({
        id: book.id,
        isbn: book.isbn,
        title: book.title,
        author: book.author_name,
        category: book.category_name,
        publisher: book.publisher,
        year: book.published_year,
        stock: book.stock,
        pages: book.pages,
        description: book.description,
        cover_image: book.cover_image,
      }));
    },
  });

  return {
    books,
    pending,
    error,
    refresh,
  };
};
