<template>
  <div>
    <p
      class="text-white text-[64px] font-semibold text-center mb-7 font-montserrat"
    >
      Sign in
    </p>

    <div class="w-full max-w-sm">
      <div class="mb-5">
        <input
          v-model="email"
          class="bg-[#224957] rounded-[10px] w-[300px] py-2 px-4 h-[45px] text-white placeholder:text-white placeholder:font-montserrat"
          type="text"
          placeholder="Email"
          :class="{ 'border border-red-500': errors.email }"
        />
        <div v-if="errors.email" class="flex items-center mt-2">
          <p class="ml-2 text-sm text-red-500 font-montserrat">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <div class="mb-6">
        <input
          v-model="password"
          class="bg-[#224957] rounded-[10px] w-[300px] py-2 px-4 h-[45px] text-white placeholder:text-white placeholder:font-montserrat"
          :class="{ 'border border-red-500': errors.email }"
          type="password"
          placeholder="Password"
        />
        <div v-if="errors.password" class="flex items-center mt-2">
          <p class="ml-2 text-sm text-red-500 font-montserrat">
            {{ errors.password }}
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center mb-6">
        <input
          class="mr-2 leading-tight appearance-none bg-[#224957] w-[18px] h-[17px] rounded-[5px] checked:bg-blue-600 checked:border-transparent"
          type="checkbox"
        />
        <p class="text-sm text-white font-montserrat">Remember me</p>
      </div>
      <div class="flex justify-center items-center">
        <button
          class="shadow bg-[#2BD17E] text-white font-bold py-2 px-4 w-[300px] h-[54px] rounded-[10px] hover:bg-green-600 font-montserrat"
          type="button"
          @click="onSubmit"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("Silahkan masukkan email")
    .email("Silahkan masukkan format email dengan benar"),
  password: yup.string().required("Silahkan masukkan kata sandi"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});
const { value: email } = useField("email");
const { value: password } = useField("password");
const router = useRouter();

const onSubmit = handleSubmit(async (value) => {
  console.log(value);
  router.push("/movie-list");
});
</script>
