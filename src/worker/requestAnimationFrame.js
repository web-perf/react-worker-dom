let funs = [];

export default (fun) => {
    funs.push(fun);
}

export function execute() {
    // TODO: Add timestamp parameter in accordance to requestAnimationFrame docs
    // console.log(funs);
    const currentFuns = funs.slice(0);
    funs = [];
    currentFuns.forEach((fun) => fun());
}
