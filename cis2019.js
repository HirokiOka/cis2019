'use strict'
 {
     let a = [1, 1];
     let b = [1, 1];
     let D = [1, -1, 2];
     const LOOP = 10000;
     const ALPHA = 0.005;

     function t(x) {
         return 3 * x - 10;
     }

     function f(x) {
         return x;
     }

     function df(x) {
         return 1;
     }

     function u1(x) {
        return a[0] * x + b[0];
     }

     function u2(x) {
        return a[1] * x + b[1];
     }
     
     function y(u){ 
         return f(u);
     }
    

     for (let l = 0; l < LOOP; l++) {
         let da = [0, 0];
         let db = [0, 0];
         let pa = [0, 0];
         let pb = [0, 0];

         for (let d of D) {
             let uu1 = u1(d);
             let yy1 = y(uu1);
             let uu2 = u2(yy1);
             let yy2 = y(uu2);
             
             pa[1] = (yy2 - t(d)) * df(uu2) * yy1;
             pb[1] = (yy2 - t(d)) * df(uu2);
             da[1] += pa[1];
             db[1] += db[1];
       
            pa[0] = (yy2 - t(d)) * df(uu2) * a[1] * df(uu1) * d;
            pb[0] = (yy2 - t(d)) * df(uu2) * a[1] * df(uu1);
            da[0] += pa[0];
            db[0] += db[0];
            
         }

         for (let idx in a) {
             a[idx] -= ALPHA * da[idx];
             b[idx] -= ALPHA * db[idx];
         }
     }
     console.log(a[0] * a[1], a[1] * b[0] + b[1]);
 }