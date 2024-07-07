import React from 'react';
import { it, expect, describe } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { Application } from '../../src/client/Application';
import { CartApi, ExampleApi } from '../../src/client/api';
import { MemoryRouter } from 'react-router-dom';

describe('Проверка header', () => {
    const basename = '/hw/store';
    
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <MemoryRouter initialEntries={[basename]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it('Проверка ссылок', () => {
        const { container } = render(application);
        const links = container.querySelectorAll('.nav-link');

        expect(links.length).toBe(4);

        const linkTexts = ['Catalog', 'Delivery', 'Contacts', 'Cart'];
        links.forEach((link, index) => {
            expect(link.textContent).toBe(linkTexts[index]);
        });
    });

    it('Проверка ссылки на главную', () => {
        const { getByText } = render(application);

        const brandLink = getByText('Kogtetochka store');
        expect(brandLink.closest('a')).not.toBeNull();
        expect(brandLink.closest('a').getAttribute('href')).toBe('/');
    });
});

describe('Проверка burger', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <MemoryRouter initialEntries={[basename]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it('Навигационное меню скрывается за гамбургер на ширине экрана меньше 576px', () => {
        window.innerWidth = 575;
        const { container } = render(application);
        const navbarToggler = container.querySelector('.navbar-toggler');
        
        expect(navbarToggler).not.toBeNull();

        const navbarCollapse = container.querySelector('.navbar-collapse');
        
        expect(navbarCollapse.classList.contains('collapse')).toBe(true);
    });

    it('Меню закрывается при выборе элемента из бургер-меню', () => {
        window.innerWidth = 575;
        const { container } = render(application);
        const navbarToggler = container.querySelector('.navbar-toggler');
        fireEvent.click(navbarToggler);

        const navbarCollapse = container.querySelector('.navbar-collapse');
        
        expect(navbarCollapse.classList.contains('collapse')).toBe(false);

        const link = container.querySelector('.nav-link');
        fireEvent.click(link);
        
        expect(navbarCollapse.classList.contains('collapse')).toBe(true);
    });
});