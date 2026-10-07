<template>
  <UContainer>
    <AppPageHeader title="Server Browser" description="Browse all MVM community servers">
      <template #links>
        <ServerBrowserGuideModal />
      </template>
    </AppPageHeader>

    <UPageBody class="pb-8">
      <ServerBrowser />
    </UPageBody>
  </UContainer>
</template>
