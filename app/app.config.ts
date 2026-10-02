export default defineAppConfig({
  navRoutes: [
    { label: 'Home', to: '/' },
    {
      label: 'Tools',
      children: [
        {
          label: 'Server Browser',
          description: 'Browse all MVM community servers',
          to: '/server-browser',
        },
      ],
    },
    { label: 'About', to: '/about' },
  ],

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
