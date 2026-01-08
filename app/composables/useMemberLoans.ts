export const useMemberLoans = () => {
  const memberData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const findLoans = async (email: string, phone: string) => {
    loading.value = true;
    error.value = null;
    memberData.value = null;

    try {
      const response = await $fetch("/api/member", {
        method: "POST",
        body: { email, phone },
      });

      memberData.value = response.data;
      return response.data;
    } catch (err: any) {
      error.value = err.data?.message || "Gagal menemukan data peminjaman";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    memberData.value = null;
    error.value = null;
    loading.value = false;
  };

  return {
    memberData,
    loading,
    error,
    findLoans,
    reset,
  };
};
