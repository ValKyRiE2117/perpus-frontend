export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const url = new URL("http://127.0.0.1:8000/api/authors");
    Object.entries(query).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, String(value));
    });

    const response = await $fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    // Extract the data array from Laravel's response
    return {
      authors: response.data || [],
    };
  } catch (error: any) {
    console.error("API Error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch authors",
    });
  }
});
