import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export type TooltipOptions = Partial<
    Omit<TooltipProps, 'children' | 'title'> & {
        title: string;
    }
>;

export type IconOptions = Partial<SvgIconProps>;

export const withIcon =
    (
        Icon: React.ElementType<SvgIconProps>,
        tooltipOptions: TooltipOptions = {},
        iconOptions: IconOptions = {}
    ): React.FC<IconButtonProps> =>
    (props) => {
        const { title: defaultTitle = '', ...tooltipProps } = tooltipOptions;
        const { title: propsTitle, disabled, 'aria-label': ariaLabel, ...buttonProps } = props;

        const title = propsTitle ?? defaultTitle;

        return (
            <Tooltip title={disabled ? '' : title} {...tooltipProps}>
                <span>
                    <IconButton {...buttonProps} disabled={disabled} aria-label={ariaLabel ?? title}>
                        <Icon {...iconOptions} />
                    </IconButton>
                </span>
            </Tooltip>
        );
    };
