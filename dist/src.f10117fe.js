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
exports.SHRINK_FACTOR = exports.WINDOW_HEIGHT = exports.WINDOW_WIDTH = exports.ASSETS_PATH = void 0;
exports.ASSETS_PATH = "/assets";
exports.WINDOW_WIDTH = window.innerWidth;
exports.WINDOW_HEIGHT = window.innerHeight;
exports.SHRINK_FACTOR = 1.3;
},{}],"src/utils/colors.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Colors = void 0;
var Colors;

(function (Colors) {
  Colors["BLACK"] = "#000000";
  Colors["RED"] = "#FF0000";
  Colors["WHITE"] = "#FFFFFF";
})(Colors = exports.Colors || (exports.Colors = {}));
},{}],"src/hud/Box.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Box =
/** @class */
function () {
  function Box() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.isVisible = false;
    this.isAnimating = false;
  }

  return Box;
}();

exports.default = Box;
},{}],"src/hud/DialogBox.ts":[function(require,module,exports) {
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

var colors_1 = require("../utils/colors");

var constants_1 = require("../utils/constants");

var Box_1 = __importDefault(require("./Box"));

var DialogBox =
/** @class */
function (_super) {
  __extends(DialogBox, _super);

  function DialogBox(game) {
    var _this = _super.call(this) || this;

    _this.xLine1Reveal = 0;
    _this.xLine2Reveal = 0;
    _this.xLine3Reveal = 0;
    _this.xLine4Reveal = 0;
    _this.isFadingIn = false;
    _this._textSource = "";
    _this._animationStart = 0;
    _this._animationTime = 2000;
    _this._textLine1 = "";
    _this._textLine2 = "";
    _this._textLine3 = "";
    _this._textLine4 = "";
    _this._DIALOG_BOX_HEIGHT = 100;
    _this._LINE_SEPARATOR = '/n';
    _this._FONT = '14px Georgia';
    _this._TEXT_HOR_OFFSET = 100;
    _this._TEXT_VERT_OFFSET = 25;
    _this._TEXT_LINE_SEPARATION = 20;
    _this._DIALOGBOX_TIMEOUT = 2000;
    _this._TEXT_SPEED = 12;
    _this.x = 0;
    _this.y = -_this._DIALOG_BOX_HEIGHT;
    _this.w = constants_1.WINDOW_WIDTH;
    _this.h = _this._DIALOG_BOX_HEIGHT;
    _this.currentLine = 1;
    return _this;
  }

  DialogBox.prototype.animate = function () {
    var animationSpeed = 10;

    var ellapsedTime = window.performance.now() - this._animationStart;

    if (ellapsedTime < this._animationTime / 2) {
      if (this.y < -10) this.y += animationSpeed;
    } else if (this.y > -this._DIALOG_BOX_HEIGHT) {
      this.y -= animationSpeed;
    }
  };

  DialogBox.prototype.draw = function (ctx) {
    if (this.isAnimating) {
      this.animate();
    }

    ctx.save();
    ctx.fillStyle = colors_1.Colors.BLACK;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    if (this.y < 0) this.y += 3;
    ctx.font = this._FONT;
    ctx.globalAlpha = 1;
    ctx.fillStyle = colors_1.Colors.WHITE;
    this.drawLines(ctx);
    this.drawLineRevelation(ctx);
    ctx.restore();
  };

  DialogBox.prototype.setTextSource = function (text) {
    this._textSource = text;

    var _a = this._textSource.split(this._LINE_SEPARATOR),
        l1 = _a[0],
        l2 = _a[1],
        l3 = _a[2],
        l4 = _a[3];

    this._textLine1 = l1 ? l1 : "";
    this._textLine2 = l2 ? l2 : "";
    this._textLine3 = l3 ? l3 : "";
    this._textLine4 = l4 ? l4 : "";

    if (!this.isVisible) {
      this.revealDialogBox();
    }
  };

  DialogBox.prototype.revealDialogBox = function () {
    var _this = this;

    this.isVisible = true;
    this.isAnimating = true;
    this._animationStart = window.performance.now();
    setTimeout(function () {
      _this.reset();
    }, this._DIALOGBOX_TIMEOUT);
  };

  DialogBox.prototype.drawLines = function (ctx) {
    ctx.fillText(this._textLine1, this.x + this._TEXT_HOR_OFFSET, this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 0);
    ctx.fillText(this._textLine2, this.x + this._TEXT_HOR_OFFSET, this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 1);
    ctx.fillText(this._textLine3, this.x + this._TEXT_HOR_OFFSET, this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 2);
    ctx.fillText(this._textLine4, this.x + this._TEXT_HOR_OFFSET, this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 3);
  };

  DialogBox.prototype.drawLineRevelation = function (ctx) {
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = colors_1.Colors.BLACK;
    ctx.fillRect(this.xLine1Reveal, this.y + 7, this.w, this.y + 14);
    ctx.fillRect(this.xLine2Reveal, this.y + 28, this.w, this.y + 14);
    ctx.fillRect(this.xLine3Reveal, this.y + 48, this.w, this.y + 14);
    ctx.fillRect(this.xLine4Reveal, this.y + 68, this.w, this.y + 14);

    if (this.currentLine === 1) {
      this.xLine1Reveal += this._TEXT_SPEED;
      if (this.xLine1Reveal >= this.w) this.currentLine++;
    } else if (this.currentLine === 2) {
      this.xLine2Reveal += this._TEXT_SPEED;
      if (this.xLine2Reveal >= this.w) this.currentLine++;
    } else if (this.currentLine === 3) {
      this.xLine3Reveal += this._TEXT_SPEED;
      if (this.xLine3Reveal >= this.w) this.currentLine++;
    } else if (this.currentLine === 4) {
      this.xLine4Reveal += this._TEXT_SPEED;
      if (this.xLine4Reveal >= this.w) this.currentLine++;
    }

    ctx.globalAlpha = 1;
  };

  DialogBox.prototype.reset = function () {
    this._textLine1 = "";
    this._textLine2 = "";
    this._textLine3 = "";
    this._textLine4 = "";
    this.xLine1Reveal = 0;
    this.xLine2Reveal = 0;
    this.xLine3Reveal = 0;
    this.xLine4Reveal = 0;
    this.isVisible = false;
    this.isAnimating = false;
    this.y = -this._DIALOG_BOX_HEIGHT;
    this._animationStart = 0;
    this.currentLine = 1;
  };

  return DialogBox;
}(Box_1.default);

exports.default = DialogBox;
},{"../utils/colors":"src/utils/colors.ts","../utils/constants":"src/utils/constants.ts","./Box":"src/hud/Box.ts"}],"src/hud/InfoBox.ts":[function(require,module,exports) {
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

var colors_1 = require("../utils/colors");

var constants_1 = require("../utils/constants");

var Box_1 = __importDefault(require("./Box"));

var InfoBox =
/** @class */
function (_super) {
  __extends(InfoBox, _super);

  function InfoBox(game) {
    var _this = _super.call(this) || this;

    _this._INFO_BOX_HEIGHT = constants_1.WINDOW_HEIGHT;
    _this._INFO_BOX_WIDTH = 300;
    _this._INFO_BOX_BACKGROUND_COLOR = colors_1.Colors.WHITE;
    _this._INFO_BOX_TEXT_COLOR = colors_1.Colors.BLACK;
    _this.x = constants_1.WINDOW_WIDTH - _this._INFO_BOX_WIDTH;
    _this.y = 0;
    _this.w = _this._INFO_BOX_WIDTH;
    _this.h = _this._INFO_BOX_HEIGHT;
    _this.isVisible = true;
    _this.game = game;
    return _this;
  }

  InfoBox.prototype.draw = function (ctx) {
    ctx.save();
    ctx.clearRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this._INFO_BOX_BACKGROUND_COLOR;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = colors_1.Colors.BLACK;
    ctx.fillRect(this.x + 10, this.y, 2, this.h);
    ctx.fillRect(this.x + 15, this.y, 2, this.h);
    ctx.fillRect(this.x + 20, this.y, 2, this.h);
    ctx.fillRect(constants_1.WINDOW_WIDTH - 10, this.y, 2, this.h);
    ctx.fillRect(constants_1.WINDOW_WIDTH - 15, this.y, 2, this.h);
    ctx.fillRect(constants_1.WINDOW_WIDTH - 20, this.y, 2, this.h);
    this.drawText(ctx);
    ctx.restore();
  };

  InfoBox.prototype.drawText = function (ctx) {
    var _this = this;

    var _a;

    ctx.fillStyle = this._INFO_BOX_TEXT_COLOR;
    ctx.font = "16px Georgia";
    var battle = (_a = this.game.currentLevel) === null || _a === void 0 ? void 0 : _a.battle;
    battle === null || battle === void 0 ? void 0 : battle.characterList.forEach(function (char, index) {
      var offsetLeft = 40;
      var offsetTop = 100;
      var lineSeparation = 35;
      ctx.fillText(char.isActive ? "-> " + char.getCharacterClass() : "" + char.getCharacterClass(), constants_1.WINDOW_WIDTH - _this._INFO_BOX_WIDTH + offsetLeft, offsetTop + lineSeparation * index);
    });
  };

  return InfoBox;
}(Box_1.default);

exports.default = InfoBox;
},{"../utils/colors":"src/utils/colors.ts","../utils/constants":"src/utils/constants.ts","./Box":"src/hud/Box.ts"}],"src/hud/Lifebar.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Lifebar =
/** @class */
function () {
  function Lifebar(game) {}

  return Lifebar;
}();

