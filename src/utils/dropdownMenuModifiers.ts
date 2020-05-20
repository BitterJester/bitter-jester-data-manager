export const dropdownMenuModifiers = {
    setMaxHeight: {
        enabled: true,
        order: 890,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: '400px',
                },
            };
        },
    },
};