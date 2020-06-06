export const dropdownMenuModifiers = {
    setMaxHeight: {
        enabled: true,
        order: 890,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    overflow: 'scroll',
                    maxHeight: '400px',
                    maxWidth: '400px'
                },
            };
        },
    },
};