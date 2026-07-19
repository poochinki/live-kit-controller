import { HtmlHTMLAttributes } from 'react';

type IProps = HtmlHTMLAttributes<HTMLOrSVGElement> & {
    size?: number;
    width?: number;
    height?: number;
    color?: string;
};

export default function IOSLoadingIcon({
    size = 16,
    width,
    height,
    color = 'currentColor',
    className,
    ...props
}: IProps) {
    return (
        <div className='ios-loading'>
            <svg
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                width={size ?? width}
                className={className}
                height={size ?? height}
                {...props}
            >
                <g>
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        opacity='.14'
                    />
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        opacity='.29'
                        transform='rotate(30 12 12)'
                    />
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        opacity='.43'
                        transform='rotate(60 12 12)'
                    />
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        opacity='.57'
                        transform='rotate(90 12 12)'
                    />
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        opacity='.71'
                        transform='rotate(120 12 12)'
                    />
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        opacity='.86'
                        transform='rotate(150 12 12)'
                    />
                    <rect
                        width='2'
                        height='5'
                        x='11'
                        y='1'
                        fill={color}
                        transform='rotate(180 12 12)'
                    />
                    <animateTransform
                        attributeName='transform'
                        calcMode='discrete'
                        dur='0.75s'
                        repeatCount='indefinite'
                        type='rotate'
                        values='0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12'
                    />
                </g>
            </svg>
        </div>
    );
}
