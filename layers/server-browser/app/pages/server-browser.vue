<template>
  <UContainer>
    <AppPageHeader title="Server Browser">
      <template #links>
        <ServerBrowserGuideModal />
      </template>
    </AppPageHeader>

    <UPageBody class="pb-8">
      <ServerBrowser />
    </UPageBody>
  </UContainer>
</template>
