<script setup lang="ts">
const discussionUrl =
  'https://www.reddit.com/r/tf2/comments/1wog3uq/valve_seems_to_have_shutdown_counting_real_player/'
</script>

<template>
  <UModal title="Guide" :scrollable="false">
    <UButton label="Guide" color="secondary" variant="subtle" />

    <template #body>
      <div class="flex flex-col gap-4">
        <UAlert title="Official servers unavailable" color="warning" variant="subtle">
          <template #description>
            As of the 22nd of September, displaying official MVM Servers is no longer possible, due
            to changes made to the Steam Web API. Further community discussion can be found
            <ULink :to="discussionUrl" target="_blank" class="underline">on Reddit</ULink>.
          </template>
        </UAlert>

        <p class="text-sm leading-relaxed text-muted">
          Use the Server Browser tool to discover and join any community MVM Servers. Results are
          cached for 10 seconds.
        </p>
      </div>
    </template>
  </UModal>
</template>
