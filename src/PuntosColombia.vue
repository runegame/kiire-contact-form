<template>
  <div class="contact-form ki-text-kiire-text ki-font-bricolage-grotesque">
    <FormKit
        id="pcoForm"
        type="form"
        :actions="false"
        @submit="submit"
        :config="{
          incompleteMessage: 'Por favor, completa toda la informacion antes de enviar.'
        }"
    >
      <div class="ki-flex ki-flex-col ki-gap-1">
        <div class="alert" :class="[`${alert.type}`]" v-if="alert.show">
          {{ alert.message }}
        </div>

        <FormKit
            id="full-name"
            name="full-name"
            type="text"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Nombre completo"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{ required: 'El nombre es obligatorio.' }"
        />

        <FormKit
            id="identification"
            name="identification"
            type="text"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Cédula"
            validation="required|numeric"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'La cédula es obligatoria',
              numeric: 'Solo se permiten números.'
            }"
        />

        <FormKit
            id="phone"
            name="phone"
            type="text"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Teléfono"
            validation="required|numeric"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'El teléfono es obligatorio.',
              numeric: 'Solo se permiten números.'
            }"
        />

        <FormKit
            id="email"
            name="email"
            type="text"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Correo"
            validation="required|email"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'El correo es obligatorio.',
              email: 'Debes ingresar un correo válido.'
            }"
        />

        <FormKit
            id="business"
            name="business"
            type="text"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Nombre de comercio"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'El nombre del comercio es obligatorio.'
            }"
        />

        <FormKit
            id="communications"
            name="communications"
            type="checkbox"
            label="Acepto recibir otras comunicaciones de parte de Kiire"
            outerClass="ki-item-form"
            wrapperClass="ki-item-form-checkbox-wrapper"
        />

        <FormKit
            type="submit"
            :inputClass="`${loading ? 'ki-pco-item-form-submit ki-disabled' : 'ki-pco-item-form-submit'}`"
            :disabled="loading"
        >
          Enviar

          <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 9.5L15.3162 9.5" stroke="#FFF7EC" stroke-linecap="square" stroke-linejoin="bevel"/>
            <path d="M16.5 9.50015C11.7419 9.50015 7.88464 5.64291 7.88464 0.884766" stroke="#FFF7EC"/>
            <path d="M16.5 9.49985C11.7419 9.49985 7.88464 13.3571 7.88464 18.1152" stroke="#FFF7EC"/>
          </svg>
        </FormKit>

        <p class="ki-mt-6">Al hacer clic en Enviar, aceptas nuestra <span class="ki-underline">política de privacidad</span></p>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import {FormKit} from "@formkit/vue";
import {reactive, ref} from "vue";
import { getNode } from '@formkit/core';
import axios from "axios";

const loading = ref(false)

const alert = reactive({
  message: '',
  show: false,
  type: 'success'
})

const submit = async (fields) => {
  if (loading.value) return

  loading.value = true
  alert.message = ''
  alert.show = false
  alert.type = 'success'

  const data = {
    data: [
      {
        'Nombre completo': fields['full-name'],
        'Cedula': fields['identification'],
        'Telefono': fields['phone'],
        'Correo': fields['email'],
        'Negocio': fields['business'],
        'Acepta comunicaciones': `${fields.communications ? 'Si' : 'No'}`,
      },
    ]
  };

  axios.post('https://sheetdb.io/api/v1/33g1pa6no3955', data)
      .then(response => {
        if (response.data.created === 1) {
          alert.message = 'Gracias por registrarte'
          alert.show = true
          alert.type = 'success'

          const formNode = getNode('pcoForm');
          formNode.reset()
        } else {
          console.log(response)

          alert.message = 'Ocurrió un error, por favor intenta mas tarde'
          alert.show = true
          alert.type = 'error'
        }

        loading.value = false
      })
      .catch(error => {
        console.log(error)

        alert.message = 'Ocurrió un error, por favor intenta mas tarde'
        alert.show = true
        alert.type = 'error'
        loading.value = false
      });
}
</script>