interface InAnimItem {
    el: HTMLElement;
    defaultStyle: string;
    timeoutId: number;
    onCancelled(): any;
}
export declare const inAnimItems: {
    add(el: HTMLElement, defaultStyle: string, timeoutId: any, onCancelled: any): void;
    remove(el: HTMLElement): void;
    find(el: HTMLElement): InAnimItem;
    findIndex(el: HTMLElement): number;
};
export {};
