import { PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type IProps = {
    delay?: number;
    content: string;
} & PropsWithChildren;

export default function AppTooltip({ content, delay = 100, children }: IProps) {
    return (
        <Tooltip>
            <TooltipTrigger
                className='grid place-items-center'
                render={<div />}
                delay={delay}
            >
                {children}
            </TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
        </Tooltip>
    );
}
