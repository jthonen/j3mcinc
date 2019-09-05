import React from 'react';
import { storiesOf } from '@storybook/react';
import NavigationBar from './index';

storiesOf("NavigationBar", module)
    .add('Story', () => {
        return (<NavigationBar/>);
    });