exports.default = Lifebar;
},{}],"src/hud/HUD.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../utils/constants");

var DialogBox_1 = __importDefault(require("./DialogBox"));

var InfoBox_1 = __importDefault(require("./InfoBox"));

var Lifebar_1 = __importDefault(require("./Lifebar"));

var HUD =
/** @class */
function () {
  function HUD(game, x, y, w, h) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (w === void 0) {
      w = constants_1.WINDOW_WIDTH;
    }

    if (h === void 0) {
      h = 100;
    }

    this.game = game;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lifebar = new Lifebar_1.default(this.game);
    this.dialogBox = new DialogBox_1.default(this.game);
    this.infoBox = new InfoBox_1.default(this.game);
  }

  HUD.prototype.draw = function (ctx) {
    if (this.dialogBox.isVisible) this.dialogBox.draw(ctx);
    if (this.infoBox.isVisible) this.infoBox.draw(ctx);
  };

  return HUD;
}();

exports.default = HUD;
},{"../utils/constants":"src/utils/constants.ts","./DialogBox":"src/hud/DialogBox.ts","./InfoBox":"src/hud/InfoBox.ts","./Lifebar":"src/hud/Lifebar.ts"}],"src/hud/HUDManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HUDManager =
/** @class */
function () {
  function HUDManager() {}

  HUDManager.setHUD = function (hud) {
    this._hud = hud;
  };

  HUDManager.getHUDInstance = function () {
    return this._hud;
  };

  return HUDManager;
}();

