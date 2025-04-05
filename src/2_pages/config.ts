import { SvgIconProps } from '@mui/material';
import { Bear, Farm, Squirell } from '../6_shared/CustomIcons';

interface ColorConfig {
    hue: number;
    saturation: number;
    lightness: number;
    changedValue: 'hue' | 'saturation' | 'lightness';
}

export const SATURATION = 87;
export const LIGHTNESS = 38;
export const HUE_STEP = 10;

export const HUES = Array.from({ length: 36 }, (_, i) => i * HUE_STEP);

export type IconObj = {
    id: number;
    icon: (props: SvgIconProps) => React.ReactNode;
};

export const ICONS: IconObj[] = [
    { id: 1, icon: Farm },
    { id: 2, icon: Bear },
    { id: 3, icon: Squirell },
];

export const TEST_CONFIGURATION: ColorConfig[] = [
    {
        // red
        hue: 0,
        saturation: 25,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // red 2
        hue: 0,
        saturation: 50,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // red 3
        hue: 0,
        saturation: 75,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // yellow
        hue: 60,
        saturation: 25,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // yellow 2
        hue: 60,
        saturation: 50,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // yellow 3
        hue: 60,
        saturation: 75,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // green
        hue: 120,
        saturation: 25,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // green 2
        hue: 120,
        saturation: 50,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // green 3
        hue: 120,
        saturation: 75,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // lightblue
        hue: 180,
        saturation: 25,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // lightblue 2
        hue: 180,
        saturation: 50,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // lightblue 3
        hue: 180,
        saturation: 75,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // blue
        hue: 240,
        saturation: 25,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // blue 2
        hue: 240,
        saturation: 50,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // blue 3
        hue: 240,
        saturation: 75,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // purple
        hue: 300,
        saturation: 25,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // purple 2
        hue: 300,
        saturation: 50,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // purple 3
        hue: 300,
        saturation: 75,
        lightness: 38,
        changedValue: 'hue',
    },
    {
        // grey
        hue: 0,
        saturation: 0,
        lightness: 25,
        changedValue: 'lightness',
    },
    {
        // grey 2
        hue: 0,
        saturation: 0,
        lightness: 50,
        changedValue: 'lightness',
    },
    {
        // grey 3
        hue: 0,
        saturation: 0,
        lightness: 75,
        changedValue: 'lightness',
    },
    { changedValue: 'hue', hue: 10, lightness: 75, saturation: 53 },
];
