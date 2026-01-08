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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <UCard v-else v-for="book in books" :key="book.id">
            <template #header>
              <div class=""></div>
            </template>

            <div class="space-y-3">
              <div class="flex gap-3 justify-between">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
                  {{ book.title }}
                </h3>
                <div class="flex-1">
                  <UBadge color="primary" variant="subtle" size="sm">{{
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
          </UCard>
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
          <UCard v-for="author in authors" :key="author.id">
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
          </UCard>
        </div>
        <!-- <div class="mt-6 text-right">
          <ULink to="/authors" class="text-primary-500 underline transition"
            >Lihat Semua Penulis &raquo;</ULink
          >
        </div> -->
      </div>
    </section>

    <!-- Find Book Loans Section -->
    <UPageSection class="bg-white dark:bg-gray-800" id="bookLoans">
      <UPageCTA class="max-w-xl mx-auto">
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

        <UForm class="space-y-4" @submit="onSubmit">
          <UFormField label="Email" name="email" class="w-full">
            <UInput
              placeholder="nama@email.com"
              size="lg"
              icon="i-lucide-mail"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Nomor Telepon" name="phone" class="w-full">
            <UInput
              placeholder="123-456-7890"
              size="lg"
              icon="i-lucide-phone"
              class="w-full"
            />
          </UFormField>

          <UButton
            label="Cari Peminjaman"
            size="lg"
            block
            color="primary"
            type="submit"
          />
        </UForm>
      </UPageCTA>
    </UPageSection>
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
</script>
