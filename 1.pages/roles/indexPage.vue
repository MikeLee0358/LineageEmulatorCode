<template lang="pug">
section
  MaleKnight
  MaleMage
  MaleElf
  MaleDarkElf
  MaleRoyal
  FemaleKnight
  FemaleMage
  FemaleElf
  FemaleDarkElf
  FemaleRoyal
</template>

<script setup>
definePageMeta({
  layout: 'defaultPage'
})
</script>

<style>
.grid {
    grid-template-areas:
        '. MaleKnight . MaleElf .'
        'MaleMage . MaleRoyal . FemaleDarElf'
        'FemaleMage FemaleKnight MaleRoyal FemaleRoyal FemaleElf ';
}
</style>
