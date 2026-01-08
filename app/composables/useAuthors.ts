export const useAuthors = () => {
  const {
    data: authors,
    pending,
    error,
    refresh,
  } = useFetch("/api/authors", {
    transform: (data) => {
      // Map API fields to template expectations
      return (data.authors || []).map((authors) => ({
        id: authors.id,
        name: authors.name,
        nationality: authors.nationality,
        biography: authors.biography,
        bookCount: authors.books_count,
      }));
    },
  });

  return {
    authors,
    pending,
    error,
    refresh,
  };
};
