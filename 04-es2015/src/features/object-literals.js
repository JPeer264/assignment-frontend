export function es5() {
  return {
    i: 0,
    next: function() {
      return this.i += 1
    }
  }
}

export function es6() {
    const o = {
        i: 0,
        next(){
            return o.i+=1
        }
    };

    return o
}
