import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'recover-password',
    loadComponent: () =>
      import('./components/recover-password/recover-password.component').then(
        (m) => m.RecoverPasswordComponent
      ),
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./components/catalog-list/catalog-list.component').then(
        (m) => m.CatalogListComponent
      ),
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('./components/shopping-cart/shopping-cart.component').then(
        (m) => m.ShoppingCartComponent
      ),
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin.component').then(
        (m) => m.AdminComponent
      ),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },

  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login al inicio
  { path: '**', redirectTo: '/login' } // Redirige a login si la ruta no existe
];