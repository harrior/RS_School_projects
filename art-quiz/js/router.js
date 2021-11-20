export function Router(routes) {
  try {
    if (!routes) {
      throw new Error('error: routes param is mandatory');
    }
    this.constructor(routes);
    this.init();
  } catch (e) {
    console.error(e);
  }
}

Router.prototype = {
  routes: undefined,
  rootElem: undefined,
  constructor: function (routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('root');
  },
  init: function () {
    let r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.default) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  },

  goToRoute: function (htmlName) {
    (function (scope) {
      let url = 'views/' + htmlName,
        xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElem.innerHTML = this.responseText;
          let scripts = Array.prototype.slice.call(scope.rootElem.getElementsByTagName("script"));
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src !== "") {
              let tag = document.createElement("script");
              tag.src = scripts[i].src + `?${Math.ceil(Math.random()*100)}`;
              tag.type = 'module';
              document.getElementsByTagName("main")[0].appendChild(tag);
            } else {
              eval(scripts[i].innerHTML);
            }
          }
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    })(this);
  },
};

export function Route(name, htmlName, defaultRoute) {
  try {
    if (!name || !htmlName) {
      throw 'error: name and htmlName params are mandatories';
    }
    this.constructor(name, htmlName, defaultRoute);
  } catch (e) {
    console.error(e);
  }
}

Route.prototype = {
  name: undefined,
  htmlName: undefined,
  default: undefined,
  constructor: function (name, htmlName, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
  },
  isActiveRoute: function (hashedPath) {
    return hashedPath.replace('#', '') === this.name;
  }
}

// exports = {Route, Router}
