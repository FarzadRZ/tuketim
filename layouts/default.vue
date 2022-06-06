<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss">
:root {
  --primary: rgb(163, 128, 251);
  --text: #fff;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--primary);
}
a {
  color: inherit;
  &:hover {
    color: var(--primary);
    text-decoration: underline;
  }
  &.nuxt-link-exact-active {
    color: var(--primary);
  }
}
body {
  background: #222;
  color: var(--text);
}
</style>