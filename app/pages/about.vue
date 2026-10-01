<script setup lang="ts">
import aboutGif from '~/assets/dpm7b6lqbizg1.gif'
</script>

<template>
  <UContainer>
    <UPageHeader
      title="About"
      description="About mvmtoolbox.tf"
      :ui="{
        title: 'text-2xl sm:text-2xl font-semibold tracking-tight',
        description: 'mt-1 text-sm',
      }"
    />

    <UPageBody class="pb-4">
      <div class="flex flex-col gap-8 lg:flex-row">
        <div class="max-w-prose space-y-4">
          <p class="text-sm leading-relaxed text-muted">
            Welcome to <span class="text-primary">mvmtoolbox.tf</span>.
          </p>

          <p class="text-sm leading-relaxed text-muted">
            This site was built to provide a various tools that the average Mann vs Machine player
            might find useful.
          </p>

          <p class="text-sm leading-relaxed text-muted">
            
          </p>
        </div>

        <div class="flex min-w-0 flex-1 items-start justify-center">
          <img :src="aboutGif" alt="" class="h-auto max-w-full rounded-md" />
        </div>
      </div>
    </UPageBody>
  </UContainer>
</template>
