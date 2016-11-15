'use strict';

import $ from 'jquery'

/**
 * a router to prevent reloading and change the states
 * unlimited parameter support
 */
class Router {
    constructor () {
        const self = this;

        self.registeredRoutes = {};
        self.registeredDynamicRoutes = {};
        self.root = window.location.origin;
        self.regex = {
            parameter: /([:*])(\w+)/g,
            firstSlash: /^\//,
            allSlash: /^\/*/,
            firstDoublePoint: /^:+/,
            isOwnPage: /^\/{1}[\w\d]+|^\/$/, // checks if the path starts / followed by any word character or any digit OR just a slash
        };
    }

    /**
     * start the router after registrating them
     * initialize the first state
     * add eventlisteners to all internal routes
     */
    start () {
        const self = this;

        self.goTo(window.location.pathname)

        // add popstate listener
        window.onpopstate = (e) => {
            self.goTo(e.state.path);
        }

        // add click event listeners
        $('a').click(function (e) {
            const $this = $(this);
            const href = $this.attr('href')

            // no routing for non-internal links
            if (!href.match(self.regex.isOwnPage) || !!href.match(window.location.hostname)) {
                return
            }

            e.preventDefault();

            self.goTo(href)
        });
    }

    /**
     * register a route
     *
     * @param  {String}     path     the path to go
     * @param  {Function}   template the template to execute
     *
     * @return {undefined}
     */
    registerRoute (path, template) {
        const self = this;

        if (!path || !template) {
            return
        }

        if (typeof path !== 'string') {
            throw new Error('The path is not a string');
        }

        if (typeof template !== 'function') {
            throw new Error('The template is not a function');
        }

        if (path.match(self.regex.parameter)) {
            self.registeredDynamicRoutes[path] = template;

            return
        }

        // register paths
        self.registeredRoutes[path] = template;
    }

    /**
     * go to a specific route - 404 if the route does not exist
     *
     * @param  {String} path the path to go to
     *
     * @return {undefined}
     */
    goTo (path) {
        const self = this;

        let dynamicPath;
        let dynamicParams = {
            params: {}
        };

        path = path || '/';

        self.updateURI(path);

          /////////////////
         // NON-DYNAMIC //
        /////////////////
        // check if the route is registered in the normal paths
        if (self.registeredRoutes[path]) {
            if (typeof self.registeredRoutes[path] === 'function' && self.registeredRoutes[path] !== undefined) {
                self.registeredRoutes[path]();

                return;
            }
        }

          /////////////
         // DYNAMIC //
        /////////////
        // check if they are dynamic
        for (let route in self.registeredDynamicRoutes) {
            const analyzedDynamicRoute = self.analyzePath(route);
            const analyzedPath         = self.analyzePath(path);
            const dynamicRouteParams   = analyzedDynamicRoute.params;
            const pathParams           = analyzedPath.params;

            // bail if they are not the same length
            if (analyzedDynamicRoute.depth !== analyzedPath.depth) {
                continue;
            }

            // compare routes and check if they match
            for (let i = 0; i < pathParams.length; i++) {
                if (dynamicRouteParams[i]) {
                    // save the origin to get the right dynamic route
                    dynamicPath = analyzedDynamicRoute.origin;
                    dynamicParams.params[dynamicRouteParams[i]] = analyzedPath.parts[i];

                // there is no parameter so the names should be equal
                // bail if they are not the same
                } else if (analyzedDynamicRoute.parts[i] !== analyzedPath.parts[i]) {
                    break;
                }
            }
        }

        // check if there are any set parameters -> isDynamic
        if (Object.keys(dynamicParams.params).length > 0) {
            if (typeof self.registeredDynamicRoutes[dynamicPath] === 'function' && self.registeredDynamicRoutes[dynamicPath] !== undefined) {
                self.registeredDynamicRoutes[dynamicPath](dynamicParams)
            }

            return
        }

          /////////
         // 404 //
        /////////
        // alternative show 404
        if (typeof self.registeredRoutes['*'] === 'function' && self.registeredRoutes['*'] !== undefined) {
            self.registeredRoutes['*']();
        }
    }

    /**
     * update the URI of the browser
     *
     * @param  {String} path the path to write the URI
     */
    updateURI (path) {
        const self = this;

        path = path.replace(self.regex.allSlash, '/') || '/';

        window.history.pushState({ path }, "", path);
    }

    /**
     * @typedef {Object} analyzePathReturn
     * @property {Number} depth the depth of the url
     * @property {Array}  parts every single part of the url
     * @property {Array}  params checks if a part is a parameter
     * @property {String} origin the original path
     */
    /**
     * analyze the path to check if the routes have parameters
     *
     * @param  {String} path the path to analyze
     *
     * @return {analyzePathReturn}
     */
    analyzePath (path) {
        const self = this;

        let depth;
        let parts;
        let params = [];

        parts = path.replace(self.regex.firstSlash, '').split('/');
        depth = parts.length;

        parts.forEach((part, i) => {
            if (part.match(self.regex.firstDoublePoint)) {
                params.push(part.replace(self.regex.firstDoublePoint, ''))

                return
            }

            params.push(undefined)
        });

        return {
            depth,
            parts,
            params,
            origin: path
        }
    }
}

exports = module.exports = new Router();