exports.default = HUDManager;
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
},{}],"src/utils/classConstants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLASS_WIZARD = exports.CLASS_HERO = exports.CLASS_CHARACTER = void 0;
exports.CLASS_CHARACTER = "Character";
exports.CLASS_HERO = "Hero";
exports.CLASS_WIZARD = "Wizard";
},{}],"src/character/Character.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterState = void 0;

var directions_1 = require("../utils/directions");

var classConstants_1 = require("../utils/classConstants");

var CharacterState;

(function (CharacterState) {
  CharacterState[CharacterState["IDLE"] = 0] = "IDLE";
  CharacterState[CharacterState["START"] = 1] = "START";
  CharacterState[CharacterState["MOVING"] = 2] = "MOVING";
  CharacterState[CharacterState["END_MOVE"] = 3] = "END_MOVE";
})(CharacterState = exports.CharacterState || (exports.CharacterState = {}));

var Character =
/** @class */
function () {
  function Character(map, x, y, isMoving
  /* , w: number = 0, h: number = 0 */
  ) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (isMoving === void 0) {
      isMoving = false;
    }

    this.vX = 0;
    this.vY = 0;
    this.isCurrentTurn = false;
    this.isActive = false;
    this.currentMovingTargetY = 0;
    this.currentMovingTargetX = 0;
    this.state = CharacterState.IDLE;
    this._MOVE_TOWARDS_SPEED = 5;
    this.class = classConstants_1.CLASS_CHARACTER;
    /*     public w: number;
        public h: number; */

    this.tilemapEntry = "floor";
    this.x = x;
    this.y = y;
    this.uuid = this.generateUUID();
    this.isMoving = isMoving;
    this.currentPath = [];
    this.currentMap = map;
    /*         this.w = w;
            this.h = h; */
  }

  Character.prototype.generateUUID = function () {
    var sGuid = "";

    for (var i = 0; i < 32; i++) {
      sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
    }

    return sGuid;
  };

  Character.prototype.move = function () {
    if (this.isMoving) {
      this.moveTowards();
    }
  };

  Character.prototype.moveTowards = function ()
  /* x: number, y: number */
  {
    if (this.currentPath.length > 0) {
      this.state = CharacterState.MOVING;
      var target = this.currentPath[0];
      this.targetVelocity(target);
      var xPosition = Math.floor(this.x / this.currentMap.levelTileWidth);
      var yPosition = Math.floor(this.y / this.currentMap.levelTileHeight);
      this.y += this.vY;
      this.x += this.vX;
      this.vX = 0;
      this.vY = 0;

      if (xPosition === target[0] && yPosition === target[1]) {
        this.currentPath.shift();
      }
    } else {
      this.isMoving = false;
      this.state = CharacterState.END_MOVE;
    }
  };

  Character.prototype.targetVelocity = function (target) {
    switch (target[2]) {
      /* é a direção */
      case directions_1.Directions.UP:
        this.vY = -this._MOVE_TOWARDS_SPEED;
        break;

      case directions_1.Directions.DOWN:
        this.vY = +this._MOVE_TOWARDS_SPEED;
        break;

      case directions_1.Directions.LEFT:
        this.vX = -this._MOVE_TOWARDS_SPEED;
        break;

      case directions_1.Directions.RIGHT:
        this.vX = +this._MOVE_TOWARDS_SPEED;
        break;

      case directions_1.Directions.NONE:
        this.vX = 0;
        this.vY = 0;
        break;
    }
  };

  Character.prototype.calculatePath = function (map) {
    /* Limpando o caminho */
    this.currentPath = [];
    var targetCoords = [Math.floor(this.currentMovingTargetX / map.levelTileWidth), Math.floor(this.currentMovingTargetY / map.levelTileHeight)];
    var playerCoords = [Math.floor(this.x / map.levelTileWidth), Math.floor(this.y / map.levelTileHeight)];
    var currentTile = playerCoords;
    /*
    Vai caminhando conforme a diferença entre os eixos
    Vai diminuindo a diferença a partir dos maiores
    */

    do {
      var targetX = targetCoords[0];
      var targetY = targetCoords[1];
      var currentX = currentTile[0];
      var currentY = currentTile[1];
      var diffX = Math.abs(targetX - currentX);
      var diffY = Math.abs(targetY - currentY);
      var direction = directions_1.Directions.NONE;

      if (diffX > diffY) {
        if (targetCoords[0] > currentTile[0]) {
          currentTile = [currentTile[0] + 1, currentTile[1]];
          direction = directions_1.Directions.RIGHT;
        } else {
          currentTile = [currentTile[0] - 1, currentTile[1]];
          direction = directions_1.Directions.LEFT;
        }
      } else {
        if (targetCoords[1] > currentTile[1]) {
          currentTile = [currentTile[0], currentTile[1] + 1];
          direction = directions_1.Directions.DOWN;
        } else {
          currentTile = [currentTile[0], currentTile[1] - 1];
          direction = directions_1.Directions.UP;
        }
      }

      this.currentPath.push([currentTile[0], currentTile[1], direction]);
    } while (currentTile[0] !== targetCoords[0] || currentTile[1] !== targetCoords[1]);
  };

  Character.prototype.startMovingTo = function (x, y, map) {
    this.state = CharacterState.MOVING;
    this.isMoving = true;
    this.currentMovingTargetX = x;
    this.currentMovingTargetY = y;
    this.calculatePath(map);
  };

  Character.prototype.getCharacterClass = function () {
    return this.class;
  };

  return Character;
}();

