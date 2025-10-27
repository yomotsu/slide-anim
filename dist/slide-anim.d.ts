export interface slideExpandOption {
    endHeight?: number;
    display?: string;
    ease?: string;
    duration?: number | ((outerHeight: number) => number);
    onCancelled?: () => any;
}
export declare function slideExpand(el: HTMLElement, options?: slideExpandOption): Promise<void>;
export interface slideCollapseOptions {
    display?: string;
    ease?: string;
    duration?: number | ((outerHeight: number) => number);
    onCancelled?: () => any;
}
export declare function slideCollapse(el: HTMLElement, options?: slideCollapseOptions): Promise<void>;
export declare function slideStop(el: HTMLElement): void;
export declare function isVisible(el: HTMLElement): boolean;
