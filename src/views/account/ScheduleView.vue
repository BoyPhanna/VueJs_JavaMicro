<script setup>
import UserLayout from '@/views/layout/UserLayout.vue'
import AccountLayout from '@/views/layout/AccountLayout.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import QRCode from 'qrcode';

const canvas = ref(null);
const text = ref('');
const qrCodeDataUrl = ref('');
const generateQRCode = async () => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(text.value);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

const accountStore = useAccountStore();
const route = useRoute();

onMounted(async () => {
  text.value = route.params.id;
  generateQRCode();
  await accountStore.loadSchedule(route.params.id);
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
        <img @click="printTable()"  alt="Vue logo" class=" w-11 h-11 mr-[2px]" src="@/assets/icon/print.svg" />

      </div>

      <div class="bg-white px-28 py-32 w-3/5 p-10 rounded-lg mx-auto mt-10">
        <div class="bg-white tablePrint">
          <div class="flex flex-row justify-start">
            <div class="font-bold underline text-2xl text-black">Love Microfinance LTD.</div>
          </div>
          <div class="font-bold text-2xl underline flex flex-row justify-center">
            <div>តារាងកាលវិភាគសងប្រាក់</div>
          </div>
          <div class="flex flex-row justify-start">
            <!-- QR code -->
            <div>
             
              <img :src="qrCodeDataUrl" alt="QR Code" class="qr-code-image" />
            </div>
        <div class="qr-code-container">
        
        </div>
       
          </div>
          <!-- Loan information -->
          <div class="flex flex-row justify-between">
            <!-- left -->
            <div class="flex flex-col">
              <div>លេខគណនីយ : {{ accountStore.schedule.id }}</div>
              <div>ទឹកប្រាក់កម្ចី : {{ accountStore.schedule.amount }} ដុល្លា</div>
              <div>រយៈពេល : {{ accountStore.schedule.term }} ខែ</div>
              <div>អត្រាការប្រាក់ : {{ accountStore.schedule.rate }} % ក្នុងមួយខែ</div>
              <div>កាលបរិច្ឆេទបើកប្រាក់ : {{ accountStore.schedule.debusdate }}</div>
              <div>អាសយដ្ឋាន : {{ accountStore.schedule.address }}</div>
            </div>
            <!-- right -->
            <div class="flex flex-col">
              <div>ឈ្មោះអតិថិជន : {{ accountStore.schedule.firsMemberName }}</div>
              <div>ឈ្មោះអតិថិជន : {{ accountStore.schedule.secondMemberName }}</div>
              <div>មន្រ្ដីឥណទាន : {{ accountStore.schedule.coName }}</div>
              <div>បេឡា : {{ accountStore.schedule.aaName }} ខែ</div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>ល.រ</th>
                  <th>សមតុល្យប្រាក់ដើម</th>
                  <th>កាលបរិច្ឆេទសងប្រាក់</th>
                  <th>ការប្រាក់</th>
                  <th>ប្រាក់ដើម</th>
                  <th>ប្រាក់ត្រូវបង់</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in accountStore.schedule.table" :key="row.id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ row.os }}</td>
                  <td>{{ row.dueDate }}</td>
                  <td>{{ row.interest }}</td>
                  <td>{{ row.principalDue }}</td>
                  <td>{{ row.total }}</td>
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
