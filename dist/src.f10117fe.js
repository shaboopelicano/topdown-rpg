// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WINDOW_HEIGHT = exports.WINDOW_WIDTH = exports.ASSETS_PATH = void 0;
exports.ASSETS_PATH = "/assets";
exports.WINDOW_WIDTH = window.innerWidth;
exports.WINDOW_HEIGHT = window.innerHeight;
},{}],"src/utils/directions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Directions = void 0;
var Directions;

(function (Directions) {
  Directions[Directions["UP"] = 0] = "UP";
  Directions[Directions["DOWN"] = 1] = "DOWN";
  Directions[Directions["LEFT"] = 2] = "LEFT";
  Directions[Directions["RIGHT"] = 3] = "RIGHT";
  Directions[Directions["NONE"] = 4] = "NONE";
})(Directions = exports.Directions || (exports.Directions = {}));

;
},{}],"src/character/Character.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Character =
/** @class */
function () {
  function Character(x, y
  /* , w: number = 0, h: number = 0 */
  ) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this.vX = 0;
    this.vY = 0;
    /*     public w: number;
        public h: number; */

    this.tilemapEntry = "floor";
    this.x = x;
    this.y = y;
    /*         this.w = w;
            this.h = h; */
  }

  return Character;
}();

exports.default = Character;
},{}],"src/character/Player.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../utils/constants");

var directions_1 = require("../utils/directions");

var Character_1 = __importDefault(require("./Character"));

var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player() {
    var _this = _super.call(this) || this;

    _this.currentDirection = directions_1.Directions.NONE;
    _this.tilemapEntry = "player";
    return _this;
  }

  Player.prototype.setVelocity = function (direction) {
    this.currentDirection = direction;

    switch (direction) {
      case directions_1.Directions.UP:
        this.vY = -Player.PLAYER_VELOCITY;
        break;

      case directions_1.Directions.DOWN:
        this.vY = +Player.PLAYER_VELOCITY;
        break;

      case directions_1.Directions.LEFT:
        this.vX = -Player.PLAYER_VELOCITY;
        break;

      case directions_1.Directions.RIGHT:
        this.vX = +Player.PLAYER_VELOCITY;
        break;

      case directions_1.Directions.NONE:
        this.vX = 0;
        this.vY = 0;
        break;
    }
  };

  Player.prototype.checkCollision = function (level) {
    var objMatrix = level.map.objects;
    var levelTileWidth = level.map.levelTileWidth;
    var cX = Math.floor((this.x + this.vX + level.map.levelTileWidth / 2) / levelTileWidth);
    var cY = Math.floor((this.y + this.vY + level.map.levelTileHeight / 2) / levelTileWidth);

    if (objMatrix[cY][cX] === 1) {
      return false;
    }

    return true;
  };

  Player.prototype.checkBoundaries = function (level) {
    var levelTileWidth = level.map.levelTileWidth;
    var cX = Math.floor((this.x + this.vX + level.map.levelTileWidth / 2) / levelTileWidth);
    var cY = Math.floor((this.y + this.vY + level.map.levelTileHeight / 2) / levelTileWidth);

    if (cX < 0) {
      this.x = constants_1.WINDOW_WIDTH - levelTileWidth;
      return directions_1.Directions.LEFT;
    } else if (cY < 0) {
      console.log('Up');
      return directions_1.Directions.UP;
    } else if (cX > level.map.width) {
      console.log('RI');
      return directions_1.Directions.RIGHT;
    } else if (cY > level.map.height) {
      console.log('RI');
      return directions_1.Directions.DOWN;
    }

    return directions_1.Directions.NONE;
  };

  Player.prototype.move = function () {
    this.x += this.vX;
    this.y += this.vY;
  };

  Player.PLAYER_VELOCITY = 5;
  return Player;
}(Character_1.default);

exports.default = Player;
},{"../utils/constants":"src/utils/constants.ts","../utils/directions":"src/utils/directions.ts","./Character":"src/character/Character.ts"}],"src/level/Tile.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tile =
/** @class */
function () {
  function Tile(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  return Tile;
}();

exports.default = Tile;
},{}],"src/level/Tilemap.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tile_1 = __importDefault(require("./Tile"));

var Tilemap = {
  floor: new Tile_1.default(0, 0, 16, 16),
  grass1: new Tile_1.default(17, 0, 16, 16),
  grass2: new Tile_1.default(34, 0, 16, 16),
  grass3: new Tile_1.default(51, 0, 16, 16),
  grass4: new Tile_1.default(68, 0, 16, 16),
  grass5: new Tile_1.default(85, 0, 16, 16),
  grass6: new Tile_1.default(102, 0, 16, 16),
  grass7: new Tile_1.default(119, 0, 16, 16),
  player: new Tile_1.default(425, 0, 16, 16)
};
exports.default = Tilemap;
},{"./Tile":"src/level/Tile.ts"}],"src/level/Map.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tilemap_1 = __importDefault(require("../level/Tilemap"));

var constants_1 = require("../utils/constants");

