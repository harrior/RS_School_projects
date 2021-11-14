'use strict';

(function () {
    function init() {
        const router = new Router([
            new Route('main', 'main.html', true),
            new Route('settings', 'settings.html'),
            new Route('quiz', 'quiz.html'),
        ]);
    }
    init();
}());