exports.default = Character;
},{"../utils/directions":"src/utils/directions.ts","../utils/classConstants":"src/utils/classConstants.ts"}],"src/character/Player.ts":[function(require,module,exports) {
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

var classConstants_1 = require("../utils/classConstants");

var constants_1 = require("../utils/constants");

var directions_1 = require("../utils/directions");

var Character_1 = __importDefault(require("./Character"));

var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player(map) {
    var _this = _super.call(this, map) || this;

    _this.currentDirection = directions_1.Directions.NONE;
    _this.lastDirection = directions_1.Directions.DOWN;
    _this.tilemapEntry = "player";
    _this.x = 0;
    _this.y = 0;
    _this.class = classConstants_1.CLASS_HERO;
    _this.isCurrentTurn = true;
    return _this;
  }

  Player.prototype.setVelocity = function (direction) {
    this.currentDirection = direction;

    if (direction !== directions_1.Directions.NONE) {
      this.lastDirection = direction;
    }

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
    var levelTileHeight = level.map.levelTileHeight;
    var playerWidth = levelTileWidth / constants_1.SHRINK_FACTOR;
    var playerHeight = levelTileHeight / constants_1.SHRINK_FACTOR;
    var cXE = Math.floor((this.x + this.vX) / levelTileWidth);
    var cXD = Math.floor((this.x + this.vX + playerWidth) / levelTileWidth);
    var cYC = Math.floor((this.y + this.vY) / levelTileHeight);
    var cYB = Math.floor((this.y + this.vY + playerHeight) / levelTileHeight);
    if (cYC < 0 || cYC > level.map.height - 1) return true;

    if (objMatrix[cYC][cXE] === 1) {
      return false;
    } else if (objMatrix[cYC][cXD] === 1) {
      return false;
    } else if (objMatrix[cYB][cXE] === 1) {
      return false;
    } else if (objMatrix[cYB][cXD] === 1) {
      return false;
    }

    return true;
  };

  Player.prototype.checkBoundaries = function (level) {
    var levelTileWidth = level.map.levelTileWidth;
    var levelTileHeight = level.map.levelTileHeight;
    var cX = Math.floor((this.x + this.vX + levelTileWidth / 2) / levelTileWidth);
    var cY = Math.floor((this.y + this.vY + levelTileHeight / 2) / levelTileHeight);

    if (cX < 0) {
      this.x = constants_1.WINDOW_WIDTH - levelTileWidth;
      this.y = level.player.y;
      return directions_1.Directions.LEFT;
    } else if (cY < 0) {
      this.y = constants_1.WINDOW_HEIGHT - levelTileWidth;
      return directions_1.Directions.UP;
    } else if (cX > level.map.width) {
      this.x = 0;
      this.y = level.player.y;
      return directions_1.Directions.RIGHT;
    } else if (cY > level.map.height) {
      this.y = 0;
      return directions_1.Directions.DOWN;
    }

    return directions_1.Directions.NONE;
  };

  Player.prototype.interaction = function () {
    throw new Error("Method not implemented.");
  };

  Player.PLAYER_VELOCITY = 5;
  return Player;
}(Character_1.default);

exports.default = Player;
},{"../utils/classConstants":"src/utils/classConstants.ts","../utils/constants":"src/utils/constants.ts","../utils/directions":"src/utils/directions.ts","./Character":"src/character/Character.ts"}],"src/character/Wizard.ts":[function(require,module,exports) {
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

var HUDManager_1 = __importDefault(require("../hud/HUDManager"));

var classConstants_1 = require("../utils/classConstants");

var Character_1 = __importDefault(require("./Character"));

var Wizard =
/** @class */
function (_super) {
  __extends(Wizard, _super);

  function Wizard(map, x, y, speech
  /* , w: number = 0, h: number = 0 */
  ) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (speech === void 0) {
      speech = "";
    }

    var _this = _super.call(this, map, x, y) || this;

    _this.tilemapEntry = "wizard";
    _this._speech = speech;
    _this.class = classConstants_1.CLASS_WIZARD;
    return _this;
  }

  Wizard.prototype.setVelocity = function (direction) {
    throw new Error("Method not implemented.");
  };

  Wizard.prototype.interaction = function () {
    var hud = HUDManager_1.default.getHUDInstance();
    hud.dialogBox.setTextSource(this._speech);
  };

  return Wizard;
}(Character_1.default);

exports.default = Wizard;
},{"../hud/HUDManager":"src/hud/HUDManager.ts","../utils/classConstants":"src/utils/classConstants.ts","./Character":"src/character/Character.ts"}],"src/level/Battle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Battle =
/** @class */
function () {
  function Battle(characterList) {
    this.characterList = characterList;
    this.currentCharacter = characterList[0];
    this.nextCharacter = characterList[1];
    this.turnCount = 0;
  }

  Battle.prototype.updateBattle = function () {};

  return Battle;
}();

