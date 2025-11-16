<script>
import LoanSlipCard from "@/components/LoanSlipCard.vue";
import loanSlipService from "@/services/loanSlip.service";
import { LoanSlipStatus } from "@/utils/constant";

export default {
  components: {
    LoanSlipCard,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loanSlip: null,
      LoanSlipStatus: LoanSlipStatus,
    };
  },
  methods: {
    async findLoanSlipById() {
      try {
        const data = await loanSlipService.findById(this.id);
        this.loanSlip = data.result;
      } catch (error) {
        alert("Lỗi lấy thông tin phiếu mượn" + error);
      }
    },
    async cancelLoanSlip() {
      if (confirm(`Bạn có chắc chắn muốn hủy yêu cầu mượn sách này?`)) {
        try {
          const res = await loanSlipService.create({
            status: LoanSlipStatus.rejected.name,
            _id: this.loanSlip._id,
          });
          alert("Cập nhật thành công");
          this.$router.replace({ name: "loanSlip" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    this.findLoanSlipById();
  },
};
</script>

<template>
  <div class="container" style="height: auto" v-if="loanSlip">
    <LoanSlipCard :loan-slip="loanSlip" />
    <div class="text-end" v-if="loanSlip.status == LoanSlipStatus.pending.name">
      <button class="btn btn-outline-danger" @click="cancelLoanSlip">
        Hủy
      </button>
    </div>
  </div>
</template>
