import { Ref, ref } from "vue";

export const useCategoryData = async <ReturnData>(url: string, isLoading: Ref<boolean>, isError: Ref<boolean>) => {

    const data = ref<ReturnData | null>(null);

    try {
        isLoading.value = true;
        data.value = await fetchCategoryData(url);
    } catch {
        isError.value = true;
    } finally {
        isLoading.value = false;
    }

    return data;
};

async function fetchCategoryData(url: string) {
    const response = await fetch(url);
    await new Promise(res => setTimeout(res, 650));
    const data = await response.json();

    return data;
}