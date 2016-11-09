let registeredRoutes = [];

export default function(path, template) {
    // register paths
    registeredRoutes.push(path);

    /**
     * ✅/
     * ✅/contact
     * ❓/contact/:parameter
     */

    const getParameter = /(:[\w\d]+)\//g;


    if (path === window.location.pathname && registeredRoutes.includes(path)) {
        if (typeof template === 'function' && template !== undefined) {
            template();
        }
    } else if (path === '*' && !registeredRoutes.includes(window.location.pathname)) {
        if (typeof template === 'function' && template !== undefined) {
            template();
        }
    }
}
