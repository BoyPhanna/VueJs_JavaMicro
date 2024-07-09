<script setup>
import UserLayout from '../layout/UserLayout.vue';
import { reactive, ref, onMounted } from 'vue';
import { useAccountStore } from '@/stores/account.js';
import { useRoute } from 'vue-router';
const accountStore = useAccountStore()
const route = useRoute()
const test = ref('')
const accountInfo = reactive(
    {
        "amount": 6000,
        "term": 48,
        "rate": 1.5,
        "debusdate": "2024-04-12",
        "coId": 1,
        "aaId": 2,
        "bmId": 3,
        "firstMemberId": 252,
        "secondMemberId": 254,
    }
)

onMounted(() => {

})
const addAccount = async () => {

    try {
        console.log("try to add")
        await accountStore.addAccount(accountInfo)
    } catch (error) {
        console.log('error ', error)
    }
}

</script>

<template>
    <UserLayout>
        <div class="bg-white w-3/5 p-10 rounded-lg mx-auto mt-10">

            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name"
                        class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Amount</label>
                    <input v-model="accountInfo.amount" type="number" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required />
                </div>
                <div>
                    <label for="first_name"
                        class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Term</label>
                    <input v-model="accountInfo.term" type="number" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required />
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Rate
                    </label>
                    <input v-model="accountInfo.rate" type="text" id="last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe" required />
                </div>
                <div>
                    <label for="company" class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Credit
                        Officer ID</label>
                    <input v-model="accountInfo.coId" type="number" id="company"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite" required />
                </div>
                <div>
                    <label for="company" class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Accounten
                        ID</label>
                    <input v-model="accountInfo.aaId" type="number" id="company"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite" required />
                </div>

                <div>
                    <label class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Branch Manager
                        ID</label>
                    <input v-model="accountInfo.bmId" type="text" min="100"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
                <div>
                    <label class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">First member ID</label>
                    <input v-model="accountInfo.firstMemberId" type="number" min="100"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
                <div>
                    <label class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white">Second member ID</label>
                    <input v-model="accountInfo.secondMemberId" type="number" min="100"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
            </div>
            <!-- class="btn btn-info" -->
            <div class="flex justify-end">
                <button @click="addAccount()"
                    class="p-[10px] bg-primary text-white rounded-xl pl-[15px] pr-[15px]">Save</button>
            </div>
        </div>
    </UserLayout>

</template>