exports.default = Battle;
},{}],"src/level/Tile.ts":[function(require,module,exports) {
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
  player: new Tile_1.default(425, 0, 16, 16),
  wizard: new Tile_1.default(408, 0, 16, 16),
  cursor: new Tile_1.default(595, 204, 16, 16)
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
    this.height = 10;
    this.levelTileWidth = Math.floor(constants_1.WINDOW_WIDTH / this.width);
    this.levelTileHeight = Math.floor(constants_1.WINDOW_HEIGHT / this.height);
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
    var tilemapLength = Object.keys(Tilemap_1.default).length - 2;

    for (var i = 0; i < this.height; i++) {
      this.matrix.push([]);

      for (var j = 0; j < this.width; j++) {
        if (Math.random() < .1) this.matrix[i].push(Math.floor(Math.random() * (tilemapLength - 1)));
      }
    }
  };

  Map.prototype.initializeObjects = function () {
    for (var i = 0; i < this.height; i++) {
      this.objects.push([]);

      for (var j = 0; j < this.width; j++) {
        if (Math.random() < .01) this.objects[i].push(1);else this.objects[i].push(0);
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
exports.LevelState = void 0;

var Character_1 = require("../character/Character");

var Player_1 = __importDefault(require("../character/Player"));

var Wizard_1 = __importDefault(require("../character/Wizard"));

var directions_1 = require("../utils/directions");

var Battle_1 = __importDefault(require("./Battle"));

var Map_1 = __importDefault(require("./Map"));

var LevelState;

(function (LevelState) {
  LevelState[LevelState["NPC_TURN"] = 0] = "NPC_TURN";
  LevelState[LevelState["PLAYER_TURN"] = 1] = "PLAYER_TURN";
})(LevelState = exports.LevelState || (exports.LevelState = {}));

var Level =
/** @class */
function () {
  function Level(player) {
    this.map = new Map_1.default();
    this.player = player ? player : new Player_1.default(this.map);
    this.levelState = LevelState.NPC_TURN;
    var w1 = new Wizard_1.default(this.map, this.map.levelTileWidth * 2, this.map.levelTileHeight * 4, "Hello my name is Wizard fer ");
    var w2 = new Wizard_1.default(this.map, this.map.levelTileWidth * 7, this.map.levelTileHeight * 9, "Ha toma no cu viado du carai!");
    this.characters = [w1, w2, this.player];
    this.turnQueue = this.calculateFirstTurn();
    this.currentCharacterTurn = this.turnQueue.shift();
    this.battle = new Battle_1.default(this.characters);
  }

  Level.prototype.update = function () {
    var currentCharacter = this.characters[this.currentCharacterTurn];
    this.characters.forEach(function (c) {
      return c.isActive = false;
    });
    currentCharacter.isActive = true;

    if (this.levelState === LevelState.NPC_TURN) {
      if (currentCharacter.state === Character_1.CharacterState.MOVING) {
        currentCharacter.move();
      } else if (currentCharacter.state === Character_1.CharacterState.END_MOVE) {
        this.currentCharacterTurn = this.turnQueue.shift();
        var nextCharacter = this.characters[this.currentCharacterTurn];

        if (nextCharacter instanceof Player_1.default) {
          this.levelState = LevelState.PLAYER_TURN;
        } else {
          this.levelState = LevelState.NPC_TURN;
        }
      } else {
        var matrixValueX = Math.floor(Math.random() * this.player.x / this.map.levelTileWidth);
        var matrixValueY = Math.floor(Math.random() * this.player.y / this.map.levelTileHeight);
        currentCharacter.startMovingTo(matrixValueX * this.map.levelTileWidth, matrixValueY * this.map.levelTileHeight, this.map);
      }
    } else {
      if (currentCharacter.state === Character_1.CharacterState.MOVING) {
        currentCharacter.move();
      } else if (currentCharacter.state === Character_1.CharacterState.END_MOVE) {
        this.turnQueue = this.calculateFirstTurn();
        this.currentCharacterTurn = this.turnQueue.shift();
        this.levelState = LevelState.NPC_TURN;
      }
    }
  };

  Level.prototype.calculateFirstTurn = function () {
    this.characters.forEach(function (char) {
      return char.state = Character_1.CharacterState.IDLE;
    });
    return [0, 1, 2];
  };

  Level.prototype.playerInteraction = function () {
    switch (this.player.lastDirection) {
      case directions_1.Directions.DOWN:
        this.interact(this.player.x, this.player.y + this.map.levelTileHeight + this.map.levelTileHeight / 2);
        break;

      case directions_1.Directions.UP:
        this.interact(this.player.x, this.player.y - this.map.levelTileHeight / 2);
        break;

      case directions_1.Directions.LEFT:
        this.interact(this.player.x - this.map.levelTileWidth / 2, this.player.y);
        break;

      case directions_1.Directions.RIGHT:
        this.interact(this.player.x + this.map.levelTileWidth + this.map.levelTileWidth / 2, this.player.y);
        break;
    }
  };

  Level.prototype.interact = function (x, y) {
    var _this = this;

    this.characters.forEach(function (char) {
      if (x >= char.x && x < char.x + _this.map.levelTileWidth) {
        if (y >= char.y && y < char.y + _this.map.levelTileHeight) {
          char.interaction();
        }
      }
    });
  };

  Level.prototype.mouseInteraction = function (x, y) {
    /* Cálculo repetido */
    var matrixValueX = Math.floor(x / this.map.levelTileWidth);
    var matrixValueY = Math.floor(y / this.map.levelTileHeight);
    this.player.startMovingTo(matrixValueX * this.map.levelTileWidth, matrixValueY * this.map.levelTileHeight, this.map);
  };

  return Level;
}();

exports.default = Level;
},{"../character/Character":"src/character/Character.ts","../character/Player":"src/character/Player.ts","../character/Wizard":"src/character/Wizard.ts","../utils/directions":"src/utils/directions.ts","./Battle":"src/level/Battle.ts","./Map":"src/level/Map.ts"}],"src/animation/AnimationState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AnimationState =
/** @class */
function () {
  function AnimationState() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.startTime = window.performance.now();
  }

  return AnimationState;
}();

exports.default = AnimationState;
},{}],"src/animation/Animation.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = require("../core/Game");