var Map =
/** @class */
function () {
  function Map() {
    this.width = 20;
    this.height = 20;
    this.levelTileWidth = Math.floor(constants_1.WINDOW_WIDTH / this.width);
    this.levelTileHeight = Math.floor(constants_1.WINDOW_WIDTH / this.height);
    this.matrix = [];
    this.objects = [];
    this.initializeMap();
  }

  Map.prototype.initializeMap = function () {
    this.initializeBackground();
    this.initializeObjects();
  };
  /* TODO(tulio) - Passar tudo para uma operação só */


  Map.prototype.initializeBackground = function () {
    var tilemapLength = Object.keys(Tilemap_1.default).length;

    for (var i = 0; i < this.height; i++) {
      this.matrix.push([]);

      for (var j = 0; j < this.width; j++) {
        this.matrix[i].push(Math.floor(Math.random() * tilemapLength));
      }
    }
  };

  Map.prototype.initializeObjects = function () {
    var tilemapLength = Object.keys(Tilemap_1.default).length;

    for (var i = 0; i < this.height; i++) {
      this.objects.push([]);

      for (var j = 0; j < this.width; j++) {
        if (Math.random() < .2) this.objects[i].push(1);else this.objects[i].push(0);
      }
    }
  };

  return Map;
}();

exports.default = Map;
},{"../level/Tilemap":"src/level/Tilemap.ts","../utils/constants":"src/utils/constants.ts"}],"src/level/Level.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Player_1 = __importDefault(require("../character/Player"));

var Map_1 = __importDefault(require("./Map"));

var Level =
/** @class */
function () {
  function Level() {
    this.map = new Map_1.default();
    this.player = new Player_1.default();
  }

  return Level;
}();

exports.default = Level;
},{"../character/Player":"src/character/Player.ts","./Map":"src/level/Map.ts"}],"src/core/AssetsLoader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../utils/constants");

var AssetsLoader =
/** @class */
function () {
  function AssetsLoader() {}

  AssetsLoader.prototype.loadAssets = function () {
    var img = new Image();
    img.src = constants_1.ASSETS_PATH + "/monochrome1.png";
    return img;
  };

  return AssetsLoader;
}();

exports.default = AssetsLoader;
},{"../utils/constants":"src/utils/constants.ts"}],"src/core/AssetsManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AssetsManager =
/** @class */
function () {
  function AssetsManager() {}

  AssetsManager.tileset = null;
  return AssetsManager;
}();

exports.default = AssetsManager;
},{}],"src/core/EventsManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var directions_1 = require("../utils/directions");

var Game_1 = require("./Game");

var EventsManager =
/** @class */
function () {
  function EventsManager(game) {
    this.game = game;
    this.initializeEvents();
  }

  EventsManager.prototype.initializeEvents = function () {
    var _this = this;

    window.onkeydown = function (e) {
      var _a, _b, _c, _d;

      switch (e.key) {
        case 'w':
          (_a = _this.game.currentLevel) === null || _a === void 0 ? void 0 : _a.player.setVelocity(directions_1.Directions.UP);
          break;

        case 's':
          (_b = _this.game.currentLevel) === null || _b === void 0 ? void 0 : _b.player.setVelocity(directions_1.Directions.DOWN);
          break;

        case 'a':
          (_c = _this.game.currentLevel) === null || _c === void 0 ? void 0 : _c.player.setVelocity(directions_1.Directions.LEFT);
          break;

        case 'd':
          (_d = _this.game.currentLevel) === null || _d === void 0 ? void 0 : _d.player.setVelocity(directions_1.Directions.RIGHT);
          break;

        case 'Enter':
          {
            if (_this.game.currentGameState === Game_1.GameStates.INTRO) {
              _this.game.currentGameState = Game_1.GameStates.RUNNING;
            }

            break;
          }

        case 'Escape':
          {
            if (_this.game.currentGameState === Game_1.GameStates.RUNNING) {
              _this.game.currentGameState = Game_1.GameStates.INTRO;
            }

            break;
          }
      }
    };

    window.onkeyup = function (e) {
      var _a;

      switch (e.key) {
        case 'w':
        case 's':
        case 'a':
        case 'd':
          (_a = _this.game.currentLevel) === null || _a === void 0 ? void 0 : _a.player.setVelocity(directions_1.Directions.NONE);
          break;
      }
    };
  };

  return EventsManager;
}();

exports.default = EventsManager;
},{"../utils/directions":"src/utils/directions.ts","./Game":"src/core/Game.ts"}],"src/core/Renderer.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AssetsManager_1 = __importDefault(require("./AssetsManager"));

var Tilemap_1 = __importDefault(require("../level/Tilemap"));

var constants_1 = require("../utils/constants");

