import * as React from 'react';
import { createStore, Plugin, PluginFunctions } from '@react-pdf-viewer/core';

// interface StoreProps {
//     jumpToPage?(pageIndex: number): void;
// }

// interface JumpToPagePlugin extends Plugin {
//     jumpToPage(pageIndex: number): void;
// }

const jumpToPagePlugin = ()=> {
    const store = React.useMemo(() => createStore(), []);

    return {
        install: (pluginFunctions) => {
            store.update('jumpToPage', pluginFunctions.jumpToPage);
        },
        jumpToPage: (pageIndex) => {
            const fn = store.get('jumpToPage');
            if (fn) {
                fn(pageIndex);
            }
        },
    };
};

export default jumpToPagePlugin;