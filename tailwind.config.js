module.exports = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/custom/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            'vz-primary': '#405189',
            'vz-input-focus-border': 'var(--vz-input-focus-border)',
            'vz-body-color': 'var(--vz-body-bg)',
            'vz-header-bg': 'var(--vz-header-bg)',
            'vz-blue': 'var(--vz-blue)',
            'vz-bg-sidebar': 'var(--vz-vertical-menu-bg-dark)',
            'vz-vertical-menu-item-active-color-dark':
               'var(--vz-vertical-menu-item-active-color-dark)',
            'vz-vertical-menu-item-color-dark':
               'var(--vz-vertical-menu-item-color-dark)',
            'vz-vertical-menu-title-color-dark':
               'var(--vz-vertical-menu-title-color-dark)',
         },
         boxShadow: {
            'vz-input-shadow': '0 0 0 0 rgb(64 81 137 / 25%)',
            'vz-card': '0 1px 2px rgb(56 65 74 / 15%)',
         },
         spacing: {
            'vz-sidebar': 'var(--vz-width-sidebar)',
            'vz-header': 'var(--vz-height-header)',
         },
      },
   },
   plugins: [],
};
