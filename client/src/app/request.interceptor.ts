import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  // Всередині інтерсептора не можна модифікувати оригінальний запит. Потрібно склонувати його і тоді вже з ним працювати.
  console.log('Intercepted request', req);
  if (req.method === 'POST') {
    const newRequest = req.clone({
      headers: new HttpHeaders({ token: 'testTokenValue' }),
    });
    return next(newRequest);
  }
  return next(req);
};
