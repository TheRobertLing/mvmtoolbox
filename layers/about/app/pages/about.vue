<script setup lang="ts">
import aboutGif from '../assets/dpm7b6lqbizg1.gif'

const { links } = useAppConfig()
</script>

<template>
  <UContainer>
    <AppPageHeader title="About" description="About mvmtoolbox.tf" />

    <UPageBody class="pb-4">
      <div class="flex flex-col lg:flex-row">
        <div class="max-w-prose space-y-4 pb-8 lg:pr-8 lg:pb-0">
          <p class="text-sm leading-relaxed text-muted">
            Welcome to <span class="font-bold">mvmtoolbox.tf</span>.
          </p>

          <p class="text-sm leading-relaxed text-muted">
            This site was built to provide a various tools that the average (or hardcore) Mann vs
            Machine player might find useful.
          </p>

          <p class="text-sm leading-relaxed text-muted">
            To report a bug, suggest a feature or give feedback, feel free to contact me on
            <ULink :to="links.steam" target="_blank" class="text-primary hover:underline"
              >Steam</ULink
            >.
          </p>
        </div>

        <div
          class="flex min-w-0 flex-1 items-start justify-center border-t border-default pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
        >
          <figure class="flex flex-col items-center gap-2">
            <img :src="aboutGif" alt="A spinning sniper" class="h-auto max-w-full" />
            <figcaption class="text-xs text-muted">literally just a spinning sniper</figcaption>
          </figure>
        </div>
      </div>
    </UPageBody>
  </UContainer>
</template>
