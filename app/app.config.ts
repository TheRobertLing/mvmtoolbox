export default defineAppConfig({
  tools: [
    {
      title: 'Server Browser',
      description: 'Browse all MVM community servers',
      to: '/server-browser',
    },
    {
      title: 'Loadout Randomiser',
      description: 'Roll a random class and loadout for your next wave',
      to: '/loadout',
      disabled: true,
    },
    {
      title: 'Loot Tracker',
      description: 'Keep track of your Mann Up tour loot',
      to: '/loot',
      disabled: true,
    },
  ],

  links: {
    steam: 'https://steamcommunity.com/profiles/76561198409853978/',
  },

  ui: {
    colors: {
      primary: 'tf2blu',
      secondary: 'tf2orange',
      success: 'tf2green',
      warning: 'tf2gold',
      error: 'tf2red',
      info: 'tf2info',
      neutral: 'stone',
    },
    icons: {
      arrowDown: 'i-ph-arrow-down-light',
      arrowLeft: 'i-ph-arrow-left-light',
      arrowRight: 'i-ph-arrow-right-light',
      arrowUp: 'i-ph-arrow-up-light',
      caution: 'i-ph-warning-circle-light',
      check: 'i-ph-check-light',
      chevronDoubleLeft: 'i-ph-caret-double-left-light',
      chevronDoubleRight: 'i-ph-caret-double-right-light',
      chevronDown: 'i-ph-caret-down-light',
      chevronLeft: 'i-ph-caret-left-light',
      chevronRight: 'i-ph-caret-right-light',
      chevronUp: 'i-ph-caret-up-light',
      close: 'i-ph-x-light',
      copy: 'i-ph-copy-light',
      copyCheck: 'i-ph-check-light',
      dark: 'i-ph-moon-light',
      drag: 'i-ph-dots-six-vertical-light',
      ellipsis: 'i-ph-dots-three-light',
      error: 'i-ph-x-circle-light',
      external: 'i-ph-arrow-up-right-light',
      eye: 'i-ph-eye-light',
      eyeOff: 'i-ph-eye-slash-light',
      file: 'i-ph-file-light',
      folder: 'i-ph-folder-light',
      folderOpen: 'i-ph-folder-open-light',
      hash: 'i-ph-hash-light',
      info: 'i-ph-info-light',
      light: 'i-ph-sun-light',
      loading: 'i-ph-circle-notch-light',
      menu: 'i-ph-list-light',
      minus: 'i-ph-minus-light',
      panelClose: 'i-ph-sidebar-simple-light',
      panelOpen: 'i-ph-sidebar-light',
      plus: 'i-ph-plus-light',
      reload: 'i-ph-arrow-counter-clockwise-light',
      search: 'i-ph-magnifying-glass-light',
      stop: 'i-ph-stop-light',
      star: 'i-ph-star-light',
      success: 'i-ph-check-circle-light',
      system: 'i-ph-monitor-light',
      tip: 'i-ph-lightbulb-light',
      upload: 'i-ph-upload-simple-light',
      warning: 'i-ph-warning-light',
    },
    input: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    select: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    textarea: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    selectMenu: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    inputMenu: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    inputNumber: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    inputTags: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    inputDate: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    inputTime: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    pinInput: {
      defaultVariants: {
        variant: 'subtle',
        size: 'sm',
      },
    },
    button: {
      defaultVariants: {
        size: 'sm',
      },
    },
    badge: {
      defaultVariants: {
        size: 'sm',
      },
    },
    inputRating: {
      defaultVariants: {
        size: 'sm',
      },
    },
    tabs: {
      defaultVariants: {
        size: 'sm',
      },
    },
    checkbox: {
      defaultVariants: {
        size: 'sm',
      },
    },
    checkboxGroup: {
      defaultVariants: {
        size: 'sm',
      },
    },
    radioGroup: {
      defaultVariants: {
        size: 'sm',
      },
    },
    switch: {
      defaultVariants: {
        size: 'sm',
      },
    },
    slider: {
      defaultVariants: {
        size: 'sm',
      },
    },
    stepper: {
      defaultVariants: {
        size: 'sm',
      },
    },
    calendar: {
      defaultVariants: {
        size: 'sm',
      },
    },
    colorPicker: {
      defaultVariants: {
        size: 'sm',
      },
    },
    fileUpload: {
      defaultVariants: {
        size: 'sm',
      },
    },
    formField: {
      defaultVariants: {
        size: 'sm',
      },
    },
    dropdownMenu: {
      defaultVariants: {
        size: 'sm',
      },
    },
    contextMenu: {
      defaultVariants: {
        size: 'sm',
      },
    },
    commandPalette: {
      defaultVariants: {
        size: 'sm',
      },
    },
    listbox: {
      defaultVariants: {
        size: 'sm',
      },
    },
    table: {
      slots: {
        th: 'px-3 py-2.5',
        td: 'p-3',
      },
    },
  },
})
