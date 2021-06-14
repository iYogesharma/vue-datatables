<template>
    <a
            @click="$emit('click', id)"
            class="dt-btn btn-outline dropdown-item "
            tabindex="0"
            aria-controls="datatable"
            href="#"
            :id="id"
    >
      <span class="color-black">
        <span> <i :class="icon"></i>&nbsp; {{label}} </span>
      </span>
    </a>
</template>
<script>
  export default {
    name: "YsButton",
    props: {
      icon: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        required:  true
      },
      id: {
        type: String,
        required:  true
      }
    }
  };
</script>
