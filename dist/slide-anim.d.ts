export interface SlideExpandOption {
    endHeight?: number;
    display?: string;
    ease?: string;
    duration?: number | ((outerHeight: number) => number);
    autoClear?: boolean;
    onCancelled?: () => any;
}
export declare function slideExpand(el: HTMLElement, options?: SlideExpandOption): Promise<void>;
export interface SlideCollapseOptions {
    display?: string;
    ease?: string;
    duration?: number | ((outerHeight: number) => number);
    autoClear?: boolean;
    onCancelled?: () => any;
}
export declare function slideCollapse(el: HTMLElement, options?: SlideCollapseOptions): Promise<void>;
export declare function slideStop(el: HTMLElement): void;
export declare function isVisible(el: HTMLElement): boolean;
