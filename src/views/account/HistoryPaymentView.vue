<script setup>
import UserLayout from '@/views/layout/UserLayout.vue'
import AccountLayout from '@/views/layout/AccountLayout.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import QRCode from 'qrcode';



const accountStore = useAccountStore();
const route = useRoute();

onMounted(async () => {

  await accountStore.loadHistory(route.params.id);
  await accountStore.loadHistoryPayments(route.params.id)
});

const printTable = () => {
  const printContents = document.querySelector('.tablePrint').outerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};
</script>

<template>
  <UserLayout>
    <AccountLayout>
      <div class="flex justify-end relative top-[10%] right-[10%] cursor-pointer ">
        <div class="">
          <img @click="printTable()" alt="Vue logo" class=" w-8 h-8 mr-[2px]" src="@/assets/icon/print.svg" />
          <p class="text-[16px] font-semibold">prinf</p>
        </div>
      </div>
      <div class="bg-white px-28 py-32 w-3/5 p-10 rounded-lg mx-auto mt-10">
        <div class="bg-white tablePrint">
          <div class="grid grid-rows-2">
            <div class="font-bold underline text-2xl text-black m-auto capitalize">Love Microfinance LTD.</div>
            <div class="m-auto text-[18px] font-semibold">ប្រវត្ដិការសងប្រាក់</div>
          </div>

          <div class="flex flex-row justify-start">
            <div class="qr-code-container">

            </div>
          </div>
          <!-- Loan information -->
          <div class="flex flex-row justify-between mt-[10px] mb-[10px]">
            <!-- left -->
            <div class="ml-[15px] ">
              <div class="flex">លេខគណនីយ <p class="ml-[63px] mr-[10px]">:</p> {{ accountStore.schedule.id }}</div>
              <div class="flex">ទឹកប្រាក់កម្ចី <p class="ml-[69px] mr-[10px]">:</p> {{ accountStore.schedule.amount }}
                ដុល្លា</div>
              <div class="flex">រយៈពេល <p class="ml-[98px] mr-[10px]">:</p> {{ accountStore.schedule.term }} ខែ</div>
              <div class="flex">អត្រាការប្រាក់ <p class="ml-[62px] mr-[10px]">:</p> {{ accountStore.schedule.rate }} %
                ក្នុងមួយខែ</div>
              <div class="flex">កាលបរិច្ឆេទបើកប្រាក់ <p class="ml-[5px] mr-[12px]">:</p> {{ accountStore.schedule.debusdate }}</div>
              <div class="flex">អាសយដ្ឋាន <p class="ml-[78px] mr-[12px]"> : </p> {{ accountStore.schedule.address }}
              </div>
            </div>
            <!-- right -->
            <div class="flex flex-col text-right">
              <div>ឈ្មោះអតិថិជន : {{ accountStore.history.firsMemberName }}</div>
              <div>ឈ្មោះអតិថិជន : {{ accountStore.history.secondMemberName }}</div>
              <div>មន្រ្ដីឥណទាន : {{ accountStore.history.coName }}</div>
              <div>គណនេយ្យករ : {{ accountStore.history.aaName }} </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>ល.រ</th>
                  <th>លេខការទូទាត់</th>
                  <th>ពេលវេលា</th>
                  <th>ចំនួនទឹកប្រាក់</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in accountStore.historyPayments" :key="row.id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ row.id }}</td>
                  <td>{{ row.date }}</td>
                  <td>{{ row.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AccountLayout>
  </UserLayout>
</template>

<style scoped>
@media print {
  .tablePrint {
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .tablePrint * {
    visibility: visible;
  }

  .tablePrint canvas {
    display: block !important;
    width: auto !important;
    height: auto !important;
  }
}
</style>
