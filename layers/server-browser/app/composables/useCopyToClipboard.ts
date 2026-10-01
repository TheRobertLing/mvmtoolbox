export function useCopyToClipboard() {
  const toast = useToast()

  return async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      toast.add({
        title: 'Copy failed',
        description: 'Unable to access the clipboard.',
        icon: 'i-lucide-x',
        color: 'error',
      })
      return
    }

    toast.add({
      title: 'Copied',
      description: text,
      icon: 'i-lucide-check',
      color: 'success',
    })
  }
}
