export interface SlideDownOption {
    endHeight?: number;
    display?: string;
    ease?: string;
    duration?: number | ((outerHeight: number) => number);
    onCancelled?: () => any;
}
export declare function slideDown(el: HTMLElement, options?: SlideDownOption): Promise<void>;
export interface SlideUpOptions {
    display?: string;
    ease?: string;
    duration?: number | ((outerHeight: number) => number);
    onCancelled?: () => any;
}
export declare function slideUp(el: HTMLElement, options?: SlideUpOptions): Promise<void>;
export declare function slideStop(el: HTMLElement): void;
export declare function isVisible(el: HTMLElement): boolean;