var colors_1 = require("../utils/colors");

var constants_1 = require("../utils/constants");

var AnimationState_1 = __importDefault(require("./AnimationState"));

var Animation =
/** @class */
function () {
  function Animation(game, duration) {
    if (duration === void 0) {
      duration = 3000;
    }

    this.game = game;
    this.duration = duration;
    this.state = new AnimationState_1.default();
  }

  Animation.prototype.update = function () {
    this.state.elapsedTime = window.performance.now();
    var deltaTime = this.state.elapsedTime - this.state.startTime;
    if (deltaTime > this.duration) this.finish();
  };

  Animation.prototype.draw = function (ctx) {
    ctx.fillStyle = colors_1.Colors.RED;
    var deltaTime = (this.state.elapsedTime - this.state.startTime) / this.duration;
    var x = Math.sin(Math.PI * deltaTime) * constants_1.WINDOW_WIDTH;
    ctx.fillRect(0, 0, x, constants_1.WINDOW_HEIGHT);
  };

  Animation.prototype.finish = function () {
    /* Linkar Animacoes */
    this.game.currentGameStates = this.game.currentGameStates.filter(function (state) {
      return state === Game_1.GameStates.RUNNING;
    });
  };

  return Animation;
}();

exports.default = Animation;
},{"../core/Game":"src/core/Game.ts","../utils/colors":"src/utils/colors.ts","../utils/constants":"src/utils/constants.ts","./AnimationState":"src/animation/AnimationState.ts"}],"src/level/LevelLoader.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Animation_1 = __importDefault(require("../animation/Animation"));

var Game_1 = require("../core/Game");

var LevelLoader =
/** @class */
function () {
  function LevelLoader(game) {
    this.isLoading = false;
    this.hasLoaded = true;
    this._game = game;
  }

  LevelLoader.prototype.loadLevel = function (newLevel) {
    var _this = this;

    var animationTime = 2000;
    this._game.currentAnimation = new Animation_1.default(this._game, animationTime);
    this._game.currentGameStates = this._game.currentGameStates.filter(function (state) {
      return state !== Game_1.GameStates.INTRO;
    });
    this._game.gameAnimationState.isTransition = true;
    this._game.gameAnimationState.isIntro = false;
    this._game.isPaused = true;

    this._game.currentGameStates.push(Game_1.GameStates.ANIMATING);

    setTimeout(function () {
      _this._game.gameAnimationState.isRunning = true;
    }, animationTime / 2);
    setTimeout(function () {
      /* Tirando o intro dos estados */
      _this._game.currentGameStates = _this._game.currentGameStates.filter(function (state) {
        return state !== Game_1.GameStates.INTRO;
      });
      _this._game.gameAnimationState.isTransition = false;
      _this._game.isPaused = false;
    }, animationTime);
  };

  return LevelLoader;
}();