var Renderer =
/** @class */
function () {
  function Renderer() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.tileset = AssetsManager_1.default.tileset;
  }

  Renderer.prototype.setTileset = function (tileset) {
    this.tileset = tileset;
  };

  Renderer.prototype.clear = function () {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Renderer.prototype.drawIntro = function () {
    this.clear();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "72px Georgia";
    this.ctx.fillText("Big smile!", constants_1.WINDOW_WIDTH / 2, constants_1.WINDOW_HEIGHT / 2);
  };

  Renderer.prototype.draw = function (level) {
    this.clear();
    this.drawBackground(level);
    this.drawObjects(level);
    this.drawCharacters();
    this.drawPlayer(level);
  };

  Renderer.prototype.drawBackground = function (level) {
    var _this = this;

    var keyNames = Object.keys(Tilemap_1.default);
    level.map.matrix.forEach(function (r, i) {
      r.forEach(function (c, j) {
        var prop = keyNames[c];
        var tile = Tilemap_1.default[prop];

        _this.ctx.drawImage(_this.tileset, tile.x, tile.y, tile.w, tile.h, level.map.levelTileWidth * j, level.map.levelTileHeight * i, level.map.levelTileWidth, level.map.levelTileHeight);
      });
    });
  };

  Renderer.prototype.drawObjects = function (level) {
    var _this = this;

    level.map.objects.forEach(function (r, i) {
      r.forEach(function (c, j) {
        if (c === 1) {
          _this.ctx.fillStyle = "#FFFFFF";

          _this.ctx.fillRect(level.map.levelTileWidth * j, level.map.levelTileHeight * i, level.map.levelTileWidth, level.map.levelTileHeight);

          _this.ctx.fillStyle = "#000000";
        }
      });
    });
  };

  Renderer.prototype.drawCharacters = function () {};

  Renderer.prototype.drawPlayer = function (level) {
    var tile = Tilemap_1.default[level.player.tilemapEntry];
    this.ctx.fillRect(level.player.x, level.player.y, level.map.levelTileWidth, level.map.levelTileHeight);
    this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h, level.player.x, level.player.y, level.map.levelTileWidth, level.map.levelTileHeight);
  };

  return Renderer;
}();

exports.default = Renderer;
},{"./AssetsManager":"src/core/AssetsManager.ts","../level/Tilemap":"src/level/Tilemap.ts","../utils/constants":"src/utils/constants.ts"}],"src/core/Game.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStates = void 0;

var Level_1 = __importDefault(require("../level/Level"));

var directions_1 = require("../utils/directions");

var AssetsLoader_1 = __importDefault(require("./AssetsLoader"));

var AssetsManager_1 = __importDefault(require("./AssetsManager"));

var EventsManager_1 = __importDefault(require("./EventsManager"));

var Renderer_1 = __importDefault(require("./Renderer"));

var GameStates;

(function (GameStates) {
  GameStates[GameStates["INTRO"] = 0] = "INTRO";
  GameStates[GameStates["PAUSED"] = 1] = "PAUSED";
  GameStates[GameStates["RUNNING"] = 2] = "RUNNING";
  GameStates[GameStates["ANIMATING"] = 3] = "ANIMATING";
})(GameStates = exports.GameStates || (exports.GameStates = {}));

;

var Game =
/** @class */
function () {
  function Game() {
    this.isRunning = false;
    this.currentLevel = null;
    this._assetsLoader = new AssetsLoader_1.default();
    this._renderer = new Renderer_1.default();
    this._eventsManager = new EventsManager_1.default(this);
    this.currentGameState = GameStates.INTRO;
    this.initializeGame();
  }

  Game.prototype.initializeGame = function () {
    var _this = this;

    var tileset = this._assetsLoader.loadAssets();

    tileset.onload = function () {
      AssetsManager_1.default.tileset = tileset;

      _this._renderer.setTileset(tileset);

      _this.isRunning = true;
      _this.currentLevel = new Level_1.default();
      requestAnimationFrame(_this.run.bind(_this));
    };
  };

  Game.prototype.update = function () {
    var _a, _b, _c;
    /* TODO(tulio) - Melhorar */


    if ((_a = this.currentLevel) === null || _a === void 0 ? void 0 : _a.player.checkCollision(this.currentLevel)) {
      if (((_b = this.currentLevel) === null || _b === void 0 ? void 0 : _b.player.checkBoundaries(this.currentLevel)) === directions_1.Directions.NONE) (_c = this.currentLevel) === null || _c === void 0 ? void 0 : _c.player.move();else {
        this.currentLevel = new Level_1.default();
      }
    }
  };

  Game.prototype.draw = function () {
    switch (this.currentGameState) {
      case GameStates.INTRO:
        this._renderer.drawIntro();

        break;

      case GameStates.RUNNING:
        this._renderer.draw(this.currentLevel);

        break;
    }
  };

  Game.prototype.run = function () {
    if (this.isRunning) {
      this.update();
      this.draw();
      requestAnimationFrame(this.run.bind(this));
    }
  };

  return Game;
}();

exports.default = Game;
},{"../level/Level":"src/level/Level.ts","../utils/directions":"src/utils/directions.ts","./AssetsLoader":"src/core/AssetsLoader.ts","./AssetsManager":"src/core/AssetsManager.ts","./EventsManager":"src/core/EventsManager.ts","./Renderer":"src/core/Renderer.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = __importDefault(require("./core/Game"));

new Game_1.default();
},{"./core/Game":"src/core/Game.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60519" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map