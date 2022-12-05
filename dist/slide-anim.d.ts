export interface SlideDownOption {
    endHeight?: number;
    display?: string;
    duration?: number;
    onCancelled?: () => any;
}
export declare function slideDown(el: HTMLElement, options?: SlideDownOption): Promise<void>;
export interface SlieUpOptions {
    display?: string;
    duration?: number;
    onCancelled?: () => any;
}
export declare function slideUp(el: HTMLElement, options?: SlieUpOptions): Promise<void>;
export declare function slideStop(el: HTMLElement): void;
export declare function isVisible(el: HTMLElement): boolean;
