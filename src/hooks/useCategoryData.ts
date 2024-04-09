import { ref } from "vue";

export const useCategoryData = async <ReturnData>(url: string) => {
    const data = ref<ReturnData | null>(null);
    const loading = ref(false);
    const error = ref(false);

    async function getCategoryData(url: string) {
        loading.value = true;

        try {
            const response = await fetch(url);
            // spinner demonstration purpose
            await new Promise(res => setTimeout(res, 700));

            data.value = await response.json();
        } catch {
            error.value = true;
        }
        finally {
            loading.value = false;
        }
    }

    await getCategoryData(url);

    return { data, error, loading };
};