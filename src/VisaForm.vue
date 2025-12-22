<template>
  <div class="contact-form ki-text-kiire-text ki-font-bricolage-grotesque">
    <FormKit
        id="contactForm"
        type="form"
        :actions="false"
        @submit="submit"
        :config="{
          incompleteMessage: 'Por favor, completa toda la informacion antes de enviar.'
        }"
    >
      <div class="alert ki-mb-6" :class="[`${alert.type}`]" v-if="alert.show">
        {{ alert.message }}
      </div>

      <div class="ki-flex ki-flex-col md:ki-grid md:ki-grid-cols-2 ki-gap-4 md:ki-gap-10">
        <FormKit
            id="full-name"
            name="full-name"
            type="text"
            label="Nombre completo"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Nombre completo"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{ required: 'El nombre es obligatorio.' }"
        />

        <FormKit
            id="email"
            name="email"
            type="text"
            label="Email o Correo"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Email o Correo"
            validation="required|email"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'El correo es obligatorio.',
              email: 'Debes ingresar un correo válido.'
            }"
        />

        <FormKit
            id="phone"
            name="phone"
            type="text"
            label="Celular o WhatsApp"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Numero de celular"
            validation="required|numeric"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'El segundo celular es obligatorio.',
              numeric: 'Solo se permiten números.'
            }"
        />

        <FormKit
            id="business"
            name="business"
            type="text"
            label="¿Cuál es el nombre de tu empresa o negocio?"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Nombre de la empresa"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{ required: 'El nombre de la empresa es obligatorio.' }"
        />

        <FormKit
            id="address"
            name="address"
            type="text"
            label="Dirección"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Direccion con departamento y ciudad"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{ required: 'La direccion es obligatoria.' }"
        />

        <FormKit
            id="city"
            name="city"
            type="text"
            label="Ciudad"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Ciudad de tu negocio"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{ required: 'La ciudad es obligatoria.' }"
        />

        <FormKit
            id="municipality"
            name="municipality"
            type="text"
            label="Municipio"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="Municipio de tu negocio"
            validation="required"
            validation-visibility="dirty"
            :validation-messages="{ required: 'El municipio es obligatorio.' }"
        />

        <div class="ki-flex ki-flex-col md:ki-flex-row ki-items-start ki-gap-10 ki-justify-between md:ki-items-center">
          <FormKit
              id="conditions"
              name="conditions"
              type="checkbox"
              label="Acepto la Política - Aviso de Privacidad y doy el consentimiento para el tratamiento de mis datos personales. Te estaremos enviando publicidad impresa para que pongas en tu negocio."
              validation="accepted"
              validation-visibility="dirty"
              outerClass="ki-item-form"
              wrapperClass="ki-item-form-checkbox-wrapper"
              :validation-messages="{ accepted: 'Debes aceptar los términos y politica de privacidad' }"
          />
        </div>

        <FormKit
            class="ki-px-20"
            type="submit"
            label="Quiero participar"
            :inputClass="`${loading ? 'ki-item-form-submit disabled' : 'ki-item-form-submit'}`"
        />
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
        'Correo electronico': fields['email'],
        'Celular o WhatsApp': fields['phone'],
        'Negocio': fields['business'],
        'Direccion': fields['address'],
        'Ciudad': fields['city'],
        'Municipio': fields['municipality'],
        'Acepta terminos': fields['conditions'],
      },
    ]
  };

  axios.post('https://sheetdb.io/api/v1/zgv6a7niliym6', data)
      .then(response => {
        if (response.data.created === 1) {
          alert.message = 'Gracias, nos pondremos en contacto lo más pronto posible'
          alert.show = true
          alert.type = 'success'

          const formNode = getNode('contactForm');
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