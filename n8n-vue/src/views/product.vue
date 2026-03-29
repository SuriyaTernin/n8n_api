<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">

        <div class="card shadow-lg border-0 rounded-4">

          <!-- Header -->
          <div class="card-header text-center text-white rounded-top-4"
               style="background: linear-gradient(135deg, #0d6efd, #0dcaf0);">
            <h4 class="mb-1 fw-bold">📋 ลงทะเบียนเพิ่มสินค้า</h4>
            <small>กรอกข้อมูลเพื่อส่งเข้า n8n Webhook</small>
          </div>

          <!-- Body -->
          <div class="card-body p-4">

            <!-- Alert -->
            <div v-if="status.message" :class="`alert alert-${status.type} alert-dismissible fade show`" role="alert">
              {{ status.message }}
              <button type="button" class="btn-close" @click="status.message = ''"></button>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm">

              <div class="mb-3">
                <label class="form-label">รหัสสินค้า</label>
                <input type="text" class="form-control" v-model="products.id" required />
              </div>

              <div class="mb-3">
                <label class="form-label">ชื่อสินค้า</label>
                <input type="text" class="form-control" v-model="products.products_name" required />
              </div>

              <div class="mb-3">
                <label class="form-label">จำนวน</label>
                <input type="number" min="0" class="form-control" v-model.number="products.qty" required />
              </div>

              <div class="mb-3">
                <label class="form-label">ราคา</label>
                <input type="number" min="0" step="0.01" class="form-control" v-model.number="products.price" required />
              </div>

              <button class="btn btn-primary w-100 fw-bold" :disabled="loading" type="submit">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'กำลังส่งข้อมูล...' : 'บันทึกข้อมูล' }}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const products = reactive({
  id: '',
  products_name: '',
  qty: 0,
  price: 0
})

const loading = ref(false)

const status = reactive({
  message: '',
  type: ''
})

const submitForm = async () => {
  loading.value = true
  status.message = ''

  try {
    const response = await fetch('http://localhost:5678/webhook-test/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...products,
        qty: Number(products.qty),
        price: Number(products.price)
      })
    })

    if (!response.ok) throw new Error('Error from server')

    await response.json()

    status.message = '✅ เพิ่มสินค้าเรียบร้อย!'
    status.type = 'success'

    // Reset form
    products.id = ''
    products.products_name = ''
    products.qty = 0
    products.price = 0

  } catch (error) {
    console.error(error)
    status.message = '❌ เกิดข้อผิดพลาด กรุณาลองใหม่'
    status.type = 'danger'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.2);
  border-color: #0d6efd;
}
</style>