exports.default = LevelLoader;
},{"../animation/Animation":"src/animation/Animation.ts","../core/Game":"src/core/Game.ts"}],"src/core/AssetsLoader.ts":[function(require,module,exports) {
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
},{}],"src/event/MouseEvents.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MouseEvents =
/** @class */
function () {
  function MouseEvents(game) {
    this.game = game;
  }

  MouseEvents.prototype.init = function () {
    window.onmousemove = this.updateMouseCoords.bind(this);
    window.onclick = this.mouseClicked.bind(this);
  };

  MouseEvents.prototype.updateMouseCoords = function (e) {
    MouseEvents.mouseX = e.x;
    MouseEvents.mouseY = e.y;
  };

  MouseEvents.prototype.mouseClicked = function () {
    if (this.game.currentLevel) this.game.currentLevel.mouseInteraction(MouseEvents.mouseX, MouseEvents.mouseY);
  };

  MouseEvents.getMouseCoordinates = function () {
    return [MouseEvents.mouseX, MouseEvents.mouseY];
  };

  MouseEvents.mouseX = -100;
  MouseEvents.mouseY = -100;
  return MouseEvents;
}();

exports.default = MouseEvents;
},{}],"src/core/EventsManager.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var directions_1 = require("../utils/directions");

var MouseEvents_1 = __importDefault(require("../event/MouseEvents"));

var EventsManager =
/** @class */
function () {
  function EventsManager(game) {
    this.game = game;
    this.mouseEvent = new MouseEvents_1.default(game);
    this.initializeEvents();
    /* First mouse event */

    window.document.dispatchEvent(new Event("mousemove"));
  }
  /* TODO(tulio) */


  EventsManager.prototype.handleEvents = function () {
    throw new Error("Not Implemented");
  };

  EventsManager.prototype.initializeEvents = function () {
    var _this = this;

    this.mouseEvent.init();

    window.onkeydown = function (e) {
      var _a, _b, _c, _d, _e;

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

        case 'Control':
          (_e = _this.game.currentLevel) === null || _e === void 0 ? void 0 : _e.playerInteraction();
          break;

        case 'Enter':
          {
            if (_this.game.gameAnimationState.isIntro) {
              _this.game.isPaused = false;
              _this.game.gameAnimationState.isIntro = false;
            }

            break;
          }

        case 'Escape':
          {
            // if (this.game.currentGameState === GameStates.RUNNING) {
            //     this.game.currentGameState = GameStates.INTRO;
            // }
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
},{"../utils/directions":"src/utils/directions.ts","../event/MouseEvents":"src/event/MouseEvents.ts"}],"src/core/GameAnimationState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameAnimationState =
/** @class */
function () {
  function GameAnimationState() {
    this.isIntro = false;
    this.isTransition = false;
    this.isRunning = true;
    this.isDialog = false;
  }

  return GameAnimationState;
}();

exports.default = GameAnimationState;
},{}],"src/core/Renderer.ts":[function(require,module,exports) {
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

var colors_1 = require("../utils/colors");

var MouseEvents_1 = __importDefault(require("../event/MouseEvents"));

var Renderer =
/** @class */
function () {
  function Renderer() {
    this.introAlpha = 0.0;
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.cursor = 'none';
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.tileset = AssetsManager_1.default.tileset;
  }

  Renderer.prototype.setTileset = function (tileset) {
    this.tileset = tileset;
  };

  Renderer.prototype.clear = function () {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Renderer.prototype.clearAux = function () {};

  Renderer.prototype.drawIntro = function () {
    this.clear();
    this.ctx.fillStyle = colors_1.Colors.WHITE;
    this.ctx.save(); // if(this.introAlpha < 1.0)

    this.introAlpha += .1;
    this.ctx.globalAlpha = this.introAlpha;
    this.ctx.font = "72px Georgia";
    this.ctx.fillText("Big smile!", constants_1.WINDOW_WIDTH / 2, constants_1.WINDOW_HEIGHT / 2);
  };

  Renderer.prototype.drawAnimation = function (game) {
    var animation = game.currentAnimation;
    animation.update();
    animation.draw(this.ctx);
  };

  Renderer.prototype.drawHUD = function (game) {
    game.hud.draw(this.ctx);
  };

  Renderer.prototype.draw = function (game, level) {
    this.clear();
    this.drawBackground(level);
    this.drawObjects(level);
    this.drawCharacters(level);
    this.drawPlayer(level);
    this.drawCursor(level);
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
          _this.ctx.fillStyle = colors_1.Colors.WHITE;

          _this.ctx.fillRect(level.map.levelTileWidth * j, level.map.levelTileHeight * i, level.map.levelTileWidth, level.map.levelTileHeight);

          _this.ctx.fillStyle = colors_1.Colors.BLACK;
        }
      });
    });
  };

  Renderer.prototype.drawCharacters = function (level) {
    var _this = this;

    level.characters.forEach(function (char) {
      var tile = Tilemap_1.default[char.tilemapEntry];

      _this.ctx.fillRect(char.x, char.y, level.map.levelTileWidth, level.map.levelTileHeight);

      _this.ctx.drawImage(_this.tileset, tile.x, tile.y, tile.w, tile.h, char.x, char.y, level.map.levelTileWidth, level.map.levelTileHeight);
    });
  };

  Renderer.prototype.drawPlayer = function (level) {
    var shrinkFactor = 1.5;
    var tile = Tilemap_1.default[level.player.tilemapEntry];
    this.ctx.fillRect(level.player.x, level.player.y, level.map.levelTileWidth / constants_1.SHRINK_FACTOR, level.map.levelTileHeight / constants_1.SHRINK_FACTOR);
    this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h, level.player.x, level.player.y, level.map.levelTileWidth / constants_1.SHRINK_FACTOR, level.map.levelTileHeight / constants_1.SHRINK_FACTOR);
  };

  Renderer.prototype.drawCursor = function (level) {
    var tile = Tilemap_1.default['cursor'];

    var _a = MouseEvents_1.default.getMouseCoordinates(),
        x = _a[0],
        y = _a[1];

    x = Math.floor(x / level.map.levelTileWidth) * level.map.levelTileWidth;
    y = Math.floor(y / level.map.levelTileHeight) * level.map.levelTileHeight;
    this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h, x, y, level.map.levelTileWidth, level.map.levelTileHeight);
  };

  Renderer.CLEAR_COLOR = "#000000";
  return Renderer;
}();

