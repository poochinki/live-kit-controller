import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@src/components/ui/popover';
import type { PropsWithChildren } from 'react';
import { ChromePicker } from 'react-color';

type IProps = {
    color: string;
    onColorChange: (color: string) => void;
} & PropsWithChildren;

export default function ColorPicker({
    color,
    children,
    onColorChange,
}: IProps) {
    return (
        <Popover>
            <PopoverTrigger nativeButton={false} render={<div />}>
                {children}
            </PopoverTrigger>

            <PopoverContent className='w-fit p-0'>
                <ChromePicker
                    color={color}
                    onChange={(value) => onColorChange(value.hex)}
                    disableAlpha
                />
            </PopoverContent>
        </Popover>
    );
}
