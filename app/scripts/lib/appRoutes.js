define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/scripts/home/views/home.html',
                module: 'home'
            },
            '/about/:person': {
                templateUrl: '/scripts/about/views/about.html',
                module: 'about'
            },
            '/contact': {
                templateUrl: 'scripts/contact/views/contact.html',
                module: 'contact'
            }
        }
    };
});
