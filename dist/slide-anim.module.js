/*!
 * slide-anim
 * https://github.com/yomotsu/slide-anim
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const pool = [];
const inAnimItems = {
    add(el, defaultStyle, timeoutId, onCancelled) {
        const inAnimItem = { el, defaultStyle, timeoutId, onCancelled };
        this.remove(el);
        pool.push(inAnimItem);
    },
    remove(el) {
        const index = inAnimItems.findIndex(el);
        if (index === -1)
            return;
        const inAnimItem = pool[index];
        clearTimeout(inAnimItem.timeoutId);
        inAnimItem.onCancelled();
        pool.splice(index, 1);
    },
    find(el) {
        return pool[inAnimItems.findIndex(el)];
    },
    findIndex(el) {
        let index = -1;
        pool.some((item, i) => {
            if (item.el === el) {
                index = i;
                return true;
            }
            return false;
        });
        return index;
    }
};

const CSS_EASE_OUT_EXPO = 'cubic-bezier(0.19,1,0.22,1)';
function slideDown(el, options = {}) {
    return new Promise((resolve) => {
        if (inAnimItems.findIndex(el) !== -1)
            return;
        const _isVisible = isVisible(el);
        const hasEndHeight = typeof options.endHeight === 'number';
        const display = options.display || 'block';
        const onCancelled = options.onCancelled || function () { };
        const defaultStyle = el.getAttribute('style') || '';
        const style = window.getComputedStyle(el);
        const defaultStyles = getDefaultStyles(el, display);
        const isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
        const contentHeight = defaultStyles.height;
        const minHeight = defaultStyles.minHeight;
        const paddingTop = defaultStyles.paddingTop;
        const paddingBottom = defaultStyles.paddingBottom;
        const borderTop = defaultStyles.borderTop;
        const borderBottom = defaultStyles.borderBottom;
        const startHeight = _isVisible ? style.height : '0px';
        const startMinHeight = _isVisible ? style.minHeight : '0px';
        const startPaddingTop = _isVisible ? style.paddingTop : '0px';
        const startPaddingBottom = _isVisible ? style.paddingBottom : '0px';
        const startBorderTopWidth = _isVisible ? style.borderTopWidth : '0px';
        const startBorderBottomWidth = _isVisible ? style.borderBottomWidth : '0px';
        const endHeight = (() => {
            if (hasEndHeight)
                return `${options.endHeight}px`;
            return !isBorderBox ?
                `${contentHeight - paddingTop - paddingBottom}px` :
                `${contentHeight + borderTop + borderBottom}px`;
        })();
        const endMinHeight = `${minHeight}px`;
        const endPaddingTop = `${paddingTop}px`;
        const endPaddingBottom = `${paddingBottom}px`;
        const endBorderTopWidth = `${borderTop}px`;
        const endBorderBottomWidth = `${borderBottom}px`;
        if (startHeight === endHeight &&
            startPaddingTop === endPaddingTop &&
            startPaddingBottom === endPaddingBottom &&
            startBorderTopWidth === endBorderTopWidth &&
            startBorderBottomWidth === endBorderBottomWidth) {
            resolve();
            return;
        }
        const outerHeight = isBorderBox ? contentHeight : contentHeight + paddingTop + paddingBottom + borderTop + borderBottom;
        const duration = typeof options.duration === "function" ? options.duration(outerHeight) : options.duration || 400;
        const cssDuration = `${duration}ms`;
        const cssEasing = options.ease || CSS_EASE_OUT_EXPO;
        const cssTransition = [
            `height ${cssDuration} ${cssEasing}`,
            `min-height ${cssDuration} ${cssEasing}`,
            `padding ${cssDuration} ${cssEasing}`,
            `border-width ${cssDuration} ${cssEasing}`
        ].join();
        requestAnimationFrame(() => {
            el.style.height = startHeight;
            el.style.minHeight = startMinHeight;
            el.style.paddingTop = startPaddingTop;
            el.style.paddingBottom = startPaddingBottom;
            el.style.borderTopWidth = startBorderTopWidth;
            el.style.borderBottomWidth = startBorderBottomWidth;
            el.style.display = display;
            el.style.overflow = 'hidden';
            el.style.visibility = 'visible';
            el.style.transition = cssTransition;
            requestAnimationFrame(() => {
                el.style.height = endHeight;
                el.style.minHeight = endMinHeight;
                el.style.paddingTop = endPaddingTop;
                el.style.paddingBottom = endPaddingBottom;
                el.style.borderTopWidth = endBorderTopWidth;
                el.style.borderBottomWidth = endBorderBottomWidth;
            });
        });
        const timeoutId = setTimeout(() => {
            resetStyle(el);
            el.style.display = display;
            if (hasEndHeight) {
                el.style.height = `${options.endHeight}px`;
                el.style.overflow = `hidden`;
            }
            inAnimItems.remove(el);
            resolve();
        }, duration);
        inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
    });
}
function slideUp(el, options = {}) {
    return new Promise((resolve) => {
        if (inAnimItems.findIndex(el) !== -1)
            return;
        const _isVisible = isVisible(el);
        const display = options.display || 'block';
        const onCancelled = options.onCancelled || function () { };
        if (!_isVisible) {
            resolve();
            return;
        }
        const defaultStyle = el.getAttribute('style') || '';
        const style = window.getComputedStyle(el);
        const isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
        const minHeight = pxToNumber(style.getPropertyValue('min-height'));
        const paddingTop = pxToNumber(style.getPropertyValue('padding-top'));
        const paddingBottom = pxToNumber(style.getPropertyValue('padding-bottom'));
        const borderTop = pxToNumber(style.getPropertyValue('border-top-width'));
        const borderBottom = pxToNumber(style.getPropertyValue('border-bottom-width'));
        const contentHeight = el.scrollHeight;
        const startHeight = !isBorderBox ?
            `${contentHeight - paddingTop - paddingBottom}px` :
            `${contentHeight + borderTop + borderBottom}px`;
        const startMinHeight = `${minHeight}px`;
        const startPaddingTop = `${paddingTop}px`;
        const startPaddingBottom = `${paddingBottom}px`;
        const startBorderTopWidth = `${borderTop}px`;
        const startBorderBottomWidth = `${borderBottom}px`;
        const outerHeight = isBorderBox ? contentHeight : contentHeight + paddingTop + paddingBottom + borderTop + borderBottom;
        const duration = typeof options.duration === "function" ? options.duration(outerHeight) : options.duration || 400;
        const cssDuration = duration + 'ms';
        const cssEasing = options.ease || CSS_EASE_OUT_EXPO;
        const cssTransition = [
            `height ${cssDuration} ${cssEasing}`,
            `padding ${cssDuration} ${cssEasing}`,
            `border-width ${cssDuration} ${cssEasing}`
        ].join();
        requestAnimationFrame(() => {
            el.style.height = startHeight;
            el.style.minHeight = startMinHeight;
            el.style.paddingTop = startPaddingTop;
            el.style.paddingBottom = startPaddingBottom;
            el.style.borderTopWidth = startBorderTopWidth;
            el.style.borderBottomWidth = startBorderBottomWidth;
            el.style.display = display;
            el.style.overflow = 'hidden';
            el.style.transition = cssTransition;
            requestAnimationFrame(() => {
                el.style.height = '0';
                el.style.minHeight = '0';
                el.style.paddingTop = '0';
                el.style.paddingBottom = '0';
                el.style.borderTopWidth = '0';
                el.style.borderBottomWidth = '0';
            });
        });
        const timeoutId = setTimeout(() => {
            resetStyle(el);
            el.style.display = 'none';
            inAnimItems.remove(el);
            resolve();
        }, duration);
        inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
    });
}
function slideStop(el) {
    const elementObject = inAnimItems.find(el);
    if (!elementObject)
        return;
    const style = window.getComputedStyle(el);
    const height = style.height;
    const paddingTop = style.paddingTop;
    const paddingBottom = style.paddingBottom;
    const borderTopWidth = style.borderTopWidth;
    const borderBottomWidth = style.borderBottomWidth;
    resetStyle(el);
    el.style.height = height;
    el.style.paddingTop = paddingTop;
    el.style.paddingBottom = paddingBottom;
    el.style.borderTopWidth = borderTopWidth;
    el.style.borderBottomWidth = borderBottomWidth;
    el.style.overflow = 'hidden';
    inAnimItems.remove(el);
}
function isVisible(el) {
    return el.offsetHeight !== 0;
}
function resetStyle(el) {
    el.style.visibility = '';
    el.style.height = '';
    el.style.minHeight = '';
    el.style.paddingTop = '';
    el.style.paddingBottom = '';
    el.style.borderTopWidth = '';
    el.style.borderBottomWidth = '';
    el.style.overflow = '';
    el.style.transition = '';
}
function getDefaultStyles(el, defaultDisplay = 'block') {
    const defaultStyle = el.getAttribute('style') || '';
    const style = window.getComputedStyle(el);
    el.style.visibility = 'hidden';
    el.style.display = defaultDisplay;
    const width = pxToNumber(style.getPropertyValue('width'));
    el.style.position = 'absolute';
    el.style.width = `${width}px`;
    el.style.height = '';
    el.style.minHeight = '';
    el.style.paddingTop = '';
    el.style.paddingBottom = '';
    el.style.borderTopWidth = '';
    el.style.borderBottomWidth = '';
    const minHeight = pxToNumber(style.getPropertyValue('min-height'));
    const paddingTop = pxToNumber(style.getPropertyValue('padding-top'));
    const paddingBottom = pxToNumber(style.getPropertyValue('padding-bottom'));
    const borderTop = pxToNumber(style.getPropertyValue('border-top-width'));
    const borderBottom = pxToNumber(style.getPropertyValue('border-bottom-width'));
    const height = el.scrollHeight;
    el.setAttribute('style', defaultStyle);
    return {
        height,
        minHeight,
        paddingTop,
        paddingBottom,
        borderTop,
        borderBottom
    };
}
function pxToNumber(px) {
    return +px.replace(/px/, '');
}

export { isVisible, slideDown, slideStop, slideUp };
