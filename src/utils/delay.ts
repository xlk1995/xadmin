export const delay = (fn: Function) => setTimeout(() => {
    fn()
}, 1000);