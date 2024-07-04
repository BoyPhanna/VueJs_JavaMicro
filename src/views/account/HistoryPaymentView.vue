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
      <div class="flex justify-end pr-52">
        <button class="btn btn-info" @click="printTable">Print Table</button>
      </div>

      <div class="bg-white px-28 py-32 w-3/5 p-10 rounded-lg mx-auto mt-10">
        <div class="bg-white tablePrint">
          <div class="flex flex-row justify-start">
            <div class="font-bold underline text-2xl text-black">Love Microfinance LTD.</div>
          </div>
          <div class="font-bold text-2xl underline flex flex-row justify-center">
            <div>ប្រវត្ដិការសងប្រាក់</div>
          </div>
          <div class="flex flex-row justify-start">
            
        <div class="qr-code-container">
        
        </div>
       
          </div>
          <!-- Loan information -->
          <div class="flex flex-row justify-between">
            <!-- left -->
            <div class="flex flex-col">
              <div>លេខគណនីយ : {{ accountStore.history.id }}</div>
              <div>ទឹកប្រាក់កម្ចី : {{ accountStore.history.amount }} ដុល្លា</div>
              <div>រយៈពេល : {{ accountStore.history.term }} ខែ</div>
              <div>អត្រាការប្រាក់ : {{ accountStore.history.rate }} % ក្នុងមួយខែ</div>
              <div>កាលបរិច្ឆេទបើកប្រាក់ : {{ accountStore.history.debusdate }}</div>
              <div>អាសយដ្ឋាន : {{ accountStore.history.address }}</div>
            </div>
            <!-- right -->
            <div class="flex flex-col">
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
                  <td>{{ row.amount}}</td>
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
