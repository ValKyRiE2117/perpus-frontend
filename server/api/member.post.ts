export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const response = await $fetch("http://127.0.0.1:8000/api/member", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        email: body.email,
        phone: body.phone,
      },
    });

    return response;
  } catch (error: any) {
    console.error("API Error:", error);

    throw createError({
      statusCode: error.response?.status || 500,
      message: error.data?.message || "Failed to find member",
    });
  }
});