exports.default = Renderer;
},{"./AssetsManager":"src/core/AssetsManager.ts","../level/Tilemap":"src/level/Tilemap.ts","../utils/constants":"src/utils/constants.ts","../utils/colors":"src/utils/colors.ts","../event/MouseEvents":"src/event/MouseEvents.ts"}],"src/core/Game.ts":[function(require,module,exports) {
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

var HUD_1 = __importDefault(require("../hud/HUD"));

var HUDManager_1 = __importDefault(require("../hud/HUDManager"));

var Level_1 = __importDefault(require("../level/Level"));

var LevelLoader_1 = __importDefault(require("../level/LevelLoader"));

var directions_1 = require("../utils/directions");

var AssetsLoader_1 = __importDefault(require("./AssetsLoader"));

var AssetsManager_1 = __importDefault(require("./AssetsManager"));

var EventsManager_1 = __importDefault(require("./EventsManager"));

var GameAnimationState_1 = __importDefault(require("./GameAnimationState"));

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
    this.isRunning = true;
    this.isPaused = false;
    /* TODO(tulio) - tirar futuramente, por conta do carregamento duplo */

    this.currentLevel = new Level_1.default();
    this.currentAnimation = null;
    this._assetsLoader = new AssetsLoader_1.default();
    this._renderer = new Renderer_1.default();
    this._eventsManager = new EventsManager_1.default(this);
    this.hud = new HUD_1.default(this);
    this.levelLoader = new LevelLoader_1.default(this);
    this.currentGameStates = [GameStates.INTRO];
    this.gameAnimationState = new GameAnimationState_1.default();
    this.initializeGame();
  }

  Game.prototype.initializeGame = function () {
    var _this = this;

    var tileset = this._assetsLoader.loadAssets();

    tileset.onload = function () {
      AssetsManager_1.default.tileset = tileset;

      _this._renderer.setTileset(tileset);

      _this.isRunning = true;
      requestAnimationFrame(_this.run.bind(_this));
    };

    HUDManager_1.default.setHUD(this.hud);
  };

  Game.prototype.update = function () {
    var _a, _b, _c, _d, _e;
    /* TODO(tulio) - Melhorar */


    if (!this.isPaused) {
      if (this.gameAnimationState.isIntro) {} else {
        if ((_a = this.currentLevel) === null || _a === void 0 ? void 0 : _a.player.checkCollision(this.currentLevel)) {
          if (((_b = this.currentLevel) === null || _b === void 0 ? void 0 : _b.player.checkBoundaries(this.currentLevel)) === directions_1.Directions.NONE) {
            (_c = this.currentLevel) === null || _c === void 0 ? void 0 : _c.player.move();
          } else {
            this.levelLoader.loadLevel();
            this.currentLevel = new Level_1.default((_d = this.currentLevel) === null || _d === void 0 ? void 0 : _d.player);
          }
        }

        (_e = this.currentLevel) === null || _e === void 0 ? void 0 : _e.update();
      }
    }
  };

  Game.prototype.draw = function () {
    /* A ordem importa */
    if (this.gameAnimationState.isIntro) {
      this._renderer.drawIntro();
    }

    if (this.gameAnimationState.isRunning) {
      this._renderer.draw(this, this.currentLevel);
    }
    /* if (this.gameAnimationState.isDialog) { */


    this._renderer.drawHUD(this);
    /* } */


    if (this.gameAnimationState.isTransition) {
      this._renderer.drawAnimation(this);
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
},{"../hud/HUD":"src/hud/HUD.ts","../hud/HUDManager":"src/hud/HUDManager.ts","../level/Level":"src/level/Level.ts","../level/LevelLoader":"src/level/LevelLoader.ts","../utils/directions":"src/utils/directions.ts","./AssetsLoader":"src/core/AssetsLoader.ts","./AssetsManager":"src/core/AssetsManager.ts","./EventsManager":"src/core/EventsManager.ts","./GameAnimationState":"src/core/GameAnimationState.ts","./Renderer":"src/core/Renderer.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict"; // import '../typescript_notes/typescriptNotes';

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52021" + '/');

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