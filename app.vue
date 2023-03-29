<template>
    <div class="h-screen items-center flex flex-col font-mono bg-slate-700 text-white px-4">
        <div class="mt-10 text-4xl">t.Wiki</div>
        <input class="text-white border-2 border-blue-800 bg-transparent rounded-md p-2 outline-none w-full my-4" type="text" placeholder="Chercher..." v-model="searchQuery" />
        <div class="bg-slate-800 p-8 rounded-t-lg w-full h-3/4 overflow-auto">
            <div class="flex flex-col gap-2">
                <div v-for="result in results">
                    <div class="underline cursor-pointer" @click="getData(result)">{{ result.name }}</div>
                </div>
            </div>
            <div class="text-xl mb-4">
                {{ title }}
            </div>
            <div class="italic text-slate-400">
                {{ description }}
            </div>
            <div v-if="test" v-for="index in test.length - 1" class="mb-10">
                <div v-html="parse(test[index].Result)" class="customStyles"></div>
                <div v-html="parse(test[index].Ingredients)" class="customStyles" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const searchQuery = ref("");
const results = ref();
const description = ref("");
const title = ref("");
const test = ref();

const parse = (input: string) => {
    return input.replaceAll('src="/images/', 'src="https://calamitymod.wiki.gg/images/');
};

const getData = async (result: any) => {
    // console.log(result);
    const { data } = await useFetch(`/api/getRecipes?page=${result.src.split("/wiki/")[1]}`);
    results.value = [];
    test.value = data.value?.data_usedIN[0];
    // console.table(test.value);
};

searchQuery.value = "Auric ore";

getData({ src: "/wiki/Life_Alloy", title: "Life alloy" });

// Update search results in real time
watch(searchQuery, async (newSearchQuery) => {
    if (newSearchQuery.length > 0) {
        const { data: count } = await useFetch(`/api/searchWiki?search=${newSearchQuery}`);
        if (count.value) {
            results.value = count.value[1].map((el: string, index: number) => {
                return { name: el, src: count.value[3][index] };
            });
            description.value = "";
            title.value = "";
        }
    } else {
        results.value = [];
    }
});
</script>
