<template>
    <div>
        <input type="text" placeholder="Chercher dans le wiki..." v-model="searchQuery" />
        <div v-for="result in results">
            <div>
                <a :href="result.src">{{ result.name }}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const searchQuery = ref("");
const results = ref();

// Update search results in real time
watch(searchQuery, async (newSearchQuery) => {
    const { data: count } = await useFetch(`/api/searchWiki?search=${newSearchQuery}`);
    if (count.value) {
        results.value = count.value[1].map((el: string, index: number) => {
            return { name: el, src: count.value[3][index] };
        });
    }
});
</script>
