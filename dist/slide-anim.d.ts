interface SlideDownOption {
    endHeight?: number;
    display?: string;
    duration?: number;
    onCancelled?: () => any;
}
export declare function slideDown(el: HTMLElement, options?: SlideDownOption): any;
interface SlieUpOptions {
    display?: string;
    duration?: number;
    onCancelled?: () => any;
}
export declare function slideUp(el: HTMLElement, options?: SlieUpOptions): any;
export declare function slideStop(el: HTMLElement): void;
export declare function isVisible(el: HTMLElement): boolean;
export {};
