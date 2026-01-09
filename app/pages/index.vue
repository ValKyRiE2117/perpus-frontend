<template>
  <div>
    <UPageHero
      title="Website Perpus Online"
      description="Sistem manajemen perpustakaan digital yang memudahkan Anda dalam mencari, meminjam, dan mengelola koleksi buku. Akses ribuan buku dari mana saja dan kapan saja."
      :links="[
        {
          label: 'Cari Peminjaman Anda',
          to: '#bookLoans',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl',
        },
      ]"
    />

    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Koleksi Buku
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Jelajahi koleksi buku terbaru kami
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Loading state -->
          <UCard v-if="booksPending">
            <div class="animate-pulse space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div
                class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
              ></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </UCard>

          <!-- Error state -->
          <div v-else-if="booksError" class="col-span-full text-center py-8">
            <div class="text-red-500 mb-2">
              Error loading books: {{ booksError.message }}
            </div>
            <UButton @click="refreshBooks">Retry</UButton>
          </div>

          <!-- Book Card Template -->
          <UPageCard
            v-else
            v-for="book in books"
            :key="book.id"
            spotlight
            spotlight-color="primary"
          >
            <div class="space-y-3">
              <div class="flex gap-3 justify-between">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
                  {{ book.title }}
                </h3>
                <div class="flex-1">
                  <UBadge color="primary" variant="subtle" size="md">{{
                    book.category
                  }}</UBadge>
                </div>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {{ book.description }}
              </p>

              <div class="space-y-2 pt-2">
                <div
                  class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <UIcon name="i-lucide-user" class="w-4 h-4" />
                  <span>{{ book.author }}</span>
                </div>
                <div
                  class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <UIcon name="i-lucide-building" class="w-4 h-4" />
                  <span>{{ book.publisher }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-3">
                <span class="text-xs text-gray-500 dark:text-gray-500">
                  {{ book.pages }} halaman • {{ book.year }}
                </span>
                <UBadge color="primary" variant="solid">
                  Stok: {{ book.stock }}
                </UBadge>
              </div>
            </div>
          </UPageCard>
        </div>
      </div>
    </section>

    <!-- Authors Section -->
    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Penulis
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Kenali penulis-penulis hebat di perpustakaan kami
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Loading state -->
          <UCard v-if="authorsPending">
            <div class="animate-pulse space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div
                class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
              ></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </UCard>

          <!-- Error state -->
          <div v-else-if="authorsError" class="col-span-full text-center py-8">
            <div class="text-red-500 mb-2">
              Error loading authors: {{ authorsError.message }}
            </div>
            <UButton @click="refreshAuthors">Retry</UButton>
          </div>
          <UPageCard
            v-for="author in authors"
            :key="author.id"
            spotlight
            spotlight-color="primary"
          >
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-1">
                  <h3
                    class="font-semibold text-lg text-gray-900 dark:text-white"
                  >
                    {{ author.name }}
                  </h3>
                  <div
                    class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <UIcon name="i-lucide-globe" class="w-3 h-3" />
                    <span>{{ author.nationality }}</span>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ author.biography }}
              </p>

              <UBadge
                color="primary"
                variant="solid"
                class="inline-flex items-center gap-1"
              >
                {{ author.bookCount }} Buku
              </UBadge>
            </div>
          </UPageCard>
        </div>
        <!-- <div class="mt-6 text-right">
          <ULink to="/authors" class="text-primary-500 underline transition"
            >Lihat Semua Penulis &raquo;</ULink
          >
        </div> -->
      </div>
    </section>

    <!-- Find Book Loans Section -->
    <UPageSection id="bookLoans">
      <UPageCard
        class="max-w-xl mx-auto p-8"
        spotlight
        spotlight-color="primary"
      >
        <div class="text-center">
          <div
            class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <UIcon
              name="i-lucide-search"
              class="w-6 h-6 text-primary-600 dark:text-primary-400"
            />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cari Peminjaman Buku
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Masukkan email dan nomor telepon Anda untuk melihat riwayat
            peminjaman buku
          </p>
        </div>

        <UForm :state="loanForm" class="space-y-4" @submit="onSubmit">
          <UFormField label="Email" name="email" class="w-full">
            <UInput
              v-model="loanForm.email"
              placeholder="nama@email.com"
              size="lg"
              icon="i-lucide-mail"
              class="w-full"
              required
            />
          </UFormField>

          <UFormField label="Nomor Telepon" name="phone" class="w-full">
            <UInput
              v-model="loanForm.phone"
              placeholder="123-456-7890"
              size="lg"
              icon="i-lucide-phone"
              class="w-full"
              required
            />
          </UFormField>

          <!-- No Data Found Message -->
          <UAlert
            v-if="noDataMessage"
            color="error"
            variant="soft"
            title="Data Tidak Ditemukan"
            :description="noDataMessage"
            icon="i-lucide-info"
            :close-button="{
              icon: 'i-lucide-x',
              color: 'amber',
              variant: 'link',
            }"
            @close="noDataMessage = null"
          />

          <UButton
            label="Cari Peminjaman"
            size="lg"
            block
            color="primary"
            type="submit"
            :loading="loading"
          />
        </UForm>
      </UPageCard>
    </UPageSection>

    <!-- Loans Results Section -->
    <section v-if="memberData" class="pb-12">
      <div class="max-w-4xl mx-auto">
        <!-- Member Info -->
        <UCard class="mb-4">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ memberData.name }}
              </h3>
              <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-mail" class="w-4 h-4" />
                  <span>{{ memberData.email }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-phone" class="w-4 h-4" />
                  <span>{{ memberData.phone }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                  <span>{{ memberData.address }}</span>
                </div>
              </div>
            </div>
            <UBadge color="primary" variant="solid" size="lg">
              {{ memberData.loans_count }} Peminjaman
            </UBadge>
          </div>
        </UCard>

        <!-- Loans List -->
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            Riwayat Peminjaman
          </h3>
          <UButton
            label="Cari Lagi"
            size="sm"
            variant="ghost"
            icon="i-lucide-x"
            @click="reset"
          />
        </div>

        <div v-if="memberData.loans.length > 0" class="space-y-4">
          <UCard v-for="loan in memberData.loans" :key="loan.id">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-start gap-3">
                  <div class="flex-1">
                    <h4
                      class="font-semibold text-lg text-gray-900 dark:text-white mb-2"
                    >
                      {{ loan.book_title }}
                    </h4>

                    <div
                      class="space-y-1 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        <span>Dipinjam: {{ formatDate(loan.loan_date) }}</span>
                      </div>
                      <div
                        v-if="loan.return_date"
                        class="flex items-center gap-2"
                      >
                        <UIcon name="i-lucide-calendar-check" class="w-4 h-4" />
                        <span
                          >Dikembalikan:
                          {{ formatDate(loan.return_date) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <UBadge
                :color="getStatusColor(loan.status)"
                variant="soft"
                size="lg"
              >
                {{ getStatusLabel(loan.status) }}
              </UBadge>
            </div>
          </UCard>
        </div>

        <UAlert
          v-else
          color="blue"
          variant="soft"
          title="Tidak ada peminjaman"
          description="Anda belum memiliki riwayat peminjaman buku."
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const {
  books,
  pending: booksPending,
  error: booksError,
  refresh: refreshBooks,
} = await useBooks();

const {
  authors,
  pending: authorsPending,
  error: authorsError,
  refresh: refreshAuthors,
} = await useAuthors();

// Loan form state
const loanForm = ref({
  email: "",
  phone: "",
});

const { memberData, loading, error, findLoans, reset } = useMemberLoans();
const noDataMessage = ref(null);

// Submit handler
const onSubmit = async () => {
  try {
    // Clear previous messages
    noDataMessage.value = null;
    error.value = null;

    await findLoans(loanForm.value.email, loanForm.value.phone);

    // Scroll to results if data found
    if (memberData.value) {
      nextTick(() => {
        const resultsSection =
          document.querySelector("#bookLoans").nextElementSibling;
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  } catch (err) {
    // Check if it's a "not found" error
    if (
      err.statusCode === 404 ||
      err.message?.toLowerCase().includes("not found")
    ) {
      noDataMessage.value =
        "Member dengan email dan nomor telepon tersebut tidak ditemukan. Silakan periksa kembali data Anda.";
    }
    console.error("Error finding loans:", err);
  }
};

// Date formatter
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Status helpers
const getStatusColor = (status) => {
  const colors = {
    borrowed: "primary",
    returned: "info",
    overdue: "error",
  };
  return colors[status] || "gray";
};

const getStatusLabel = (status) => {
  const labels = {
    borrowed: "Dipinjam",
    returned: "Dikembalikan",
    overdue: "Terlambat",
  };
  return labels[status] || status;
};
</script>
