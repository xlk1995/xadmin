<template>
    <div @click='toggleLocales()'>
        {{ t("language") }}
        {{ t('hello') }}
        <i class="i-fluent-local-language-zi-24-filled  p-3 mx-2"></i>
    </div>
</template>

<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
    const locales = availableLocales
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

</script>