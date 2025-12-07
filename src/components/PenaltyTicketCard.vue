<script>
import { PenaltyTicketType, PaymentStatus } from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { VND } from "@/utils/formatNumber";

export default {
  props: {
    penaltyTicket: { type: Object, required: true },
  },
  methods: {
    formatDate,
    formatDateTime,
  },
  data() {
    return {
      PenaltyTicketType: PenaltyTicketType,
      PaymentStatus: PaymentStatus,
      VND: VND,
    };
  },
};
</script>

<template>
  <div class="card mb-2" v-if="penaltyTicket">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <span>Mã: {{ penaltyTicket.code }}</span>
        <span class="fw-bold text-uppercase text-danger">{{
          PaymentStatus[penaltyTicket.paymentStatus].desc
        }}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col">
          <div class="row g-3 align-items-center">
            <div class="col-3">
              <label for="inputNote" class="col-form-label fw-bold"
                >Mã phiếu mượn:</label
              >
            </div>
            <div class="col-sm-8 col-lg-9">
              <div
                class="text-primary"
                style="text-decoration: underline; cursor: pointer"
                @click="
                  this.$router.push({
                    name: 'loanSlip.detail',
                    params: { id: penaltyTicket.loanSlipId },
                  })
                "
              >
                {{ penaltyTicket.loanSlipCode }}
              </div>
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="col-3">
              <label for="inputNote" class="col-form-label fw-bold"
                >Ngày tạo:</label
              >
            </div>
            <div class="col-sm-8 col-lg-9">
              {{ formatDateTime(penaltyTicket.createdAt) }}
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="row g-3 align-items-center"
            v-if="penaltyTicket.updatedDate"
          >
            <div class="col-3">
              <label for="inputNote" class="col-form-label fw-bold"
                >Ngày cập nhật:</label
              >
            </div>
            <div class="col-sm-8 col-lg-9">
              {{ formatDateTime(penaltyTicket.updatedDate) }}
            </div>
          </div>
        </div>
      </div>
      <div class="books mb-3">
        <div class="book-item">
          <hr class="ms-1 me-1" />
          <div class="row">
            <div class="col-2">
              <div>
                <img
                  class="img-book-loanSlip"
                  :src="penaltyTicket.book.images[0]"
                />
              </div>
            </div>
            <div class="col">
              <div>
                {{ penaltyTicket.book.name }}
              </div>
              <div class="price-penalty-ticket">
                {{ VND.format(penaltyTicket.book.price) }}đ
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-user mt-2">
        <span class="fw-bold me-1">Lý do phạt: </span>
        <span> {{ PenaltyTicketType[penaltyTicket.typePenalty]?.desc }}</span>
      </div>
      <div class="info-user mt-2 mb-4">
        <span class="fw-bold me-3">Tổng tiền phạt: </span>
        <span class="price-penalty-ticket fw-bold amount-pen">
          {{ VND.format(penaltyTicket.amount) }}đ</span
        >
      </div>
    </div>
  </div>
</template>

<style>
.img-book-loanSlip {
  width: 120px;
}

.price-penalty-ticket {
  color: var(--red-price);
}
.amount-pen{
  font-size: 24px;
}
</style>
