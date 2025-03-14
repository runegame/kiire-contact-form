<template>
  <div class="contact-form ki-text-kiire-text ki-font-bricolage-grotesque">
    <FormKit
        type="form"
        :actions="false"
        @submit="submit"
        :config="{
          incompleteMessage: 'Por favor, completa toda la informacion antes de enviar.'
        }"
    >
      <div class="ki-flex ki-flex-col md:ki-grid md:ki-grid-cols-2 ki-gap-10">
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
            id="secondPhone"
            name="secondPhone"
            type="text"
            label="Segundo celular"
            outerClass="ki-item-form"
            inputClass="ki-item-form-input"
            placeholder="O telefono de confianza"
            validation="required|numeric"
            validation-visibility="dirty"
            :validation-messages="{
              required: 'El segundo celular es obligatorio.',
              numeric: 'Solo se permiten números.'
            }"
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
            id="product"
            name="product"
            type="select"
            label="Solución de pago de tu interés"
            inputClass="ki-item-form-input ki-item-form-input-select"
            :options="[
              'KiirePro',
              'MiniDatafono',
              'Recibe pagos con tu cel',
              'Link de pagos',
            ]"
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

        <div class="ki-flex ki-flex-col md:ki-flex-row ki-items-start ki-gap-10 md:ki-col-span-2 ki-justify-between md:ki-items-center">
          <FormKit
              id="conditions"
              name="conditions"
              type="checkbox"
              label="Acepto la Política - Aviso de Privacidad y doy el consentimiento para el tratamiento de mis datos personales."
              validation="accepted"
              validation-visibility="dirty"
              outerClass="ki-item-form"
              wrapperClass="ki-item-form-checkbox-wrapper"
              :validation-messages="{ accepted: 'Debes aceptar los términos y politica de privacidad' }"
          />

          <FormKit
              type="submit"
              label="Comunicate conmigo"
              inputClass="ki-item-form-submit"
          />
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import {FormKit} from "@formkit/vue";

const submit = async () => {
  console.log('estoy aqui')
}
</script>