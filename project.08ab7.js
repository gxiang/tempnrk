__require = function e(t, o, n) {
    function i(a, s) {
        if (!o[a]) {
            if (!t[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1],
                !t[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!s && l)
                        return l(c, !0);
                    if (r)
                        return r(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var p = o[a] = {
                exports: {}
            };
            t[a][0].call(p.exports, function(e) {
                return i(t[a][1][e] || e)
            }, p, p.exports, e, t, o, n)
        }
        return o[a].exports
    }
    for (var r = "function" == typeof __require && __require, a = 0; a < n.length; a++)
        i(n[a]);
    return i
}({
    AEToolAnimation: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "54cbcFtkL5KtZK6JGj1Vpa/", "AEToolAnimation"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/IDE")
          , i = e("../../configs/BaseConfig")
          , r = e("./AEToolData")
          , a = e("./AEToolPlayer")
          , s = e("../../common/MapES5")
          , c = cc.Boolean
          , l = cc.js.isNumber
          , p = cc._decorator
          , u = p.ccclass
          , h = p.property
          , d = p.menu
          , f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._data = null,
                t.src = null,
                t.autoPlay = !1,
                t._isInitWhenStart = !0,
                t._aniData = new r.default,
                t._rate = 1,
                t._maxFrame = 0,
                t._isPlay = !1,
                t._subAnim = !1,
                t._targetLoopNum = 0,
                t._loopNum = 0,
                t._completedCallback = null,
                t._layerNameMapAniPlayer = null,
                t._aniPlayers = null,
                t._frame = 0,
                t._time = 0,
                t._rateCnt = 0,
                t
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "data", {
                get: function() {
                    return this._data
                },
                set: function(e) {
                    var t = this;
                    n.default.GetAssetsUrlByUuid(e._uuid, function(o, i) {
                        if (o)
                            n.default.Error(o);
                        else {
                            var r = (i = i.replace(/\\/g, "/")).substring(i.indexOf("resources/") + 10, i.indexOf(e.name + ".json"));
                            t.src = r
                        }
                    }),
                    this._data = e
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.start = function() {
                this._isInitWhenStart && (console.log("init when start"),
                this.init())
            }
            ,
            t.prototype.init = function() {
                if (!this.data)
                    return console.warn("json data is null");
                this._aniData.Parse(this.data, this.src),
                this._rate = Math.round(i.default.frameRate / this._aniData.rate),
                this._maxFrame = Math.ceil(this._aniData.duration * this._aniData.rate),
                l(this._aniData.width) && (this.node.width = this._aniData.width),
                l(this._aniData.height) && (this.node.height = this._aniData.height),
                this.node.anchorX = 0,
                this.node.anchorY = 0,
                this._createPlayers(),
                !this._subAnim && this.autoPlay && this.play()
            }
            ,
            t.prototype._createPlayers = function() {
                this._aniPlayers = new Array,
                this._layerNameMapAniPlayer = new s.default;
                for (var e = 0; e < this._aniData.nodes.length; e++)
                    if ("container" === this._aniData.nodes[e].type) {
                        if (1 !== this._aniData.nodes.length)
                            return console.error("container animation only support one layer");
                        this._aniPlayers.push(this.node.addComponent(a.default)),
                        this._layerNameMapAniPlayer.set(this._aniData.nodes[e].name, this._aniPlayers[e]),
                        this._aniPlayers[e].setData(this._aniData.nodes[e]),
                        this._aniPlayers[e].init(this.src)
                    } else {
                        var t = new cc.Node;
                        this._aniPlayers.push(t.addComponent(a.default)),
                        this._layerNameMapAniPlayer.set(this._aniData.nodes[e].name, this._aniPlayers[e]),
                        this._aniPlayers[e].setData(this._aniData.nodes[e]),
                        this._aniPlayers[e].init(this.src),
                        this.node.addChild(t)
                    }
                this.gotoFrame(0)
            }
            ,
            t.prototype._play = function() {
                this.gotoFrame(this._frame)
            }
            ,
            t.prototype.update = function(e) {
                this._subAnim || this._isPlay && (this._rateCnt = (this._rateCnt + 1) % this._rate,
                0 == this._rateCnt && (this._frame++,
                this._frame >= this._maxFrame ? (this._frame %= this._maxFrame,
                this._targetLoopNum > 0 ? (this._loopNum++,
                this._loopNum >= this._targetLoopNum ? (this.stop(),
                this._completedCallback && this._completedCallback()) : this._play()) : this._play()) : this._play()))
            }
            ,
            t.prototype.play = function(e, t) {
                if (void 0 === e && (e = 0),
                void 0 === t && (t = null),
                this._completedCallback = t,
                this.setLoopNum(e),
                this._loopNum = 0,
                this._frame = 0,
                this._isPlay = !0,
                this._aniPlayers)
                    for (var o = 0; o < this._aniPlayers.length; o++)
                        this._aniPlayers[o].play()
            }
            ,
            t.prototype.stop = function() {
                if (this._aniPlayers) {
                    for (var e = 0; e < this._aniPlayers.length; e++)
                        this._aniPlayers[e].stop();
                    this._isPlay = !1
                }
            }
            ,
            t.prototype.pause = function() {
                for (var e = 0; e < this._aniPlayers.length; e++)
                    this._aniPlayers[e].pause();
                this._isPlay = !1
            }
            ,
            t.prototype.resume = function(e) {
                void 0 === e && (e = null),
                this._completedCallback = e;
                for (var t = 0; t < this._aniPlayers.length; t++)
                    this._aniPlayers[t].resume();
                this._isPlay = !0
            }
            ,
            t.prototype.setSubAnim = function() {
                this._subAnim = !0
            }
            ,
            t.prototype.gotoFrame = function(e) {
                if (this._aniPlayers) {
                    this._frame = e;
                    for (var t = 0; t < this._aniPlayers.length; t++)
                        this._aniPlayers[t].gotoFrame(e)
                }
            }
            ,
            t.prototype.updatePlayerSpriteFrame = function(e) {
                var t = e.layerName
                  , o = e.frameIndex
                  , n = e.spriteFrame
                  , i = e.width
                  , r = e.height
                  , a = this._layerNameMapAniPlayer.get(t);
                if (!a)
                    return console.error("layer not found");
                var s = n.getRect();
                a.node.width = i || s.width,
                a.node.height = r || s.height,
                a.updateSpriteFrame(o, n)
            }
            ,
            t.prototype.replaceNode = function(e) {
                var t = e.layerName
                  , o = e.node
                  , n = this._layerNameMapAniPlayer.get(t);
                if (!n)
                    return console.error("layer not found");
                for (var i = -1, r = 0; r < this._aniPlayers.length; r++)
                    if (n == this._aniPlayers[r]) {
                        i = r;
                        break
                    }
                var s = o.addComponent(a.default);
                s.setData(n.getData()),
                s.init(this.src, !1),
                this._layerNameMapAniPlayer.set(t, s),
                i >= 0 && (this._aniPlayers[i] = s),
                n.node.destroy()
            }
            ,
            t.prototype.setLoopNum = function(e) {
                this._targetLoopNum = e
            }
            ,
            t.prototype.setIsInitWhenStart = function(e) {
                this._isInitWhenStart = e
            }
            ,
            t.prototype.setPlaySpeed = function(e) {
                e <= 0 || (this._rate = Math.round(Math.round(i.default.frameRate / this._aniData.rate) / e))
            }
            ,
            t.prototype.getCurrentFrame = function() {
                return this._frame
            }
            ,
            __decorate([h({
                type: cc.JsonAsset,
                visible: !1
            })], t.prototype, "_data", void 0),
            __decorate([h({
                type: String,
                visible: !1
            })], t.prototype, "src", void 0),
            __decorate([h({
                type: cc.JsonAsset
            })], t.prototype, "data", null),
            __decorate([h(c)], t.prototype, "autoPlay", void 0),
            t = __decorate([u, d("\u5a92\u4f53\u521b\u610f/\u52a8\u753b\u7ec4\u4ef6/Simple AETool")], t)
        }(cc.Component);
        o.default = f,
        cc._RF.pop()
    }
    , {
        "../../common/IDE": "IDE",
        "../../common/MapES5": "MapES5",
        "../../configs/BaseConfig": "BaseConfig",
        "./AEToolData": "AEToolData",
        "./AEToolPlayer": "AEToolPlayer"
    }],
    AEToolData: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "52d0d0qbVdEOo3OPLS+zG10", "AEToolData"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./AEToolNode")
          , i = function() {
            function e() {
                this._data = null,
                this.width = 0,
                this.height = 0,
                this.rate = 0,
                this.duration = 0,
                this.nodes = null
            }
            return e.prototype.Parse = function(e, t) {
                var o = e.json;
                this._data = o,
                this._parseAni(t)
            }
            ,
            e.prototype._parseAni = function(e) {
                var t = this._data
                  , o = t.width
                  , n = t.height
                  , i = t.rate
                  , r = t.duration
                  , a = t.layers;
                this.width = o,
                this.height = n,
                this.rate = i,
                this.duration = r,
                this._parseLayers(a, e)
            }
            ,
            e.prototype._parseLayers = function(e, t) {
                this.nodes = new Array;
                for (var o = 0; o < e.length; o++)
                    this.nodes.push(new n.default(e[o],t))
            }
            ,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./AEToolNode": "AEToolNode"
    }],
    AEToolFrame: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "9072eQL+bZMJpT+BDB45pZh", "AEToolFrame"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {
                this.anchorX = void 0,
                this.anchorY = void 0,
                this.x = void 0,
                this.y = void 0,
                this.rotation = void 0,
                this.scaleX = void 0,
                this.scaleY = void 0,
                this.alpha = void 0,
                this.visible = void 0,
                this.spriteFrame = void 0,
                this._img = "",
                this._src = ""
            }
            return e.prototype.setData = function(e, t) {
                for (var o in this._src = t,
                e)
                    this[o] = e[o]
            }
            ,
            Object.defineProperty(e.prototype, "img", {
                get: function() {
                    return this._img
                },
                set: function(e) {
                    e.lastIndexOf(".") >= 0 ? this._img = this._src + e.substring(0, e.lastIndexOf(".")) : this._img = ""
                },
                enumerable: !0,
                configurable: !0
            }),
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    AEToolNode: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "01877U6gw5KG6mfA9YVP2Mh", "AEToolNode"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/MapES5")
          , i = e("./AEToolFrame")
          , r = function() {
            return function(e, t) {
                this.name = "",
                this.width = 0,
                this.height = 0,
                this.frames = null,
                this.anim = !1,
                this.json = "",
                this.type = "";
                var o = e.name
                  , r = e.width
                  , a = e.height
                  , s = e.frames
                  , c = e.type
                  , l = e.json;
                for (var p in this.name = o,
                this.width = r,
                this.height = a,
                this.type = c,
                this.anim = "anim" == c,
                this.json = t + l,
                this.frames = new n.default,
                s) {
                    var u = new i.default;
                    u.setData(s[p], t),
                    this.frames.set(parseInt(p), u)
                }
            }
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "../../common/MapES5": "MapES5",
        "./AEToolFrame": "AEToolFrame"
    }],
    AEToolPlayer: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f8bf0nlmf1HOJ4KLnxiMQGu", "AEToolPlayer"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./AEToolAnimation")
          , i = cc.js.isNumber
          , r = cc._decorator.ccclass
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._sprite = null,
                t._data = null,
                t._animation = null,
                t
            }
            return __extends(t, e),
            t.prototype.updateSpriteFrame = function(e, t) {
                var o = this._data.frames.get(e);
                o ? o.spriteFrame = t : console.error("frame not found")
            }
            ,
            t.prototype.setData = function(e) {
                this._data = e
            }
            ,
            t.prototype.getData = function() {
                return this._data
            }
            ,
            t.prototype.init = function(e, t) {
                void 0 === t && (t = !0);
                var o = this._data
                  , r = o.name
                  , a = o.width
                  , s = o.height
                  , c = o.anim
                  , l = o.json;
                this.node.name = r,
                i(a) && (this.node.width = a),
                i(s) && (this.node.height = s),
                "container" !== this._data.type && (!this._sprite && t && (this._sprite = this.node.addComponent(cc.Sprite),
                this._sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                this._sprite.trim = !1),
                c && (this._animation = this.node.addComponent(n.default),
                this._animation.setSubAnim(),
                this._animation.data = cc.loader.getRes(l, cc.JsonAsset),
                this._animation.src = e,
                this._animation.init()))
            }
            ,
            t.prototype.gotoFrame = function(e) {
                var t = this._data.frames.get(e);
                if (t) {
                    var o = t.anchorX
                      , n = t.anchorY
                      , i = t.x
                      , r = t.y
                      , a = t.rotation
                      , s = t.scaleX
                      , c = t.scaleY
                      , l = t.alpha
                      , p = t.visible
                      , u = t.img;
                    this.node.anchorX = isNaN(o) ? this.node.anchorX : o,
                    this.node.anchorY = isNaN(n) ? this.node.anchorY : n,
                    this.node.x = isNaN(i) ? this.node.x : i,
                    this.node.y = isNaN(r) ? this.node.y : r,
                    this.node.rotation = isNaN(a) ? this.node.rotation : a,
                    this.node.scaleX = isNaN(s) ? this.node.scaleX : s,
                    this.node.scaleY = isNaN(c) ? this.node.scaleY : c,
                    isNaN(l) || (this.node.opacity = 255 * l),
                    void 0 != p && (this.node.active = p),
                    "container" !== this._data.type && (void 0 != u && "" != u && this._sprite && (this._sprite.spriteFrame = cc.loader.getRes(u, cc.SpriteFrame),
                    null == this._sprite.spriteFrame && console.warn("missing image:", u)),
                    t.spriteFrame && this._sprite && (this._sprite.spriteFrame = t.spriteFrame)),
                    this._animation && this._animation.gotoFrame(e)
                }
            }
            ,
            t.prototype.play = function() {
                this._animation && this._animation.play()
            }
            ,
            t.prototype.stop = function() {
                this._animation && this._animation.stop()
            }
            ,
            t.prototype.pause = function() {
                this._animation && this._animation.pause()
            }
            ,
            t.prototype.resume = function() {
                this._animation && this._animation.resume()
            }
            ,
            t = __decorate([r], t)
        }(cc.Component);
        o.default = a,
        cc._RF.pop()
    }
    , {
        "./AEToolAnimation": "AEToolAnimation"
    }],
    Alert: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "79736SK05NA8JehrT37hFOc", "Alert"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.title = null,
                t.content = null,
                t.btnConfirmText = null,
                t
            }
            return __extends(t, e),
            t.prototype.hide = function() {
                e.prototype.hide.call(this)
            }
            ,
            t.prototype.show = function(t) {
                e.prototype.show.call(this, t)
            }
            ,
            t.prototype.setInfo = function() {
                this.title.string = this.options.title,
                this.content.string = this.options.content,
                this.btnConfirmText.string = this.options.confirmText
            }
            ,
            t.prototype.onConfirm = function() {
                this.options && this.options.onConfirm && this.options.onConfirm(),
                this.hide()
            }
            ,
            __decorate([i(cc.Label)], t.prototype, "title", void 0),
            __decorate([i(cc.Label)], t.prototype, "content", void 0),
            __decorate([i(cc.Label)], t.prototype, "btnConfirmText", void 0),
            t = __decorate([n()], t)
        }(e("./ModalBase").default);
        o.default = r,
        cc._RF.pop()
    }
    , {
        "./ModalBase": "ModalBase"
    }],
    AnimationMachine: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b46c5PcIFxJv6c/wAW6O6Cx", "AnimationMachine"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../common/EventManager")
          , i = e("../common/MapES5")
          , r = e("./AETool/AEToolAnimation")
          , a = e("./AnimationState")
          , s = cc._decorator
          , c = s.ccclass
          , l = s.property
          , p = s.menu
          , u = cc.Enum({
            AETool: 1,
            Spine: 2
        })
          , h = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t._type = u.AETool,
                t.id = 0,
                t._loaded = !1,
                t._currentAnimState = null,
                t.src = "",
                t.dataList = new Array,
                t._animationMap = null,
                t._data = null,
                t.loadStatesFile = !0,
                t.stateJson = null,
                t.statesMap = null,
                t.defaultState = null,
                t.id = o.AnimationMachineCnt++,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            Object.defineProperty(t.prototype, "type", {
                get: function() {
                    return this._type
                },
                set: function(e) {
                    this._type = e
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.start = function() {
                this._loadStates(),
                this._createNodes(),
                this._loaded = !0,
                this._setDefaultState()
            }
            ,
            t.prototype._createNodes = function() {
                switch (this.type) {
                case u.AETool:
                    this._createAEToolNodes()
                }
            }
            ,
            t.prototype.setState = function(e) {
                this._currentAnimState && this._currentAnimState.animationName == e.animationName || (this._currentAnimState = e,
                this._currentAnimState && this._play(e.animationName))
            }
            ,
            t.prototype.nextState = function() {
                this._currentAnimState = this._currentAnimState.nextState,
                this._currentAnimState && this._play(this._currentAnimState.animationName)
            }
            ,
            t.prototype._play = function(e) {
                var t = this;
                if (this._loaded)
                    switch (this._currentAnimState.startEvent && n.default.instance.event(this._currentAnimState.startEvent, {
                        id: this.id
                    }),
                    this.type) {
                    case u.AETool:
                        this._playAETool(e)
                    }
                else
                    this.scheduleOnce(function() {
                        t._play(e)
                    }, .3)
            }
            ,
            t.prototype._playComplated = function() {
                this._currentAnimState.complatedEvent && n.default.instance.event(this._currentAnimState.complatedEvent, {
                    id: this.id
                }),
                this.nextState()
            }
            ,
            t.prototype._createAEToolNodes = function() {
                this._animationMap = new i.default;
                for (var e = 0; e < this.dataList.length; e++) {
                    var t = this.dataList[e].name
                      , o = new cc.Node;
                    o.name = t;
                    var n = o.addComponent(r.default);
                    n.data = this.dataList[e],
                    n.src = this.src,
                    n.autoPlay = !1,
                    this._animationMap.set(t, n),
                    this.node.addChild(o)
                }
            }
            ,
            t.prototype._playAETool = function(e) {
                var t = this;
                this._animationMap.forEach(function(o, n) {
                    n == e && (o.gotoFrame(0),
                    o.play(1, t._playComplated.bind(t))),
                    o.node.active = n == e
                })
            }
            ,
            Object.defineProperty(t.prototype, "data", {
                get: function() {
                    return this._data
                },
                set: function(e) {
                    this._data = e
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype._loadStates = function() {
                if (this.loadStatesFile) {
                    var e = this.stateJson.json
                      , t = e.defaultState
                      , o = e.states;
                    for (var n in this.statesMap = new i.default,
                    o)
                        this.statesMap.set(n, new a.default(n));
                    for (var n in this.defaultState = t ? this.statesMap.get(t) : null,
                    o) {
                        var r = o[n]
                          , s = r.next
                          , c = r.events
                          , l = c.start
                          , p = c.end
                          , u = this.statesMap.get(n);
                        u.nextState = s ? this.statesMap.get(s) : null,
                        u.startEvent = l,
                        u.complatedEvent = p
                    }
                }
            }
            ,
            t.prototype._setDefaultState = function() {
                this.loadStatesFile && this.setState(this.defaultState)
            }
            ,
            t.AnimationMachineCnt = 0,
            __decorate([l({
                type: cc.Enum(u),
                visible: !1
            })], t.prototype, "_type", void 0),
            __decorate([l({
                type: cc.Enum(u)
            })], t.prototype, "type", null),
            __decorate([l({
                visible: function() {
                    return this.type == u.AETool
                },
                displayName: "AE\u52a8\u753b\u6570\u636e\u76ee\u5f55"
            })], t.prototype, "src", void 0),
            __decorate([l({
                type: [cc.JsonAsset],
                visible: function() {
                    return this.type == u.AETool
                },
                displayName: "AE\u52a8\u753b\u6570\u636e"
            })], t.prototype, "dataList", void 0),
            __decorate([l({
                type: sp.SkeletonData,
                visible: !1
            })], t.prototype, "_data", void 0),
            __decorate([l({
                type: sp.SkeletonData,
                visible: function() {
                    return this.type == u.Spine
                },
                displayName: "AE\u52a8\u753b\u6570\u636e"
            })], t.prototype, "data", null),
            __decorate([l({
                displayName: "\u662f\u5426\u4f7f\u7528\u72b6\u6001\u673a\u6587\u4ef6"
            })], t.prototype, "loadStatesFile", void 0),
            __decorate([l({
                type: cc.JsonAsset,
                displayName: "\u72b6\u6001\u673a\u914d\u7f6e\u6587\u4ef6",
                visible: function() {
                    return this.loadStatesFile
                }
            })], t.prototype, "stateJson", void 0),
            t = o = __decorate([c, p("\u5a92\u4f53\u521b\u610f/\u52a8\u753b\u7ec4\u4ef6/\u52a8\u753b\u72b6\u6001\u673a")], t)
        }(cc.Component);
        o.default = h,
        cc._RF.pop()
    }
    , {
        "../common/EventManager": "EventManager",
        "../common/MapES5": "MapES5",
        "./AETool/AEToolAnimation": "AEToolAnimation",
        "./AnimationState": "AnimationState"
    }],
    AnimationManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b8791RjSYxMv663460MscQM", "AnimationManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator
          , i = n.ccclass
          , r = (n.property,
        function() {
            function e() {}
            return e = __decorate([i], e)
        }());
        o.default = r,
        cc._RF.pop()
    }
    , {}],
    AnimationState: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "59468iBv+5J7KXeEuI73pIH", "AnimationState"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            return function(e) {
                this.nextState = null,
                this.animationName = "",
                this.startEvent = null,
                this.complatedEvent = null,
                this.animationName = e
            }
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    Base64: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4bf38edOi5N3Zm/a2TN9jbL", "Base64"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.encode = function(t) {
                var o, n, i, r, a, s, c, l = "", p = 0;
                for (t = this._utf8_encode(t); p < t.length; )
                    r = (o = t.charCodeAt(p++)) >> 2,
                    a = (3 & o) << 4 | (n = t.charCodeAt(p++)) >> 4,
                    s = (15 & n) << 2 | (i = t.charCodeAt(p++)) >> 6,
                    c = 63 & i,
                    isNaN(n) ? s = c = 64 : isNaN(i) && (c = 64),
                    l = l + e._keyStr.charAt(r) + e._keyStr.charAt(a) + e._keyStr.charAt(s) + e._keyStr.charAt(c);
                return l
            }
            ,
            e.decode = function(t) {
                var o, n, i, r, a, s, c = "", l = 0;
                for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length; )
                    o = e._keyStr.indexOf(t.charAt(l++)) << 2 | (r = e._keyStr.indexOf(t.charAt(l++))) >> 4,
                    n = (15 & r) << 4 | (a = e._keyStr.indexOf(t.charAt(l++))) >> 2,
                    i = (3 & a) << 6 | (s = e._keyStr.indexOf(t.charAt(l++))),
                    c += String.fromCharCode(o),
                    64 !== a && (c += String.fromCharCode(n)),
                    64 !== s && (c += String.fromCharCode(i));
                return c = e._utf8_decode(c)
            }
            ,
            e._utf8_encode = function(e) {
                e = e.replace(/\r\n/g, "\n");
                for (var t = "", o = 0; o < e.length; o++) {
                    var n = e.charCodeAt(o);
                    n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192),
                    t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224),
                    t += String.fromCharCode(n >> 6 & 63 | 128),
                    t += String.fromCharCode(63 & n | 128))
                }
                return t
            }
            ,
            e._utf8_decode = function(e) {
                for (var t = "", o = 0, n = 0, i = 0, r = 0; o < e.length; )
                    (n = e.charCodeAt(o)) < 128 ? (t += String.fromCharCode(n),
                    o++) : n > 191 && n < 224 ? (i = e.charCodeAt(o + 1),
                    t += String.fromCharCode((31 & n) << 6 | 63 & i),
                    o += 2) : (i = e.charCodeAt(o + 1),
                    r = e.charCodeAt(o + 2),
                    t += String.fromCharCode((15 & n) << 12 | (63 & i) << 6 | 63 & r),
                    o += 3);
                return t
            }
            ,
            e._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    BaseConfig: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7fb4539x/9IFaaLGDYcqbeT", "BaseConfig"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../scripts/configs/ResourceConfig")
          , i = function() {
            function e() {}
            return e.init = function() {
                e.IsWebGL = cc._renderType != cc.game.RENDER_TYPE_CANVAS,
                e.IsWebGL ? e.ResourceConfig = n.WebGLRes : e.ResourceConfig = n.NormalRes
            }
            ,
            e.frameRate = 59,
            e.salt = "__ccc__",
            e.StageWidth = 750,
            e.StageHeight = 1624,
            e.UIZOrder = 999999,
            e.FlashScreen = !1,
            e.IsWebGL = !0,
            e.ResourceConfig = null,
            e.isMock = !1,
            e.battleServerUrl = "https://d90-flappy-bird-test1.apps.danlu.netease.com",
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "../../scripts/configs/ResourceConfig": "ResourceConfig"
    }],
    BaseUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e86e1TwUmtKqL5mVv8SRv3h", "BaseUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./UIManager")
          , i = cc._decorator
          , r = i.ccclass
          , a = (i.property,
        function(e) {
            function t() {
                var t = e.call(this) || this;
                return t._view = null,
                t.type = n.UIType.Normal,
                t.render = n.UIRender.Normal,
                t
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "view", {
                get: function() {
                    return this._view
                },
                set: function(e) {
                    this._view = e
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.init = function() {}
            ,
            t.prototype.show = function(e) {
                this.setZIndex(e),
                n.default.instance.showUI(this)
            }
            ,
            t.prototype.hide = function() {
                n.default.instance.hideUI(this)
            }
            ,
            t.prototype.setZIndex = function(e) {
                void 0 !== e && (this.view.zIndex = e)
            }
            ,
            t.uiName = "BaseUI",
            t = __decorate([r], t)
        }(cc.Component));
        o.default = a,
        cc._RF.pop()
    }
    , {
        "./UIManager": "UIManager"
    }],
    BaseUtils: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e63c0LIuEdG4rwOd6mHgnZJ", "BaseUtils"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.getQueryVariable = function(e) {
                for (var t = window.location.search.substring(1).split("&"), o = 0; o < t.length; o++) {
                    var n = t[o].split("=");
                    if (n[0] == e)
                        return n[1]
                }
                return ""
            }
            ,
            e.random = function(e) {
                return Math.floor(Math.random() * e)
            }
            ,
            e.removeChildren = function(e, t) {
                void 0 === t && (t = !0),
                e && (t ? e.destroyAllChildren() : e.removeAllChildren())
            }
            ,
            e.decodeData = function(e) {
                return "string" != typeof e ? e : JSON.parse(e)
            }
            ,
            e.encodeData = function(e) {
                return "object" != typeof e ? e : JSON.stringify(e)
            }
            ,
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    BlockController: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "584713+OhlF5bB+fk+GN1m1", "BlockController"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./ElementManager")
          , i = e("../mock/Block")
          , r = e("./BlockScript")
          , a = e("../../ccc-library/net/MicroGameSocket")
          , s = e("../common/Store")
          , c = e("./PropsManager")
          , l = e("./TeleportPropsManager")
          , p = e("../../ccc-library/configs/BaseConfig")
          , u = function() {
            function e() {
                this._elementManager = null,
                this._parent = null,
                this._elementManager = new n.default
            }
            return e.prototype.init = function(e) {
                var t = e.blocks
                  , o = e.prefab
                  , n = e.parent
                  , i = e.curDis;
                this.destroy(),
                this._parent = n,
                this.createBlocks({
                    blocks: t,
                    prefab: o,
                    curDis: i
                })
            }
            ,
            e.prototype.destroy = function() {
                this._elementManager && this._elementManager.destroy()
            }
            ,
            e.prototype.findBlockNearTeleport = function(e) {
                for (var t = null, o = null, n = null, i = null, s = 0; s < this._elementManager.elements.length; s++) {
                    var c = this._elementManager.elements[s]
                      , l = c.getCollision();
                    if (l) {
                        var u = e.x - l.x;
                        if (u < 0)
                            n || -u < p.default.StageWidth && l.y > 0 && (n = c.node.getComponent(r.default)),
                            i || -u < p.default.StageWidth && l.y < 0 && (i = c.node.getComponent(r.default));
                        else if (u < c.node.width + a.default.instance.config.battleCfg.teleportSize.width && (l.y > 0 ? t = c.node.getComponent(r.default) : o = c.node.getComponent(r.default)),
                        t && o && n && i)
                            break
                    }
                }
                return {
                    bottomBlock: o,
                    topBlock: t,
                    afterTopBlock: n,
                    afterBottomBlock: i
                }
            }
            ,
            e.prototype.findBlockAfterPlayer = function(e) {
                for (var t = null, o = null, n = 0; n < this._elementManager.elements.length; n++) {
                    var i = this._elementManager.elements[n]
                      , a = i.getCollision();
                    if (a) {
                        var s = a.x - e.x;
                        if (!(s < 0))
                            if (s < i.node.width + 2 * e.radius && (a.y > 0 ? t = i.node.getComponent(r.default) : o = i.node.getComponent(r.default)),
                            t && o)
                                break
                    }
                }
                return {
                    bottomBlock: o,
                    topBlock: t
                }
            }
            ,
            e.prototype.getBlocks = function() {
                return this._elementManager.elements
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._elementManager.fixUpdate(e)
            }
            ,
            e.prototype.createBlocks = function(e) {
                var t = this
                  , o = e.blocks
                  , n = e.prefab
                  , i = e.curDis;
                if (o.length) {
                    var r = this._parent;
                    o.forEach(function(e) {
                        var o = e.blockType
                          , a = t._createPropsInBlock(e, i);
                        (e.topRect && t._create({
                            data: e.topRect,
                            prefab: n,
                            parent: r,
                            curDis: i,
                            isVerticalMirror: !0,
                            blockType: a ? t._getPropsBlockType(e.sceneType) : o,
                            sceneType: e.sceneType,
                            blockNumber: e.blockNumber
                        }),
                        e.bottomRect) && t._create({
                            data: e.bottomRect,
                            prefab: n,
                            parent: r,
                            curDis: i,
                            isVerticalMirror: !1,
                            blockType: a ? t._getPropsBlockType(e.sceneType) : o,
                            sceneType: e.sceneType,
                            blockNumber: e.blockNumber
                        }).setProps(a)
                    })
                }
            }
            ,
            e.prototype._createPropsInBlock = function(e, t) {
                var o = null;
                return e.props && (o = s.default.isInTeleport ? l.default.instance.createOneProps({
                    props: e.props,
                    curDis: t
                }) : c.default.instance.createOneProps({
                    props: e.props,
                    curDis: t
                })),
                o
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                return null !== this._elementManager.detectImpactWithPlayer(e)
            }
            ,
            e.prototype.detectImpactWithBullet = function(e) {
                var t = this._elementManager.detectImpactWithBullet(e)
                  , o = null;
                return t && (o = t.node.getComponent(r.default)).destroySelf(!1),
                o
            }
            ,
            e.prototype._getPropsBlockType = function(e) {
                return e === i.SceneType.jkz ? i.BlockType.jkzProps : e === i.SceneType.hlg ? i.BlockType.hlgProps : e === i.SceneType.hyj ? i.BlockType.hyjProps : void 0
            }
            ,
            e.prototype._create = function(e) {
                var t = e.data
                  , o = e.prefab
                  , n = e.parent
                  , i = e.curDis
                  , s = e.isVerticalMirror
                  , c = e.blockType
                  , l = e.sceneType
                  , p = e.blockNumber
                  , u = __assign({}, t, {
                    height: a.default.instance.config.battleCfg.maxBlockHeight
                })
                  , h = this._elementManager.create({
                    data: u,
                    prefab: o,
                    parent: n,
                    curDis: i
                })
                  , d = h.node.getComponent(r.default);
                return d || (d = h.node.addComponent(r.default)),
                d.init({
                    elementScript: h,
                    blockType: c,
                    data: t,
                    rect: u,
                    isVerticalMirror: s,
                    sceneType: l,
                    blockNumber: p
                }),
                d
            }
            ,
            e
        }();
        o.default = u,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../common/Store": "Store",
        "../mock/Block": "Block",
        "./BlockScript": "BlockScript",
        "./ElementManager": "ElementManager",
        "./PropsManager": "PropsManager",
        "./TeleportPropsManager": "TeleportPropsManager"
    }],
    BlockManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2b979VJuFVFZIPNeHUedzJ7", "BlockManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./BlockController")
          , i = function() {
            function e() {
                this._blockController = null,
                this._blockController = new n.default
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                var t = e.blocks
                  , o = e.prefab
                  , n = e.parent
                  , i = e.curDis;
                this._blockController.init({
                    blocks: t,
                    prefab: o,
                    parent: n,
                    curDis: i
                })
            }
            ,
            e.prototype.destroy = function() {
                this._blockController.destroy()
            }
            ,
            e.prototype.findBlockBeforeTeleport = function(e) {
                return this._blockController.findBlockNearTeleport(e)
            }
            ,
            e.prototype.findBlockAfterPlayer = function(e) {
                return this._blockController.findBlockAfterPlayer(e)
            }
            ,
            e.prototype.getBlocks = function() {
                return this._blockController.getBlocks()
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._blockController.fixUpdate(e)
            }
            ,
            e.prototype.createBlocks = function(e) {
                var t = e.blocks
                  , o = e.prefab
                  , n = e.curDis;
                this._blockController.createBlocks({
                    blocks: t,
                    prefab: o,
                    curDis: n
                })
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                return this._blockController.detectImpactWithPlayer(e)
            }
            ,
            e.prototype.detectImpactWithBullet = function(e) {
                return !!this._blockController.detectImpactWithBullet(e)
            }
            ,
            e._instance = null,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./BlockController": "BlockController"
    }],
    BlockScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e769aefM9tKvZJYdLLFxXl/", "BlockScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("../../ccc-library/animation/NewAETool/NewAEToolAnimation")
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.propsScript = null,
                t._elementScript = null,
                t.data = null,
                t.rect = null,
                t.blockNumber = null,
                t._sceneType = null,
                t._blockType = null,
                t._isVerticalMirror = !1,
                t._recordOffsetY = 0,
                t.bgAnimation = null,
                t
            }
            return __extends(t, e),
            t.prototype.init = function(e) {
                var t = e.elementScript
                  , o = e.blockType
                  , n = e.data
                  , i = e.rect
                  , r = e.isVerticalMirror
                  , a = e.sceneType
                  , s = e.blockNumber;
                this._sceneType = a,
                this._elementScript = t,
                this.blockNumber = s,
                this.data = n,
                this.rect = i,
                r && this._verticalMirror(),
                this._offsetY(r),
                this.changeShape(o)
            }
            ,
            t.prototype.setProps = function(e) {
                this.propsScript = e,
                this._recordOffsetY && (this.propsScript.node.y += this._recordOffsetY,
                this._recordOffsetY = 0)
            }
            ,
            t.prototype.offsetY = function(e) {
                this.node.y += e,
                this._recordOffsetY = e,
                this.rect.y += e
            }
            ,
            t.prototype.changeShape = function(e) {
                if (null !== e && this._blockType !== e) {
                    this._blockType = e;
                    var t = cc.loader.getRes("main/prefabs/Blocks/" + e, cc.Prefab);
                    this.bgAnimation = cc.instantiate(t).getComponent(r.default),
                    this.bgAnimation.node.parent = this.node;
                    var o = i.default.instance.config.battleCfg.blockCollisionSizeConfig[e];
                    this._elementScript.changeCollisionWidth(o.width),
                    this._elementScript.changeCollisionHeight(o.height);
                    var n = this._isVerticalMirror ? -o.y : o.y;
                    this._elementScript.changeCollisionOffsetY(n)
                }
            }
            ,
            t.prototype.destroySelf = function(e) {
                var t = this;
                void 0 === e && (e = !0),
                this._elementScript && (this._elementScript.ignoreDetectImpact = !0),
                e ? (this.propsScript && this.propsScript.destroySelf(!0),
                this._elementScript && this._elementScript.destroySelf(!0)) : (this.propsScript && this.propsScript.destroySelf(),
                this._elementScript && this.bgAnimation.play(1, function() {
                    t._elementScript.destroySelf()
                }))
            }
            ,
            t.prototype.getSceneType = function() {
                return this._sceneType
            }
            ,
            t.prototype.getCollision = function() {
                return this._elementScript.getCollision()
            }
            ,
            t.prototype._verticalMirror = function() {
                this.node.setScale(1, -1)
            }
            ,
            t.prototype._offsetY = function(e) {
                this._isVerticalMirror = e,
                e ? this.node.y += (this.rect.height - this.data.height) / 2 : this.node.y -= (this.rect.height - this.data.height) / 2
            }
            ,
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/animation/NewAETool/NewAEToolAnimation": "NewAEToolAnimation",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket"
    }],
    Block: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "9e63eWa3PxDVJa2hAqK7whj", "Block"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e(e) {
                this.id = e
            }
            return e.prototype.getX = function() {
                return this.topRect.x || this.bottomRect.x || 0
            }
            ,
            e.prototype.getCenterY = function(e) {
                return ((this.topRect ? this.topRect.y : e / 2) + (this.bottomRect ? this.bottomRect.y : -e / 2)) / 2
            }
            ,
            e.prototype.getWidth = function() {
                return this.bottomRect.width || this.topRect.width || 0
            }
            ,
            e
        }();
        o.Block = n,
        function(e) {
            e.hyj = "hyj",
            e.hlg = "hlg",
            e.jkz = "jkz"
        }(o.SceneType || (o.SceneType = {})),
        function(e) {
            e.hyjProps = "hyjProps",
            e.hlgProps = "hlgProps",
            e.hlg1 = "hlg1",
            e.hlg2 = "hlg2",
            e.jkzProps = "jkzProps",
            e.jkz1 = "jkz1",
            e.jkz2 = "jkz2"
        }(o.BlockType || (o.BlockType = {})),
        cc._RF.pop()
    }
    , {}],
    BulletScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e78c1IXiNVKNZYRdFPld5iu", "BulletScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./CollisionCalculation")
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("../mock/Props")
          , a = cc._decorator.ccclass
          , s = 1
          , c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.id = null,
                t._collision = null,
                t.directRot = 0,
                t
            }
            return __extends(t, e),
            t.prototype.update = function(e) {
                this._move(e)
            }
            ,
            t.prototype.init = function(e) {
                this.directRot = e / 180 * Math.PI,
                this.id = s++,
                this._collision = new n.CircleCollision,
                this._collision.radius = this.node.width / 2,
                this._collision.y = this.node.y
            }
            ,
            t.prototype.getCollision = function() {
                return this._collision.x = this.node.x,
                this._collision.y = this.node.y,
                this._collision
            }
            ,
            t.prototype._move = function(e) {
                this.node.x += e * i.default.instance.config.battleCfg.propsConfig[r.PropsType.Nut].bulletSpeed * Math.cos(this.directRot),
                this.node.y += e * i.default.instance.config.battleCfg.propsConfig[r.PropsType.Nut].bulletSpeed * Math.sin(-this.directRot)
            }
            ,
            t = __decorate([a()], t)
        }(cc.Component);
        o.BulletScript = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../mock/Props": "Props",
        "./CollisionCalculation": "CollisionCalculation"
    }],
    CollisionCalculation: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "dc509sxGHZP3rZWP8aHQYBU", "CollisionCalculation"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.calBoxAndCircle = function(e, t) {
                var o = e.getCenter()
                  , n = t.getCenter()
                  , r = new i(Math.abs(o.x - n.x),Math.abs(o.y - n.y))
                  , s = new i(e.width / 2,e.height / 2)
                  , c = new i(Math.max(0, r.x - s.x),Math.max(0, r.y - s.y));
                return c.x * c.x + c.y * c.y <= t.radius * t.radius ? a.intersect : a.disjoint
            }
            ,
            e._instance = null,
            e
        }();
        o.default = n;
        var i = function() {
            return function(e, t) {
                void 0 === e && (e = 0),
                void 0 === t && (t = 0),
                this.x = 0,
                this.y = 0,
                this.x = e,
                this.y = t
            }
        }()
          , r = function() {
            function e() {
                this.x = 0,
                this.y = 0,
                this.width = 0,
                this.height = 0
            }
            return e.prototype.getCenter = function() {
                return new i(this.x,this.y)
            }
            ,
            e
        }();
        o.BoxCollision = r;
        var a, s = function() {
            function e() {
                this.x = 0,
                this.y = 0,
                this.radius = 0
            }
            return e.prototype.getCenter = function() {
                return new i(this.x,this.y)
            }
            ,
            e
        }();
        o.CircleCollision = s,
        function(e) {
            e[e.disjoint = 0] = "disjoint",
            e[e.intersect = 1] = "intersect"
        }(a = o.CollisionState || (o.CollisionState = {})),
        cc._RF.pop()
    }
    , {}],
    Confirm: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "3badc3XS5xFP4KS6Bye6ZqV", "Confirm"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.title = null,
                t.content = null,
                t.btnConfirmText = null,
                t.btnCancelText = null,
                t
            }
            return __extends(t, e),
            t.prototype.hide = function() {
                e.prototype.hide.call(this)
            }
            ,
            t.prototype.show = function(t) {
                e.prototype.show.call(this, t)
            }
            ,
            t.prototype.setInfo = function() {
                this.title.string = this.options.title,
                this.content.string = this.options.content,
                this.btnConfirmText.string = this.options.confirmText,
                this.btnCancelText.string = this.options.cancelText
            }
            ,
            t.prototype.onConfirm = function() {
                this.options && this.options.onConfirm && this.options.onConfirm(),
                this.hide()
            }
            ,
            t.prototype.onCancel = function() {
                this.options && this.options.onCancel && this.options.onCancel(),
                this.hide()
            }
            ,
            __decorate([i(cc.Label)], t.prototype, "title", void 0),
            __decorate([i(cc.Label)], t.prototype, "content", void 0),
            __decorate([i(cc.Label)], t.prototype, "btnConfirmText", void 0),
            __decorate([i(cc.Label)], t.prototype, "btnCancelText", void 0),
            t = __decorate([n()], t)
        }(e("./ModalBase").default);
        o.default = r,
        cc._RF.pop()
    }
    , {
        "./ModalBase": "ModalBase"
    }],
    ElementManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "726a1P95WpJOL9fm/sTkpB9", "ElementManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/net/MicroGameSocket")
          , i = e("./CollisionCalculation")
          , r = e("./ElementScript")
          , a = function() {
            function e() {
                this._elements = []
            }
            return Object.defineProperty(e.prototype, "elements", {
                get: function() {
                    return this._elements
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.fixUpdate = function(e) {
                var t = n.default.instance.config.battleCfg.gameSpeed * e;
                this._elements = this._elements.filter(function(e) {
                    return e.destroyFlag && e.node && e.destroySelf(),
                    !e.destroyFlag
                }),
                this._elements.forEach(function(e) {
                    return e.move(t)
                })
            }
            ,
            e.prototype.create = function(e) {
                var t = e.data
                  , o = e.prefab
                  , n = e.parent
                  , i = e.curDis;
                return this._createRect({
                    data: t,
                    prefab: o,
                    parent: n,
                    curDis: i
                })
            }
            ,
            e.prototype.remove = function(e) {
                this._elements = this._elements.filter(function(t) {
                    return t !== e
                })
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                return this._detectImpactWithGameObject(e.getCollision())
            }
            ,
            e.prototype.detectImpactWithBullet = function(e) {
                return this._detectImpactWithGameObject(e.getCollision())
            }
            ,
            e.prototype._detectImpactWithGameObject = function(e) {
                var t = null;
                return this._elements.some(function(o) {
                    var n = o.getCollision();
                    if (!n || o.ignoreDetectImpact)
                        return !1;
                    var r = i.default.instance.calBoxAndCircle(n, e);
                    return r === i.CollisionState.intersect && (t = o),
                    r === i.CollisionState.intersect
                }),
                t
            }
            ,
            e.prototype.delElementScript = function(e) {
                this._elements = this._elements.filter(function(t) {
                    return t !== e
                })
            }
            ,
            e.prototype.destroy = function() {
                this._elements.forEach(function(e) {
                    return e.destroySelf(!0)
                }),
                this._elements.length = 0
            }
            ,
            e.prototype._createRect = function(e) {
                var t = e.data
                  , o = e.prefab
                  , n = e.parent
                  , i = e.curDis
                  , a = cc.instantiate(o)
                  , s = a.getComponent(r.default);
                return s || (s = a.addComponent(r.default)),
                s.init(t, i),
                this._elements.push(s),
                n && n.addChild(a),
                s
            }
            ,
            e
        }();
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "./CollisionCalculation": "CollisionCalculation",
        "./ElementScript": "ElementScript"
    }],
    ElementScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ef394+3WTxC2bKPWsBodIzT", "ElementScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = e("./CollisionCalculation")
          , r = e("../../ccc-library/configs/BaseConfig")
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._collision = null,
                t._beforeDestroyHandler = null,
                t.ignoreDetectImpact = !1,
                t.destroyFlag = !1,
                t._collisionBox = null,
                t._collisionOffsetY = 0,
                t._collisionOffsetX = 0,
                t._speedX = 0,
                t._speedY = 0,
                t
            }
            return __extends(t, e),
            t.prototype.setBeforeDestroyHandler = function(e) {
                this._beforeDestroyHandler = e
            }
            ,
            t.prototype.init = function(e, t) {
                this._collision = new i.BoxCollision,
                this.node.x = e.x - t - r.default.StageWidth / 2,
                this.node.y = e.y,
                this.node.width = this._collision.width = e.width,
                this.node.height = this._collision.height = e.height,
                this._showCollisionBox()
            }
            ,
            t.prototype.getCollision = function() {
                return !this.node || this.destroyFlag ? null : (this._collision.y = this.node.y + this._collisionOffsetY,
                this._collision.x = this.node.x + this._collisionOffsetX,
                this._collision)
            }
            ,
            t.prototype.changeCollisionWidth = function(e) {
                this._collision.width = e,
                this._showCollisionBox()
            }
            ,
            t.prototype.changeCollisionHeight = function(e) {
                this._collision.height = e,
                this._showCollisionBox()
            }
            ,
            t.prototype.changeCollisionOffsetY = function(e) {
                this._collisionOffsetY = e || 0,
                this._showCollisionBox()
            }
            ,
            t.prototype.setSpeed = function(e, t) {
                this._speedY = t,
                this._speedX = e
            }
            ,
            t.prototype.moveBySpeed = function(e) {
                this.node && (this.node.x -= this._speedX * e,
                this.node.y -= this._speedY * e,
                (this.node.x < -r.default.StageWidth / 2 - this.node.width || this.node.y < -r.default.StageHeight / 2 - this.node.height) && this.destroySelf(!0))
            }
            ,
            t.prototype.move = function(e) {
                this.node && (this.node.x -= e,
                this.node.x < -r.default.StageWidth / 2 - this.node.width && this.destroySelf(!0))
            }
            ,
            t.prototype.movePos = function(e, t) {
                this.move(e),
                this.node.y -= t
            }
            ,
            t.prototype.destroySelf = function(e, t) {
                var o = this;
                void 0 === e && (e = !1),
                void 0 === t && (t = null),
                this.node ? this._beforeDestroyHandler && !e ? this._beforeDestroyHandler().then(function() {
                    o.destroyFlag = !0,
                    t && t(),
                    o.node.destroy()
                }) : (this.destroyFlag = !0,
                t && t(),
                this.node.destroy()) : this.destroyFlag = !0
            }
            ,
            t.prototype._showCollisionBox = function() {
                return null
            }
            ,
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "./CollisionCalculation": "CollisionCalculation"
    }],
    EnemyHand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ecc76NiujxH65yyqKjreJhG", "EnemyHand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./CollisionCalculation")
          , i = e("../../ccc-library/configs/BaseConfig")
          , r = e("../../ccc-library/net/MicroGameSocket")
          , a = e("../../ccc-library/animation/NewAETool/NewAEToolAnimation")
          , s = cc._decorator
          , c = s.ccclass
          , l = s.property
          , p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.emitAni = null,
                t.loopAni = null,
                t.cloudAni = null,
                t.hand = null,
                t._handInitY = 0,
                t.blockNumber = null,
                t._maxHeight = 0,
                t._collision = null,
                t._isEmit = !1,
                t._offsetY = 0,
                t._isLoop = !1,
                t
            }
            return __extends(t, e),
            t.prototype.getCollision = function() {
                var e = this._isLoop ? this._maxHeight : Math.max(this.hand.y + 250 - this._handInitY - this._offsetY, 0);
                return this._collision.height = e,
                this._collision.y = -i.default.StageHeight / 2 + e / 2,
                this._collision.x = this.node.x,
                this._collision
            }
            ,
            t.prototype.init = function(e, t, o) {
                this.blockNumber = o,
                this.node.x = t,
                this._offsetY = 900 - e,
                this._handInitY = this.hand.y,
                this.node.y = -i.default.StageHeight / 2 - this._offsetY,
                this._maxHeight = e,
                this.cloudAni.node.y += this._offsetY
            }
            ,
            t.prototype.start = function() {
                this._collision = new n.BoxCollision,
                this._collision.width = this.node.width,
                this.loopAni.node.active = !1,
                this.cloudAni.play()
            }
            ,
            t.prototype.fixUpdate = function(e) {
                this._move(e)
            }
            ,
            t.prototype.playOnce = function() {
                var e = this;
                this._isEmit || (this._isEmit = !0,
                this.emitAni.play(1, function() {
                    e.emitAni.node.active = !1,
                    e.loopAni.node.active = !0,
                    e._isLoop = !0,
                    e.loopAni.play()
                }))
            }
            ,
            t.prototype.destroySelf = function() {
                this.node.destroy()
            }
            ,
            t.prototype._move = function(e) {
                this.node.x -= e * r.default.instance.config.battleCfg.gameSpeed
            }
            ,
            __decorate([l(a.default)], t.prototype, "emitAni", void 0),
            __decorate([l(a.default)], t.prototype, "loopAni", void 0),
            __decorate([l(a.default)], t.prototype, "cloudAni", void 0),
            __decorate([l(cc.Node)], t.prototype, "hand", void 0),
            t = __decorate([c], t)
        }(cc.Component);
        o.default = p,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/animation/NewAETool/NewAEToolAnimation": "NewAEToolAnimation",
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "./CollisionCalculation": "CollisionCalculation"
    }],
    EnterScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ce60cjbGNZLmYuSDubGnF55", "EnterScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/MapES5")
          , i = e("../../common/Sdk")
          , r = e("../../configs/BaseConfig")
          , a = e("../ui/LogoUI")
          , s = e("../ui/PreloadUI")
          , c = e("../ui/UIManager")
          , l = e("../../../scripts/common/Store")
          , p = e("../../../resources/components/LhSoundManager/SoundManager")
          , u = cc._decorator
          , h = u.ccclass
          , d = u.property
          , f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.views = null,
                t.uiRoot = null,
                t.logoUI = null,
                t.preloadUI = null,
                t._preloadLoaded = !1,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this._init()
            }
            ,
            t.prototype._init = function() {
                r.default.init(),
                cc.director.setDisplayStats(!1),
                cc.game.setFrameRate(r.default.frameRate),
                c.default.instance.init(this.views),
                c.default.instance.createRoot(this.uiRoot),
                p.default.instance.init(),
                i.default.Instance.inSdk ? (i.default.Instance.Init(),
                i.default.Instance.AddMsgListener(i.default.START_PRELOAD, this.startPreloadByFrame),
                i.default.Instance.AddMsgListener(i.default.START_GAME, this.startGame),
                i.default.Instance.AddMsgListener(i.default.START_MICRO_GAME, this.startMicroGame),
                i.default.Instance.AddMsgListener(i.default.SET_CONFIG, this.onSetConfig),
                i.default.Instance.exitHandler = function() {
                    i.default.Instance.PostClient("Exit")
                }
                ,
                i.default.Instance.Post(i.default.ENGINE_LOADED)) : r.default.FlashScreen ? c.default.instance.preloadUI(["LogoUI", "PreloadUI"], this.onUIResLoaded.bind(this)) : c.default.instance.preloadUI(["PreloadUI"], this.onLogoUIEnd.bind(this))
            }
            ,
            t.prototype.onUIResLoaded = function() {
                this.logoUI = c.default.instance.createUI(a.default),
                this.logoUI.flash(this.onLogoUIEnd.bind(this))
            }
            ,
            t.prototype.onLogoUIEnd = function() {
                this.preloadUI = c.default.instance.createUI(s.default),
                this.preloadUI.startLoad(this.preloadComplated.bind(this)),
                this.startPreload()
            }
            ,
            t.prototype.preloadComplated = function() {
                this.startGame()
            }
            ,
            t.prototype.startPreloadByFrame = function() {
                var e = this;
                if (0 == r.default.ResourceConfig.pre.length)
                    i.default.Instance.Post(i.default.PRELOAD_PROGRESS, {
                        progress: 1
                    }),
                    i.default.Instance.Post(i.default.PRELOAD_LOADED),
                    this._preloadLoaded = !0;
                else {
                    for (var t = new n.default, o = function() {
                        var o = 0;
                        t.forEach(function(e) {
                            o += e / r.default.ResourceConfig.pre.length
                        }),
                        (o = Math.round(1e3 * o) / 1e3) >= 1 && !e._preloadLoaded ? (i.default.Instance.Post(i.default.PRELOAD_LOADED),
                        e._preloadLoaded = !0) : i.default.Instance.Post(i.default.PRELOAD_PROGRESS, {
                            progress: o
                        })
                    }, a = 0; a < r.default.ResourceConfig.pre.length; a++)
                        t.set(a, 0);
                    var s = function(e) {
                        var n = r.default.ResourceConfig.pre[e];
                        cc.loader.loadResDir(n.folder, n.type, function(n, i) {
                            t.set(e, n / i),
                            o()
                        }, function() {
                            t.set(e, 1),
                            o()
                        })
                    };
                    for (a = 0; a < r.default.ResourceConfig.pre.length; a++)
                        s(a)
                }
            }
            ,
            t.prototype.startPreload = function() {
                var e = this;
                if (0 == r.default.ResourceConfig.pre.length)
                    this.preloadUI.setProgress(1);
                else {
                    for (var t = new n.default, o = function() {
                        var o = 0;
                        t.forEach(function(e) {
                            o += e / r.default.ResourceConfig.pre.length
                        }),
                        o = Math.round(1e3 * o) / 1e3,
                        e.preloadUI.setProgress(o)
                    }, i = 0; i < r.default.ResourceConfig.pre.length; i++)
                        t.set(i, 0);
                    var a = function(e) {
                        var n = r.default.ResourceConfig.pre[e];
                        cc.loader.loadResDir(n.folder, n.type, function(n, i) {
                            t.set(e, n / i),
                            o()
                        }, function() {
                            t.set(e, 1),
                            o()
                        })
                    };
                    for (i = 0; i < r.default.ResourceConfig.pre.length; i++)
                        a(i)
                }
            }
            ,
            t.prototype.startLazyload = function() {}
            ,
            t.prototype.startGame = function() {
                cc.director.loadScene("Game")
            }
            ,
            t.prototype.startMicroGame = function(e) {
                var t = e.getUserData()
                  , o = (t.game,
                t.data);
                console.log("start micro game", o),
                i.default.Instance.microGame = o,
                cc.director.loadScene("Game")
            }
            ,
            t.prototype.onSetConfig = function(e) {
                var t = e.getUserData();
                l.default.webConfig = t
            }
            ,
            __decorate([d(cc.JsonAsset)], t.prototype, "views", void 0),
            __decorate([d(cc.Prefab)], t.prototype, "uiRoot", void 0),
            t = __decorate([h], t)
        }(cc.Component);
        o.default = f,
        cc._RF.pop()
    }
    , {
        "../../../resources/components/LhSoundManager/SoundManager": "SoundManager",
        "../../../scripts/common/Store": "Store",
        "../../common/MapES5": "MapES5",
        "../../common/Sdk": "Sdk",
        "../../configs/BaseConfig": "BaseConfig",
        "../ui/LogoUI": "LogoUI",
        "../ui/PreloadUI": "PreloadUI",
        "../ui/UIManager": "UIManager"
    }],
    EventManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "408e1KBQENDb7y9GopX9aRn", "EventManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {
                this._eventDispatcher = null,
                this._eventDispatcher = new cc.EventTarget
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.event = function(e, t) {
                this._eventDispatcher.emit(e, t)
            }
            ,
            e.prototype.on = function(e, t, o) {
                this._eventDispatcher.on(e, o, t)
            }
            ,
            e.prototype.once = function(e, t, o) {
                this._eventDispatcher.once(e, o, t)
            }
            ,
            e.prototype.off = function(e, t, o) {
                this._eventDispatcher.off(e, o, t)
            }
            ,
            e.prototype.offAllEventName = function(e) {
                this._eventDispatcher.off(e)
            }
            ,
            e._instance = null,
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    FogDebuff: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "bbcf6Db5UxHZrpG5que27yn", "FogDebuff"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = e("./EnemyHand")
          , a = e("./CollisionCalculation")
          , s = e("../../ccc-library/animation/NewAETool/NewAEToolAnimation")
          , c = e("../../ccc-library/configs/BaseConfig")
          , l = e("../../resources/components/LhSoundManager/SoundManager")
          , p = e("../../ccc-library/net/MicroGameSocket")
          , u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.enemyBox = null,
                t.decBox = null,
                t.img = null,
                t.topEnter = null,
                t.topLoop = null,
                t.topLeave = null,
                t.bottomEnter = null,
                t.bottomLoop = null,
                t.bottomLeave = null,
                t.wu2 = null,
                t.wu1 = null,
                t.wu3 = null,
                t.wu22 = null,
                t.wu11 = null,
                t.wu33 = null,
                t.wu111 = null,
                t.animations = [],
                t.appearBlock = 0,
                t.enemyHandPrefab = null,
                t._durationBlockNumber = 0,
                t._player = null,
                t._enemyHands = [],
                t._onLeaveCallback = null,
                t._needLeave = !1,
                t._loopMoves = [],
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this.img.opacity = 0,
                this.topLoop.node.active = !1,
                this.topLeave.node.active = !1,
                this.bottomLoop.node.active = !1,
                this.bottomLeave.node.active = !1
            }
            ,
            t.prototype.addEnemyHand = function(e, t) {
                this._createEnemyHand(e, t)
            }
            ,
            t.prototype.destroyAllEnemyHand = function() {
                this.enemyBox && this.enemyBox.destroyAllChildren(),
                this._enemyHands.length = 0
            }
            ,
            t.prototype.destroyEnemyHand = function(e) {
                this._enemyHands = this._enemyHands.filter(function(t) {
                    return t !== e
                }),
                e.destroySelf()
            }
            ,
            t.prototype.fixUpdate = function(e) {
                var t = this;
                this.node.active && (this._enemyHands.forEach(function(o) {
                    o.getCollision().x - t._player.getCollision().x < 300 && o.playOnce(),
                    o.fixUpdate(e)
                }),
                this._loopMoves.forEach(function(t) {
                    t.fixUpdate(e)
                }))
            }
            ,
            t.prototype.show = function(e, t) {
                this.node.active = !0,
                this._enterAni(),
                this._playWu(),
                this._player = t,
                this._durationBlockNumber = e,
                l.default.instance.playSound(l.Sound.fogAppear)
            }
            ,
            t.prototype.hide = function() {
                var e = this;
                return console.log("hide fog"),
                new Promise(function(t) {
                    e._onLeaveCallback = function() {
                        e.node.active = !1,
                        console.log("fog destroy"),
                        t(null)
                    }
                    ,
                    e._needLeave = !0,
                    e._durationBlockNumber = 0,
                    e.destroyAllEnemyHand()
                }
                )
            }
            ,
            t.prototype.enterTeleport = function() {
                this.node.active = !1
            }
            ,
            t.prototype.leaveTeleport = function() {
                this.node.active = !0
            }
            ,
            t.prototype.destroySelf = function(e) {
                var t = this;
                void 0 === e && (e = !1),
                e ? this.node.destroy() : this.hide().then(function() {
                    t.node.destroy()
                })
            }
            ,
            t.prototype.isShow = function() {
                return this.node.active
            }
            ,
            t.prototype.detectImpactWithPlayer = function(e) {
                if (!this._enemyHands.length)
                    return null;
                var t = null;
                return this._enemyHands.some(function(o) {
                    if (!o.node)
                        return !1;
                    var n = a.default.instance.calBoxAndCircle(o.getCollision(), e.getCollision());
                    return n === a.CollisionState.intersect && (t = o),
                    n === a.CollisionState.intersect
                }),
                t
            }
            ,
            t.prototype.detectImpactWithBullet = function(e) {
                var t = this;
                if (!this._enemyHands.length)
                    return null;
                var o = null;
                return this._enemyHands.some(function(n) {
                    if (!n.node)
                        return !1;
                    var i = a.default.instance.calBoxAndCircle(n.getCollision(), e.getCollision());
                    return i === a.CollisionState.intersect && (o = n,
                    t.destroyEnemyHand(n)),
                    i === a.CollisionState.intersect
                }),
                o
            }
            ,
            t.prototype._createEnemyHand = function(e, t) {
                this.enemyHandPrefab || (this.enemyHandPrefab = cc.loader.getRes("main/prefabs/EnemyHand"));
                var o = cc.instantiate(this.enemyHandPrefab)
                  , n = o.getComponent(r.default);
                n || (n = o.addComponent(r.default)),
                n.init(e.maxHeight, e.x, t),
                this.enemyBox.addChild(n.node),
                this._enemyHands.push(n)
            }
            ,
            t.prototype._playWu = function() {
                var e = p.default.instance.config.battleCfg.gameSpeed / 250;
                this._createWuAni(10 / 15, this.wu1, "wu1", 242 * e / (10 / 15)),
                this._createWuAni(10 / 15, this.wu2, "wu2", 319 * e / (10 / 15)),
                this._createWuAni(10 / 15, this.wu3, "wu3", 190 * e / (10 / 15)),
                this._createWuAni(10 / 15, this.wu11, "wu1", 242 * e / (10 / 15)),
                this._createWuAni(10 / 15, this.wu22, "wu2", 319 * e / (10 / 15)),
                this._createWuAni(10 / 15, this.wu33, "wu3", 190 * e / (10 / 15)),
                this._createWuAni(10 / 15, this.wu111, "wu1", 242 * e / (10 / 15))
            }
            ,
            t.prototype._createWuAni = function(e, t, o, n) {
                var i = this;
                t.play(o),
                t.on("stop", function() {
                    Array.isArray(i._loopMoves) && i._loopMoves.push(new h(n,t.node,e))
                })
            }
            ,
            t.prototype._enterAni = function() {
                var e = this;
                this.img && (this.img.runAction(cc.fadeIn(this.topEnter.data.json.duration)),
                this.topEnter.play(1, function() {
                    e.topEnter.node.active = !1,
                    e.topLoop.node.active = !0,
                    e.topLoop.play(1 / 0, function() {
                        e._beforeLeave(e.topLoop)
                    })
                }),
                this.bottomEnter.play(1, function() {
                    e.bottomEnter.node.active = !1,
                    e.bottomLoop.node.active = !0,
                    e.bottomLoop.play(1 / 0, function() {
                        e._beforeLeave(e.bottomLoop)
                    })
                }))
            }
            ,
            t.prototype._beforeLeave = function(e) {
                this._needLeave && (e.stop(),
                this.topLoop.isPlay || this.bottomLoop.isPlay || (this._leaveAni(),
                this._needLeave = !1))
            }
            ,
            t.prototype._leaveAni = function() {
                var e = this;
                if (this.img) {
                    this._loopMoves.forEach(function(e) {
                        return e.leave()
                    }),
                    this.topLoop.node.active = !1,
                    this.topLeave.node.active = !0,
                    this.topLeave.play(1, function() {
                        e._onLeaveCallback && e._onLeaveCallback()
                    }),
                    this.bottomLoop.node.active = !1,
                    this.bottomLeave.node.active = !0,
                    this.bottomLeave.play(1);
                    var t = cc.fadeOut(this.topLeave.data.json.duration);
                    this.img.runAction(t)
                }
            }
            ,
            __decorate([i(cc.Node)], t.prototype, "enemyBox", void 0),
            __decorate([i(cc.Node)], t.prototype, "decBox", void 0),
            __decorate([i(cc.Node)], t.prototype, "img", void 0),
            __decorate([i(s.default)], t.prototype, "topEnter", void 0),
            __decorate([i(s.default)], t.prototype, "topLoop", void 0),
            __decorate([i(s.default)], t.prototype, "topLeave", void 0),
            __decorate([i(s.default)], t.prototype, "bottomEnter", void 0),
            __decorate([i(s.default)], t.prototype, "bottomLoop", void 0),
            __decorate([i(s.default)], t.prototype, "bottomLeave", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu2", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu1", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu3", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu22", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu11", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu33", void 0),
            __decorate([i(cc.Animation)], t.prototype, "wu111", void 0),
            __decorate([i([cc.Animation])], t.prototype, "animations", void 0),
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = u;
        var h = function() {
            function e(e, t, o) {
                this._speed = 0,
                this._node = null,
                this._fadeOutDuration = 0,
                this._speed = e,
                this._node = t,
                this._fadeOutDuration = o
            }
            return e.prototype.fixUpdate = function(e) {
                this._node.x -= e * this._speed,
                this._node.x < -c.default.StageWidth / 2 - this._node.width && (this._node.x = c.default.StageWidth / 2 + this._node.width)
            }
            ,
            e.prototype.leave = function() {
                var e = p.default.instance.config.battleCfg.gameSpeed / 250
                  , t = cc.fadeOut(this._fadeOutDuration)
                  , o = cc.moveTo(3 * this._fadeOutDuration / e, cc.v2(-c.default.StageWidth / 2 - this._node.width / 2, this._node.y))
                  , n = cc.spawn(t, o);
                this._node.runAction(n)
            }
            ,
            e
        }();
        cc._RF.pop()
    }
    , {
        "../../ccc-library/animation/NewAETool/NewAEToolAnimation": "NewAEToolAnimation",
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../../resources/components/LhSoundManager/SoundManager": "SoundManager",
        "./CollisionCalculation": "CollisionCalculation",
        "./EnemyHand": "EnemyHand"
    }],
    FogManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "dd472xcyY9GiIHH3zH9uQJV", "FogManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./FogDebuff")
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("./BlockManager")
          , a = e("../common/Store")
          , s = e("./BlockScript")
          , c = function() {
            function e() {
                this.parent = null,
                this._fogAppearNumber = 0,
                this._fogDebuffList = [],
                this._curFogDebuff = null,
                this._player = null,
                this._fogDurationBlock = 0
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e, t, o) {
                this.destroy(),
                this.parent = e,
                this._player = t,
                this.createFogDebuff(o)
            }
            ,
            e.prototype._getBlockInfo = function(e) {
                if (a.default.isLastStage)
                    return [a.default.passBlockNumber, a.default.curBlockConfig.fogConfig.appearSpaceBlock];
                var t = i.default.instance.config.battleCfg.stages[e].blockNumber;
                return [t, i.default.instance.config.battleCfg.stages[e + 1].blockNumber - t]
            }
            ,
            e.prototype.destroy = function() {
                this.destroyFogDebuff(!0),
                this.parent = null,
                this._curFogDebuff = null,
                this._player = null
            }
            ,
            e.prototype.passBlock = function() {
                this._updateFogDebuff()
            }
            ,
            e.prototype._updateFogDebuff = function() {
                this._curFogDebuff && (this._fogDurationBlock--,
                this._fogDurationBlock <= 0 ? this._destroyCurFogDebuff() : this._createEnemyHand());
                var e = this._fogDebuffList[0];
                e && a.default.passBlockNumber >= e.appearBlock && (this._destroyCurFogDebuff(),
                this._fogDurationBlock = a.default.curBlockConfig.fogConfig.durationBlockNumber,
                this._curFogDebuff = e,
                this._curFogDebuff.show(a.default.curBlockConfig.fogConfig.durationBlockNumber, this._player),
                this._fogDebuffList.shift())
            }
            ,
            e.prototype.createFogDebuff = function(e) {
                if (!(e <= 0)) {
                    var t = a.default.curStage;
                    this._fogAppearNumber = e,
                    this.destroyFogDebuff();
                    var o = this._getBlockInfo(t)
                      , n = o[0]
                      , i = o[1]
                      , r = a.default.curBlockConfig.fogConfig.durationBlockNumber
                      , s = Math.floor((i - r * e) / e);
                    if (s < 0)
                        return console.error("\u9b3c\u96fe\u914d\u8868\u4e0d\u5408\u7406");
                    for (var c = 0; c < e; c++) {
                        var l = this._instanceFogDebuff();
                        l.appearBlock = n + c * (s + r),
                        this._fogDebuffList.push(l)
                    }
                }
            }
            ,
            e.prototype.destroyFogDebuff = function(e) {
                void 0 === e && (e = !1),
                this._fogDebuffList.forEach(function(t) {
                    return t.destroySelf(e)
                }),
                this._fogDebuffList.length = 0,
                this._destroyCurFogDebuff(e),
                this._fogAppearNumber = 0,
                this._fogDurationBlock = 0
            }
            ,
            e.prototype._destroyCurFogDebuff = function(e) {
                void 0 === e && (e = !1),
                this._curFogDebuff && (this._curFogDebuff.destroySelf(e),
                this._curFogDebuff = null)
            }
            ,
            e.prototype.detectImpactEnemyHandWithPlayer = function() {
                return !!this._curFogDebuff && null !== this._curFogDebuff.detectImpactWithPlayer(this._player)
            }
            ,
            e.prototype.fixUpdate = function(e) {
                a.default.isInTeleport || this._curFogDebuff && this._curFogDebuff.fixUpdate(e)
            }
            ,
            e.prototype.detectImpactEnemyHandWithBullet = function(e) {
                return !!this._curFogDebuff && null !== this._curFogDebuff.detectImpactWithBullet(e)
            }
            ,
            e.prototype.onEnterTeleport = function() {
                this._curFogDebuff && this._curFogDebuff.enterTeleport()
            }
            ,
            e.prototype.onLeaveTeleport = function() {
                this._curFogDebuff && this._curFogDebuff.leaveTeleport()
            }
            ,
            e.prototype._instanceFogDebuff = function() {
                var e = cc.loader.getRes("main/prefabs/Fog")
                  , t = cc.instantiate(e);
                t.active = !1,
                t.zIndex = 1;
                var o = t.getComponent(n.default);
                return o || (o = t.addComponent(n.default)),
                this.parent.addChild(t),
                o
            }
            ,
            e.prototype._createEnemyHand = function() {
                var e = this;
                if (this._curFogDebuff && this._curFogDebuff.isShow()) {
                    var t = null;
                    if (r.default.instance.getBlocks().some(function(o, n) {
                        var i = o.getCollision();
                        if (!i)
                            return !1;
                        var r = i.x > e._player.getCollision().x;
                        return r && (t = n),
                        r
                    }),
                    null !== t)
                        if (Math.random() < a.default.curBlockConfig.fogConfig.enemyHandRate) {
                            var o = r.default.instance.getBlocks()[t]
                              , n = r.default.instance.getBlocks()[t + 1];
                            n.getCollision().x === o.getCollision().x && (n = r.default.instance.getBlocks()[t + 2],
                            t++);
                            var i = {
                                x: 0,
                                height: 0
                            }
                              , c = null;
                            o && (c = o.node.getComponent(s.default),
                            i.x = o.getCollision().x,
                            i.height = c.data.height);
                            var l = {
                                x: 0,
                                height: 0
                            };
                            if (n) {
                                var p = n.node.getComponent(s.default);
                                l.x = n.getCollision().x,
                                l.height = p.data.height
                            }
                            var u = {
                                maxHeight: Math.min((i.height + l.height) / 2 + 50, 900),
                                x: (l.x + i.x) / 2
                            };
                            this._curFogDebuff.addEnemyHand(u, c ? c.blockNumber : null)
                        }
                }
            }
            ,
            e._instance = null,
            e
        }();
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../common/Store": "Store",
        "./BlockManager": "BlockManager",
        "./BlockScript": "BlockScript",
        "./FogDebuff": "FogDebuff"
    }],
    GameAbstract: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ab042gv4w1Ghbc9TdWNVraZ", "GameAbstract"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./MockConfig")
          , i = e("./NecessaryData")
          , r = function() {
            function e() {
                this.config = {},
                this.necessaryData = new i.default,
                this.gameData = {},
                this.result = {},
                this.table = null
            }
            return e.prototype.init = function(e, t) {
                return void 0 === t && (t = null),
                this.config = e,
                this.table = t,
                this.necessaryData.init(),
                this._init()
            }
            ,
            e.prototype.start = function() {
                var e = this._start();
                return this.necessaryData.state = n.GameState.Start,
                e
            }
            ,
            e.prototype.update = function(e) {
                if (this.necessaryData.operateInterval += e,
                this.necessaryData.operateInterval >= this.config.gameCfg.operateMaxInterval && this.end(),
                this.necessaryData.state == n.GameState.Start)
                    return this.necessaryData.gameTime += e,
                    this.necessaryData.frameId++,
                    this._update(e)
            }
            ,
            e.prototype.option = function(e) {
                return this.necessaryData.operateInterval = 0,
                this._option(e)
            }
            ,
            e.prototype.end = function() {
                this._end(),
                this.necessaryData.state = n.GameState.End
            }
            ,
            e.prototype.getSyncData = function() {
                return __assign({}, this.necessaryData, this.gameData)
            }
            ,
            e.prototype.getResult = function() {
                return this.result
            }
            ,
            e
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "./MockConfig": "MockConfig",
        "./NecessaryData": "NecessaryData"
    }],
    GameConstants: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e4120fANbdB07D+FJpyq8zU", "GameConstants"),
        cc._RF.pop()
    }
    , {}],
    GameController: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ae5220dC+lGL7lNKfRRaJ84", "GameController"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/common/EventManager")
          , i = e("../../ccc-library/common/Sdk")
          , r = e("../../ccc-library/configs/BaseConfig")
          , a = e("../../ccc-library/mock/MockServer")
          , s = e("../../ccc-library/net/MicroGameConfig")
          , c = e("../../ccc-library/net/MicroGameSocket")
          , l = e("../../ccc-library/scripts/ui/UIManager")
          , p = e("../configs/GameEvent")
          , u = e("../mock/Game")
          , h = e("../ui/GameUI")
          , d = e("../ui/ResultUI")
          , f = e("../ui/VHomeUI")
          , _ = e("./BlockManager")
          , m = e("./Player")
          , g = e("./InputManager")
          , y = e("./PropsManager")
          , b = e("../mock/Props")
          , v = e("./FogManager")
          , S = e("./RankManager")
          , C = e("./TeleportBlockManager")
          , k = e("./TeleportPropsManager")
          , M = e("../common/Store")
          , P = e("./MothManager")
          , T = e("./TeleportBuff")
          , E = e("../modal/Modal")
          , I = e("../../resources/components/LhSoundManager/SoundManager")
          , R = function() {
            function e(e) {
                var t = this;
                this._root = null,
                this._script = null,
                this._homeUI = null,
                this._gameUI = null,
                this._resultUI = null,
                this._isPlaying = !1,
                this._gameStage = null,
                this._teleportGameStage = null,
                this._player = null,
                this._cacheCurDis = 0,
                this._curDis = 0,
                this._topLine = null,
                this._bottomLine = null,
                this._teleportBuff = null,
                this._nowAllBlockNumber = 0,
                this._lockFace = [],
                this._curWaitToUnlockFace = 0,
                this._unlockedFace = [],
                this._leaveTeleportNeedDestroyBlock = [],
                this._script = e,
                this._root = e.node.parent,
                this._gameStage = this._script.gameStage,
                this._gameStage.init(!1),
                this._teleportGameStage = this._script.teleportGameStage,
                this._teleportGameStage.init(!0),
                n.default.instance.on(p.GameEvent.PROPS_LOSE_EFFECT, this, this._onPropsLoseEffect),
                n.default.instance.on(p.GameEvent.GAME_PAUSE, this, this.pause),
                n.default.instance.on(p.GameEvent.GAME_RESUME, this, this.resumed),
                n.default.instance.on(p.GameEvent.GAME_EXIT, this, this.exit),
                cc.game.on(cc.game.EVENT_HIDE, function() {
                    I.default.instance.pauseAllBgm(),
                    i.default.Instance.inSdk && t.onEnd()
                }),
                cc.game.on(cc.game.EVENT_SHOW, function() {
                    I.default.instance.pauseAllBgm()
                }),
                i.default.Instance.inSdk ? (i.default.Instance.AddMsgListener(i.default.RESTART_GAME, this.restart.bind(this)),
                n.default.instance.on(i.default.RELIVE, this, this.onRelive),
                n.default.instance.on(i.default.END, this, this.onEnd),
                l.default.instance.preloadUI(["GameUI"], this.connect.bind(this))) : (n.default.instance.on(p.GameEvent.CLICK_START_BTN, this, this.startMatch),
                n.default.instance.on(p.GameEvent.CLICK_RESTART_BTN, this, this.connect),
                n.default.instance.on(p.GameEvent.CLICK_HOME_BTN, this, this.connect),
                l.default.instance.preloadUI(["GameUI", "VHomeUI", "ResultUI", "ModalUI"], this.connect.bind(this)))
            }
            return e.prototype.connect = function() {
                r.default.isMock && a.default.instance.init(u.default),
                c.default.instance.init(new s.default(r.default.isMock,this)),
                c.default.instance.connect()
            }
            ,
            e.prototype.onConnect = function(e) {
                var t = e.roomId;
                console.log("connected", t),
                t ? c.default.instance.joinRoom(!0) : !r.default.isMock && i.default.Instance.inSdk ? this.startMatch() : this._showHome()
            }
            ,
            e.prototype.startMatch = function() {
                c.default.instance.startMatch("")
            }
            ,
            e.prototype.onMatchStart = function() {}
            ,
            e.prototype.cancelMatch = function() {
                c.default.instance.cancelMatch()
            }
            ,
            e.prototype.onMatchCancel = function() {}
            ,
            e.prototype.onMatchSuccess = function() {
                c.default.instance.joinRoom()
            }
            ,
            e.prototype.onPlayerJoin = function(e) {
                e.allPlayers,
                e.player
            }
            ,
            e.prototype.onRoomStatusChange = function(e) {
                var t = e.currentStatus
                  , o = (e.game,
                e.result);
                switch (t) {
                case c.RoomStatus.loading:
                    this.init(),
                    c.default.instance.ready();
                    break;
                case c.RoomStatus.playing:
                    this.start();
                    break;
                case c.RoomStatus.end:
                    this.end(o)
                }
            }
            ,
            e.prototype.onUpdate = function(e) {
                if (e) {
                    var t = e.blocks
                      , o = e.score
                      , n = e.propsLoseEffectInfo
                      , i = e.curStage
                      , r = e.teleportPosition
                      , a = e.fogAppearNumber
                      , s = e.mothAppearNumber;
                    i && (M.default.curStage = i),
                    t && (M.default.isInTeleport ? C.default.instance.createBlocks({
                        blocks: t,
                        prefab: this._script.blockPrefab,
                        curDis: this._curDis
                    }) : (console.log("\u6536\u5230\u521b\u5efa\u67f1\u5b50\u7684\u6570\u636e", t),
                    _.default.instance.createBlocks({
                        blocks: t,
                        prefab: this._script.blockPrefab,
                        curDis: this._curDis
                    }))),
                    r && this._createTeleport(r, this._curDis, M.default.isInTeleport),
                    a > 0 && v.default.instance.createFogDebuff(a),
                    s > 0 && P.default.instance.createMoth(s),
                    o && (this._gameUI.setScore(o),
                    M.default.isInTeleport || (M.default.passBlockNumber++,
                    v.default.instance.passBlock(),
                    this._nowAllBlockNumber++,
                    M.default.passBlockNumber + 1 === c.default.instance.config.battleCfg.stages[1].blockNumber && this._script.showSpeedUpTip())),
                    n && this._player.propsLoseEffect(n.id, {}).then(function() {})
                }
            }
            ,
            e.prototype._onPropsLoseEffect = function(e) {
                return __awaiter(this, void 0, void 0, function() {
                    var t;
                    return __generator(this, function(o) {
                        switch (o.label) {
                        case 0:
                            return t = e.getUserData(),
                            [4, this._player.propsLoseEffect(t.id, t.data)];
                        case 1:
                            return o.sent(),
                            [2]
                        }
                    })
                })
            }
            ,
            e.prototype.update = function(e) {
                this._isPlaying && !M.default.isGameEnd && (this._curDis += e * c.default.instance.config.battleCfg.gameSpeed,
                M.default.isInTeleport ? (this._detectImpactInTeleport(),
                C.default.instance.fixUpdate(e),
                k.default.instance.fixUpdate(e),
                S.default.instance.fixUpdate({
                    dt: e,
                    score: this._gameUI.scoreVal,
                    curBlockConfig: c.default.instance.config.battleCfg.teleport,
                    player: this._player,
                    gameStage: this._teleportGameStage,
                    blocks: C.default.instance.getBlocks()
                }),
                this._teleportGameStage.fixUpdate(e)) : (this._detectImpact(),
                _.default.instance.fixUpdate(e),
                y.default.instance.fixUpdate(e),
                S.default.instance.fixUpdate({
                    dt: e,
                    score: this._gameUI.scoreVal,
                    curBlockConfig: M.default.curBlockConfig,
                    player: this._player,
                    gameStage: this._gameStage,
                    blocks: _.default.instance.getBlocks()
                }),
                P.default.instance.fixUpdate(e),
                this._gameStage.fixUpdate(e)),
                v.default.instance.fixUpdate(e),
                this._teleportBuff && this._teleportBuff.fixUpdate(e),
                this._player.fixUpdate(e))
            }
            ,
            e.prototype.option = function(e, t) {
                void 0 === t && (t = {}),
                c.default.instance.operate(e, t)
            }
            ,
            e.prototype.onOption = function(e) {
                var t = this
                  , o = e.type
                  , n = e.data;
                switch (o) {
                case u.OperateType.useProps:
                    n.propsType === b.PropsType.AddScore ? this._gameUI.setScore(n.score) : (n.propsType,
                    b.PropsType.SlowdownTime);
                    break;
                case u.OperateType.pause:
                case u.OperateType.resume:
                    break;
                case u.OperateType.die:
                    n.isRelive ? this.onEnd() : i.default.Instance.inSdk ? i.default.Instance.Post(i.default.DIE) : E.default.confirm({
                        content: "\u662f\u5426\u590d\u6d3b",
                        onConfirm: function() {
                            t.onRelive()
                        },
                        onCancel: function() {
                            t.onEnd()
                        }
                    });
                    break;
                case u.OperateType.enterTeleport:
                    k.default.instance.init(this._teleportGameStage),
                    C.default.instance.init({
                        blocks: n.teleportBlocks,
                        prefab: this._script.blockPrefab,
                        parent: this._teleportGameStage.blockLayer,
                        curDis: this._curDis
                    })
                }
            }
            ,
            e.prototype.onGetResult = function(e) {
                var t = e.result;
                i.default.Instance.inSdk || (this._resultUI = l.default.instance.createUI(d.default),
                this._resultUI.showResult(t, this))
            }
            ,
            e.prototype.init = function() {
                console.log("game init", c.default.instance.config.battleCfg, c.default.instance.config.gameCfg, c.default.instance.table),
                this._nowAllBlockNumber = c.default.instance.table.allBlockNumber,
                this._unlockedFace = c.default.instance.table.unlockedFace,
                this._lockFace = c.default.instance.config.battleCfg.propsConfig[b.PropsType.Face].unlockBlockNumber.filter(function(e) {
                    return -1 === c.default.instance.table.unlockedFace.indexOf(e)
                }),
                this._curWaitToUnlockFace = this._lockFace.shift(),
                M.default.init(),
                g.default.instance.init(),
                this._gameUI = l.default.instance.createUI(h.default),
                this._gameUI.mount(),
                this._gameUI.setTopScore(c.default.instance.table.highestScore),
                y.default.instance.init(this._gameStage),
                _.default.instance.init({
                    blocks: c.default.instance.gameData.blocks,
                    prefab: this._script.blockPrefab,
                    parent: this._gameStage.blockLayer,
                    curDis: this._curDis
                }),
                S.default.instance.init(c.default.instance.table.rankInfo),
                this._createPlayer(),
                this._initTeleportBuff(),
                v.default.instance.init(this._gameStage.node.parent, this._player, c.default.instance.gameData.fogAppearNumber),
                P.default.instance.init(this._gameStage.blockLayer, c.default.instance.gameData.mothAppearNumber)
            }
            ,
            e.prototype.start = function() {
                this._isPlaying || (console.log("game start"),
                I.default.instance.pauseAllBgm(),
                I.default.instance.playBgm(I.Bgm.Normal),
                M.default.isGameEnd = !1,
                this.pause(),
                this._setLimitLine(),
                this._showGame())
            }
            ,
            e.prototype._setLimitLine = function() {
                var e = r.default.StageHeight - cc.view.getVisibleSize().height;
                this._topLine = (r.default.StageHeight - e) / 2 + this._player.node.height,
                this._bottomLine = -(r.default.StageHeight - e) / 2 - this._player.node.height
            }
            ,
            e.prototype.end = function(e) {
                this._isPlaying = !1,
                M.default.isGameEnd = !0,
                this.destroy(),
                console.log("game end", __assign({}, e, {
                    roomId: c.default.instance.roomId
                })),
                i.default.Instance.inSdk ? (i.default.Instance.Post(i.default.GAME_END, __assign({}, e, {
                    roomId: c.default.instance.roomId
                })),
                c.default.instance.disconnect()) : c.default.instance.getResult()
            }
            ,
            e.prototype.exit = function() {
                M.default.isGameEnd || this.onEnd()
            }
            ,
            e.prototype.goHome = function() {
                this.destroy(),
                this._homeUI && this._homeUI.show()
            }
            ,
            e.prototype.restart = function(e) {
                var t = e ? e.getUserData() : null;
                console.log("\u91cd\u65b0\u5f00\u59cb", t),
                t && t.data && (i.default.Instance.microGame = t.data),
                this.destroy(),
                i.default.Instance.inSdk ? (console.log("restart link"),
                this.connect()) : this.startMatch()
            }
            ,
            e.prototype.onRelive = function() {
                var e = this;
                this._player.isRelive || (M.default.isInfinityRelive || (this._player.isRelive = !0),
                M.default.isDie = !1,
                I.default.instance.playSound(I.Sound.relive),
                this._player.gotProps(b.PropsType.Relive, null, !1),
                this._player.propsLoseEffect(this._player.propsRelive.id, null).then(function() {
                    e.resumed(),
                    e.option(u.OperateType.relive)
                }))
            }
            ,
            e.prototype.onEnd = function() {
                this.option(u.OperateType.gameEnd)
            }
            ,
            e.prototype.destroy = function() {
                I.default.instance.pauseAllBgm(),
                this._gameStage.destroySelf(),
                this._teleportGameStage.destroySelf(),
                this._isPlaying = !1,
                M.default.isInTeleport && this._leaveTeleport(!0),
                M.default.destroy(),
                this._curDis = 0,
                this._cacheCurDis = 0,
                this._gameUI && (this._gameUI.destroySelf(),
                this._gameUI.hide()),
                this._destroyTeleport(),
                this._player && (this._player.destroySelf(),
                this._player = null),
                g.default.instance.destroy(),
                y.default.instance.destroy(),
                _.default.instance.destroy(),
                S.default.instance.destroy(),
                this._destroyTeleport(),
                v.default.instance.destroy(),
                P.default.instance.destroy()
            }
            ,
            e.prototype.pause = function(e) {
                if (!M.default.isGameEnd) {
                    this._isPlaying = !1;
                    var t = null;
                    "boolean" == typeof e ? t = {
                        record: e
                    } : e && (t = {
                        record: e.getUserData()
                    }),
                    this.option(u.OperateType.pause, t)
                }
            }
            ,
            e.prototype.resumed = function(e) {
                if (!M.default.isGameEnd) {
                    this._isPlaying = !0;
                    var t = null;
                    "boolean" == typeof e ? t = {
                        record: e
                    } : e && (t = {
                        record: e.getUserData()
                    }),
                    this.option(u.OperateType.resume, t)
                }
            }
            ,
            e.prototype._showHome = function() {
                this._resultUI && this._resultUI.hide(),
                this._homeUI = l.default.instance.createUI(f.default),
                this._homeUI.show()
            }
            ,
            e.prototype._showGame = function() {
                this._homeUI && this._homeUI.hide(),
                this._gameUI || (this._gameUI = l.default.instance.createUI(h.default)),
                this._gameUI.show(),
                this._player.startGame()
            }
            ,
            e.prototype._createPlayer = function() {
                var e = cc.instantiate(this._script.playerPrefab);
                this._player = e.getComponent(m.default),
                this._player || (this._player = e.addComponent(m.default)),
                this._script.playerLayer.addChild(e),
                this._player.init(this._script.mainLayer),
                g.default.instance.addClickHandler(this._player.jumpUp.bind(this._player))
            }
            ,
            e.prototype._detectImpact = function() {
                this._player.isInvincible = true;
                if ((_.default.instance.detectImpactWithPlayer(this._player) || v.default.instance.detectImpactEnemyHandWithPlayer()) && (this._player.isInvincible || this._die()),
                this._detectImpactWithLine() && this._die(),
                y.default.instance.detectImpactWithPlayer(this._player)) {
                    var e = this._getRandomPropsType();
                    e === b.PropsType.Face && (this._unlockedFace.push(this._curWaitToUnlockFace),
                    this.option(u.OperateType.unlockedFace, {
                        unlockedFace: this._curWaitToUnlockFace
                    }),
                    this._curWaitToUnlockFace = this._lockFace.shift()),
                    this._playSound(e),
                    this._player.gotProps(e)
                }
                if (P.default.instance.detectImpactPlayerWithIce(this._player)) {
                    var t = c.default.instance.config.battleCfg.iceMothCommonConfig.iceDuration;
                    this._player.ice(t)
                }
                !M.default.isInTeleport && this._detectImpactEnterTeleportWithPlayer() && this._enterTeleport()
            }
            ,
            e.prototype._detectImpactInTeleport = function() {
                if (C.default.instance.detectImpactWithPlayer(this._player) && (this._player.isInvincible || this._die()),
                this._detectImpactWithLine() && this._die(),
                k.default.instance.detectImpactWithPlayer(this._player)) {
                    var e = this._getRandomPropsType();
                    this._playSound(e),
                    this._player.gotProps(e)
                }
                M.default.isInTeleport && this._detectImpactLeaveTeleportWithPlayer() && this._leaveTeleport()
            }
            ,
            e.prototype._playSound = function(e) {
                e === b.PropsType.Face ? I.default.instance.playSound(I.Sound.gotFace) : e === b.PropsType.AddScore ? I.default.instance.playSound(I.Sound.addScore) : I.default.instance.playSound(I.Sound.gotProps)
            }
            ,
            e.prototype._die = function() {
                var e = this;
                M.default.isDie = !0,
                I.default.instance.playSound(I.Sound.die),
                this.pause(),
                this._player.removeAllPropsEffect().then(function() {
                    e._player.changeShape(m.PlayerStatus.Die)
                });
                var t = -r.default.StageHeight / 2 - this._player.node.height
                  , o = Math.max(0, (this._player.node.y - t) / (r.default.StageHeight / 2) * .6)
                  , n = cc.moveTo(o, cc.v2(this._player.node.x, t))
                  , i = cc.callFunc(function() {
                    e.option(u.OperateType.die)
                })
                  , a = cc.sequence(n, i);
                setTimeout(function() {
                    e._player.node.runAction(a)
                }, 200)
            }
            ,
            e.prototype._enterTeleport = function() {
                var e = this;
                console.log("\u8fdb\u5165\u56de\u9633\u955c"),
                M.default.isInTeleport = !0,
                M.default.updateSpeed(),
                I.default.instance.playSound(I.Sound.enterTeleport),
                this.pause(),
                I.default.instance.pauseBgm(I.Bgm.Normal);
                this._teleportBuff && this._teleportBuff.onEnterTeleport(),
                this._changeScene(!0).then(function() {
                    console.log("\u56de\u9633\u955c\u5f00\u59cb"),
                    e._teleportBuff.destroyEnterTeleport(),
                    e.resumed(),
                    I.default.instance.playBgm(I.Bgm.Hyj, .25)
                }),
                this._cacheCurDis = this._curDis,
                this._curDis = 0,
                v.default.instance.onEnterTeleport(),
                this._player.enterTeleport(cc.v2(this._player.node.position.x, this._player.node.position.y)),
                this.option(u.OperateType.enterTeleport)
            }
            ,
            e.prototype._leaveTeleport = function(e) {
                var t = this;
                void 0 === e && (e = !1),
                console.log("\u79bb\u5f00\u56de\u9633\u955c"),
                M.default.isInTeleport = !1,
                M.default.updateSpeed(),
                I.default.instance.playSound(I.Sound.leaveTeleport),
                this._leaveTeleportNeedDestroyBlock.forEach(function(e) {
                    return e.destroySelf(!0)
                }),
                this._leaveTeleportNeedDestroyBlock.length = 0,
                I.default.instance.pauseBgm(I.Bgm.Hyj),
                e ? (this._gameStage.show(),
                this._teleportGameStage.hide(),
                M.default.isGameEnd || (this._player && this._player.leaveTeleport(),
                I.default.instance.playBgm(I.Bgm.Normal))) : (this.pause(),
                this._changeScene(!1).then(function() {
                    M.default.isGameEnd || (t._player && t._player.leaveTeleport(),
                    I.default.instance.playBgm(I.Bgm.Normal)),
                    t.resumed(),
                    t._teleportBuff && t._teleportBuff.destroyLeaveTeleport()
                })),
                M.default.isGameEnd || (this._curDis = this._cacheCurDis),
                this._teleportGameStage.resetPosition(),
                v.default.instance.onLeaveTeleport(),
                this._teleportBuff && this._teleportBuff.onLeaveTeleport(),
                this.option(u.OperateType.leaveTeleport)
            }
            ,
            e.prototype._changeScene = function(e) {
                var t = this;
                return new Promise(function(o) {
                    if (t._script.changeScene) {
                        t._script.changeScene.active = !0,
                        t._script.changeScene.opacity = 0;
                        var n = cc.fadeIn(.5)
                          , i = cc.callFunc(function() {
                            e ? (t._gameStage.hide(),
                            t._teleportGameStage.show()) : (t._gameStage.show(),
                            t._teleportGameStage.hide()),
                            setTimeout(function() {
                                t._script.changeScene.active = !1,
                                o(null)
                            }, 300)
                        })
                          , r = cc.sequence(n, i);
                        t._script.changeScene.runAction(r)
                    } else
                        o(null)
                }
                )
            }
            ,
            e.prototype._detectImpactWithLine = function() {
                var e = this._player.getCollision();
                return this._topLine - e.y <= e.radius || e.y - this._bottomLine <= e.radius
            }
            ,
            e.prototype._initTeleportBuff = function() {
                this._destroyTeleport(),
                this._teleportBuff = new T.default
            }
            ,
            e.prototype._createTeleport = function(e, t, o) {
                var n = o ? this._teleportGameStage.node : this._gameStage.node
                  , i = this._teleportBuff.createTeleport({
                    rectInfo: e,
                    curDis: t,
                    isInTeleport: o,
                    parent: n
                });
                if (!o) {
                    var a = _.default.instance.findBlockBeforeTeleport(i.getCollision())
                      , s = a.topBlock
                      , c = a.bottomBlock
                      , l = a.afterTopBlock
                      , p = a.afterBottomBlock
                      , u = r.default.StageHeight / 2 - i.getCollision().y - i.getCollision().height / 2
                      , h = r.default.StageHeight / 2 + i.getCollision().y - i.getCollision().height / 2;
                    this._leaveTeleportNeedDestroyBlock.push(l),
                    this._leaveTeleportNeedDestroyBlock.push(p),
                    s && (s.offsetY(-(u - s.data.height)),
                    s.propsScript && (s.propsScript.node.y -= u - s.data.height)),
                    c && (c.offsetY(h - c.data.height),
                    c.propsScript && (c.propsScript.node.y += h - c.data.height))
                }
            }
            ,
            e.prototype._detectImpactEnterTeleportWithPlayer = function() {
                return !!this._teleportBuff && this._teleportBuff.detectImpactEnterTeleportWithPlayer(this._player)
            }
            ,
            e.prototype._detectImpactLeaveTeleportWithPlayer = function() {
                return !!this._teleportBuff && this._teleportBuff.detectImpactLeaveTeleportWithPlayer(this._player)
            }
            ,
            e.prototype._destroyTeleport = function() {
                this._teleportBuff && this._teleportBuff.destroySelf(),
                this._teleportBuff = null
            }
            ,
            e.prototype._getRandomPropsType = function() {
                if (!M.default.isInTeleport && c.default.instance.table.isActivityLogin && this._curWaitToUnlockFace > 0 && this._nowAllBlockNumber >= this._curWaitToUnlockFace && -1 === this._unlockedFace.indexOf(this._curWaitToUnlockFace))
                    return b.PropsType.Face;
                var e = Math.random()
                  , t = null;
                return (M.default.isInTeleport ? M.default.getPropsRateConfig(c.default.instance.config.battleCfg.teleport.props) : M.default.propsRateConfig).forEach(function(o, n) {
                    e >= o[0] && e < o[1] && (t = Number(n))
                }),
                t
            }
            ,
            e
        }();
        o.default = R,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/common/Sdk": "Sdk",
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/mock/MockServer": "MockServer",
        "../../ccc-library/net/MicroGameConfig": "MicroGameConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../../ccc-library/scripts/ui/UIManager": "UIManager",
        "../../resources/components/LhSoundManager/SoundManager": "SoundManager",
        "../common/Store": "Store",
        "../configs/GameEvent": "GameEvent",
        "../mock/Game": "Game",
        "../mock/Props": "Props",
        "../modal/Modal": "Modal",
        "../ui/GameUI": "GameUI",
        "../ui/ResultUI": "ResultUI",
        "../ui/VHomeUI": "VHomeUI",
        "./BlockManager": "BlockManager",
        "./FogManager": "FogManager",
        "./InputManager": "InputManager",
        "./MothManager": "MothManager",
        "./Player": "Player",
        "./PropsManager": "PropsManager",
        "./RankManager": "RankManager",
        "./TeleportBlockManager": "TeleportBlockManager",
        "./TeleportBuff": "TeleportBuff",
        "./TeleportPropsManager": "TeleportPropsManager"
    }],
    GameData: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "be0d7dQI9FPSJ3WCbfxF6yB", "GameData"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            return function() {
                this.score = 0,
                this.blocks = [],
                this.teleportBlocks = [],
                this.teleportBlockNumber = 0,
                this.props = [],
                this.curStage = 0,
                this.fogAppearNumber = 0,
                this.mothAppearNumber = 0
            }
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    GameEvent: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f6090I8LqpPUqbddJOL45XD", "GameEvent"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        o.GameEvent = __assign({}, {
            CLICK_START_BTN: "CLICK_START_BTN",
            CLICK_RESTART_BTN: "CLICK_RESTART_BTN",
            CLICK_HOME_BTN: "CLICK_HOME_BTN"
        }, {
            PROPS_LOSE_EFFECT: "PROPS_LOSE_EFFECT",
            GAME_PAUSE: "GAME_PAUSE",
            GAME_RESUME: "GAME_RESUME",
            GAME_EXIT: "GAME_EXIT"
        }),
        cc._RF.pop()
    }
    , {}],
    GameScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "206b5OIs5tI3J2fz5ysXHs4", "GameScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../scripts/game/GameController")
          , i = e("../../../scripts/game/GameStage")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.root = null,
                t.blockPrefab = null,
                t.playerPrefab = null,
                t.propsPrefab = null,
                t.gameStage = null,
                t.teleportGameStage = null,
                t.mainLayer = null,
                t.changeScene = null,
                t.playerLayer = null,
                t.speedUpTip = null,
                t._gameController = null,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this._gameController = new n.default(this),
                this.speedUpTip.active = !1
            }
            ,
            t.prototype.update = function(e) {
                this._gameController.update(e)
            }
            ,
            t.prototype.showSpeedUpTip = function() {
                var e = this;
                this.speedUpTip.active || (this.speedUpTip.active = !0,
                this.speedUpTip.opacity = 0,
                this.speedUpTip.runAction(cc.fadeIn(.3)),
                setTimeout(function() {
                    var t = cc.callFunc(function() {
                        e.speedUpTip.active = !1
                    })
                      , o = cc.sequence(cc.fadeOut(.3), t);
                    e.speedUpTip.runAction(o)
                }, 1500))
            }
            ,
            __decorate([s(cc.Node)], t.prototype, "root", void 0),
            __decorate([s(cc.Prefab)], t.prototype, "blockPrefab", void 0),
            __decorate([s(cc.Prefab)], t.prototype, "playerPrefab", void 0),
            __decorate([s(cc.Prefab)], t.prototype, "propsPrefab", void 0),
            __decorate([s(i.default)], t.prototype, "gameStage", void 0),
            __decorate([s(i.default)], t.prototype, "teleportGameStage", void 0),
            __decorate([s(cc.Node)], t.prototype, "mainLayer", void 0),
            __decorate([s(cc.Node)], t.prototype, "changeScene", void 0),
            __decorate([s(cc.Node)], t.prototype, "playerLayer", void 0),
            __decorate([s(cc.Node)], t.prototype, "speedUpTip", void 0),
            t = __decorate([a], t)
        }(cc.Component);
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../../scripts/game/GameController": "GameController",
        "../../../scripts/game/GameStage": "GameStage"
    }],
    GameStage: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1c592G3Y/FCoLbtDT2KwFKB", "GameStage"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = cc._decorator.property
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.blockLayer = null,
                t.bgLayer = null,
                t.bgTopLayer = null,
                t._bg1 = null,
                t._bg2 = null,
                t._bgTransition = null,
                t._bg1Top = null,
                t._bg2Top = null,
                t._bgTransitionTop = null,
                t._moveDistanceNotInTeleport = 0,
                t._isTeleportGameStage = !1,
                t._bgStage = 1,
                t.bg2LoopX = 1125,
                t.bg2DefaultX = 10125,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this._bg1 = this.bgLayer.getChildByName("bg1"),
                this._bg2 = this.bgLayer.getChildByName("bg2"),
                this._bgTransition = this.bgLayer.getChildByName("bgTransition"),
                this._bg1Top = this.bgTopLayer.getChildByName("bg1"),
                this._bg2Top = this.bgTopLayer.getChildByName("bg2"),
                this._bgTransitionTop = this.bgTopLayer.getChildByName("bgTransition")
            }
            ,
            t.prototype.init = function(e) {
                this._isTeleportGameStage = e
            }
            ,
            t.prototype.destroySelf = function() {
                this._bgStage = 1,
                this.resetPosition()
            }
            ,
            t.prototype.resetPosition = function() {
                this.bgLayer.x = 0,
                this.bgTopLayer.x = 0,
                this._moveDistanceNotInTeleport = 0,
                this._isTeleportGameStage || (this._bg2Top.x = this.bg2DefaultX,
                this._bg2.x = this.bg2DefaultX,
                this._bg1Top.active = !0,
                this._bg1.active = !0,
                this._bgTransition.active = !0,
                this._bgTransitionTop.active = !0)
            }
            ,
            t.prototype.fixUpdate = function(e) {
                var t = e * i.default.instance.config.battleCfg.bgSpeed;
                this._moveDistanceNotInTeleport -= t,
                this._setBgStage(),
                this._moveBgLayer(t, this.bgLayer, this._bg1, this._bg2, this._bgTransition),
                this._moveBgLayer(t, this.bgTopLayer, this._bg1Top, this._bg2Top, this._bgTransitionTop)
            }
            ,
            t.prototype.show = function() {
                this.node.active = !0,
                this.node.opacity = 255
            }
            ,
            t.prototype.hide = function() {
                this.node.active = !1,
                this.node.opacity = 0
            }
            ,
            t.prototype.fadeOut = function(e) {
                var t = this;
                this.node.opacity = 255;
                var o = cc.fadeOut(.8)
                  , n = cc.callFunc(function() {
                    t.hide(),
                    e && e()
                }, this)
                  , i = cc.sequence(o, n);
                this.node.runAction(i)
            }
            ,
            t.prototype.fadeIn = function(e) {
                this.node.active = !0,
                this.node.opacity = 0;
                var t = cc.fadeIn(.8)
                  , o = cc.callFunc(function() {
                    e && e()
                }, this)
                  , n = cc.sequence(t, o);
                this.node.runAction(n)
            }
            ,
            t.prototype._moveBgLayer = function(e, t, o, n, r) {
                if (t) {
                    t.x -= e;
                    var a = i.default.instance.config.battleCfg;
                    this._isTeleportGameStage ? t.x < -a.bg2Width && (t.x = t.x + a.bg2Width) : 2 === this._bgStage ? (t.x = t.x + (a.bg1Width * a.bg1LoopNumber + a.bgTransitionWidth + a.bg2Width),
                    n.x = this.bg2LoopX,
                    o.active = !1,
                    r.active = !1,
                    this._bgStage = 3,
                    console.log("\u9636\u6bb53")) : 3 === this._bgStage && t.x < -a.bg2Width && (console.log("\u9636\u6bb54 loop"),
                    t.x = t.x + a.bg2Width)
                }
            }
            ,
            t.prototype._setBgStage = function() {
                if (!this._isTeleportGameStage) {
                    var e = i.default.instance.config.battleCfg;
                    1 === this._bgStage && this._moveDistanceNotInTeleport <= -(e.bg1Width * e.bg1LoopNumber + e.bgTransitionWidth + e.bg2Width) && (this._bgStage = 2)
                }
            }
            ,
            __decorate([r(cc.Node)], t.prototype, "blockLayer", void 0),
            __decorate([r(cc.Node)], t.prototype, "bgLayer", void 0),
            __decorate([r(cc.Node)], t.prototype, "bgTopLayer", void 0),
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket"
    }],
    GameUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c51a8bVnM5Mz7w5hl0HaWvu", "GameUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/scripts/ui/BaseUI")
          , i = e("../../ccc-library/scripts/ui/UIManager")
          , r = e("../../ccc-library/common/EventManager")
          , a = e("../configs/GameEvent")
          , s = e("../common/Store")
          , c = e("../game/InputManager")
          , l = e("../../resources/components/LhSoundManager/SoundManager")
          , p = cc._decorator.property
          , u = e("../../ccc-library/net/MicroGameSocket")
          , h = cc._decorator.ccclass
          , d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = i.UIType.Normal,
                t.render = i.UIRender.HideOther,
                t.score = null,
                t.topScore = null,
                t.topScoreLabel = null,
                t.tipStart = null,
                t.scoreLabel = null,
                t.scoreVal = 0,
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                u.default.instance.table.isActivityLogin ? (this.topScore.node.active = !0,
                this.topScoreLabel.active = !0) : (this.topScore.node.active = !1,
                this.topScoreLabel.active = !1)
            }
            ,
            t.prototype.mount = function() {
                this.tipStart.active = !0,
                c.default.instance.addOnceClickHandler(this.onStart.bind(this))
            }
            ,
            t.prototype.destroySelf = function() {
                this.setScore(0),
                this.setTopScore(0)
            }
            ,
            t.prototype.setScore = function(e) {
                this.score.string = e.toString(),
                this.scoreVal = e,
                0 === e ? this.scoreLabel.spriteFrame = cc.loader.getRes("main/images/game/0", cc.SpriteFrame) : e > 0 && e < 100 ? this.scoreLabel.spriteFrame = cc.loader.getRes("main/images/game/50", cc.SpriteFrame) : e >= 100 && (this.scoreLabel.spriteFrame = cc.loader.getRes("main/images/game/100", cc.SpriteFrame))
            }
            ,
            t.prototype.setTopScore = function(e) {
                u.default.instance.table.isActivityLogin && (this.topScore.string = e.toString())
            }
            ,
            t.prototype.onPause = function() {
                s.default.isGameEnd || (l.default.instance.playSound(l.Sound.clickBtn),
                r.default.instance.event(a.GameEvent.GAME_PAUSE, !0),
                s.default.gamePause = !0)
            }
            ,
            t.prototype.onResume = function() {
                s.default.isGameEnd || (l.default.instance.playSound(l.Sound.clickBtn),
                r.default.instance.event(a.GameEvent.GAME_RESUME, !0),
                s.default.gamePause = !1)
            }
            ,
            t.prototype.onExit = function() {
                s.default.isGameEnd || (l.default.instance.playSound(l.Sound.clickBtn),
                r.default.instance.event(a.GameEvent.GAME_EXIT))
            }
            ,
            t.prototype.onStart = function() {
                s.default.isGameEnd || (r.default.instance.event(a.GameEvent.GAME_RESUME),
                s.default.gameStart = !0,
                this.tipStart.active = !1)
            }
            ,
            t.uiName = "GameUI",
            __decorate([p(cc.Label)], t.prototype, "score", void 0),
            __decorate([p(cc.Label)], t.prototype, "topScore", void 0),
            __decorate([p(cc.Node)], t.prototype, "topScoreLabel", void 0),
            __decorate([p(cc.Node)], t.prototype, "tipStart", void 0),
            __decorate([p(cc.Sprite)], t.prototype, "scoreLabel", void 0),
            t = __decorate([h], t)
        }(n.default);
        o.default = d,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../../ccc-library/scripts/ui/BaseUI": "BaseUI",
        "../../ccc-library/scripts/ui/UIManager": "UIManager",
        "../../resources/components/LhSoundManager/SoundManager": "SoundManager",
        "../common/Store": "Store",
        "../configs/GameEvent": "GameEvent",
        "../game/InputManager": "InputManager"
    }],
    Game: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f8fdbDs8fxFUK0Mg+r7Fh15", "Game"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = e("../../ccc-library/mock/GameAbstract"), r = e("./GameData"), a = e("./Result"), s = e("./Block"), c = e("../../ccc-library/mock/MockConfig"), l = e("./Props"), p = e("../../ccc-library/common/MapES5"), u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.gameData = null,
                t.result = null,
                t.blockId = 0,
                t.isInfinityRelive = !1,
                t._cacheCurDis = 0,
                t._curDis = 0,
                t._curStage = 0,
                t._fogAppearNumber = 0,
                t._mothAppearNumber = 0,
                t._cacheCurBlockConfig = null,
                t._curBlockConfig = null,
                t._pauseStartTime = 0,
                t._isInTeleport = !1,
                t._effectedProps = new p.default,
                t._fogAppearInLastStageCount = 0,
                t._mothAppearInLastStageCount = 0,
                t._lastCreatePropsBlockNumber = 0,
                t._hasCreatedBlockNumber = 0,
                t._isCreatedEnterTeleport = !1,
                t._isCreatedLeaveTeleport = !1,
                t._hasCreatedBlockNumberInTeleport = 0,
                t._lastCreatePropsBlockNumberInTeleport = 0,
                t
            }
            return __extends(t, e),
            t.prototype._createBlock = function(e) {
                return void 0 === e && (e = this.config.battleCfg.createBlockNumber),
                this._commonCreateBlock(this.gameData.blocks, e)
            }
            ,
            t.prototype._getBlockConfig = function(e) {
                for (var t = null, o = this.config.battleCfg.stages, n = 0; n < o.length; n++) {
                    var i = o[n]
                      , r = o[n + 1];
                    if (!r) {
                        t = this.config.battleCfg.stagesBlockConfig[o[o.length - 1].index];
                        break
                    }
                    if (e >= i.blockNumber && e < r.blockNumber) {
                        t = this.config.battleCfg.stagesBlockConfig[i.index];
                        break
                    }
                }
                return t
            }
            ,
            t.prototype._createBlockInTeleport = function(e) {
                if (void 0 === e && (e = this.config.battleCfg.createBlockNumber),
                this._hasCreatedBlockNumberInTeleport >= this.config.battleCfg.teleportBlockNumber)
                    return [];
                this._curBlockConfig || console.error("find current block config error in teleport");
                var t = this._commonCreateBlock(this.gameData.teleportBlocks, e);
                this._hasCreatedBlockNumberInTeleport += t.length;
                var o = this._hasCreatedBlockNumberInTeleport - this.config.battleCfg.teleportBlockNumber;
                return o > 0 && t.splice(t.length - o, o),
                t
            }
            ,
            t.prototype._commonCreateBlock = function(e, t) {
                if (e.length > this.config.battleCfg.createBlockNumber)
                    return [];
                var o = []
                  , n = this._isInTeleport ? this._curBlockConfig : this._getBlockConfig(this._hasCreatedBlockNumber);
                n || console.error("find block config error");
                for (var i = 0; i < t; i++) {
                    var r = n.blockVerticalRange[0] + Math.random() * (n.blockVerticalRange[1] - n.blockVerticalRange[0]);
                    this._isInTeleport && i === t - 1 && (r = this.config.battleCfg.teleportCollisionSize.height);
                    var a = 0;
                    if (e.length) {
                        var c = e[e.length - 1].getCenterY(this.config.gameCfg.StageHeight)
                          , l = n.blockCenterRange[0] + Math.random() * (n.blockCenterRange[1] - n.blockCenterRange[0]);
                        a = c > 0 ? c - l : c + l
                    }
                    var p = Math.min(this.config.battleCfg.maxBlockHeight, Math.floor(this.config.gameCfg.StageHeight / 2 - r / 2 - a))
                      , u = Math.min(this.config.battleCfg.maxBlockHeight, Math.floor(this.config.gameCfg.StageHeight / 2 - r / 2 + a))
                      , h = Math.floor(a + r / 2 + p / 2)
                      , d = Math.floor(a - r / 2 - u / 2)
                      , f = n.blockSpaceRange
                      , _ = f[0]
                      , m = _ + (f[1] - _) * Math.random();
                    m < 100 && console.error("\u95f4\u8ddd\u8ba1\u7b97\u5f02\u5e38", m, e[e.length - 1].getX()),
                    this._isInTeleport || this._hasCreatedBlockNumber++;
                    var g = new s.Block(++this.blockId);
                    g.sceneType = this._getSceneType(),
                    g.blockType = this._getBlockType(g.sceneType);
                    var y = this.config.battleCfg.blockSizeConfig[g.blockType]
                      , b = Math.floor((e.length ? e[e.length - 1].getX() : (this.config.gameCfg.StageWidth + y.width) / 2) + m);
                    p > 0 && (g.topRect = {
                        x: b,
                        y: h,
                        width: y.width,
                        height: p
                    }),
                    u > 0 && (g.bottomRect = {
                        x: b,
                        y: d,
                        width: y.width,
                        height: u
                    }),
                    this._isInTeleport || (g.blockNumber = this._hasCreatedBlockNumber,
                    g.props = this._createProps(g)),
                    o.push(g),
                    e.push(g)
                }
                return o
            }
            ,
            t.prototype._getBlockType = function(e) {
                var t = this.config.battleCfg.blockTypes[e];
                return 0 === t.length ? null : t[Math.floor(t.length * Math.random())]
            }
            ,
            t.prototype._createProps = function(e) {
                var t = this._curBlockConfig.createPropsSpaceBlockNumber
                  , o = t[0]
                  , n = t[1];
                if (this._hasCreatedBlockNumber - this._lastCreatePropsBlockNumber >= o) {
                    var i = Math.floor(Math.random() * (n - o)) + o;
                    if (this._hasCreatedBlockNumber - this._lastCreatePropsBlockNumber >= i) {
                        var r = this._createOneProps(e);
                        return this._lastCreatePropsBlockNumber = this._hasCreatedBlockNumber,
                        r
                    }
                }
                return null
            }
            ,
            t.prototype._createPropsInTeleport = function(e) {
                for (var t = [], o = this._curBlockConfig.createPropsSpaceBlockNumber, n = o[0], i = o[1], r = Math.floor(Math.random() * (i - n)) + n, a = 0; a < e.length; a += r) {
                    var s = e[a]
                      , c = this._createOneProps(s);
                    t.push(c),
                    s.props = c
                }
                return t
            }
            ,
            t.prototype._createOneProps = function(e, t) {
                void 0 === t && (t = null);
                var o = e.bottomRect;
                if (o) {
                    var n = new l.Props;
                    return n.data = {
                        x: e.getX(),
                        y: o.y + (o.y > 0 ? -1 : 1) * (o.height / 2 + 80.5),
                        width: 200,
                        height: 161
                    },
                    n
                }
                return null
            }
            ,
            t.prototype._computeScore = function() {
                var e = this._isInTeleport ? this.gameData.teleportBlocks : this.gameData.blocks
                  , t = e[0];
                if (!t)
                    return !1;
                if (this._isInTeleport) {
                    if (this._curDis >= t.getX() - t.getWidth() / 2)
                        return this.gameData.score += this._curBlockConfig.score,
                        this.gameData.teleportBlockNumber++,
                        e.shift(),
                        !0
                } else if (this._curDis >= t.getX() - t.getWidth() / 2)
                    return this.gameData.score += this._curBlockConfig.score,
                    this.result.blockNumber++,
                    e.shift(),
                    !0;
                return !1
            }
            ,
            t.prototype._updateFogDebuffInLastStage = function(e) {
                if (this._isLastStage && e) {
                    this._fogAppearInLastStageCount++;
                    var t = this._curBlockConfig.fogConfig;
                    if (this._fogAppearInLastStageCount >= t.appearSpaceBlock)
                        if (this._fogAppearInLastStageCount = 0,
                        Math.random() < t.appearRate[1])
                            return this._fogAppearNumber = 1,
                            !0
                }
                return !1
            }
            ,
            t.prototype._updateMothInLastStage = function(e) {
                if (this._isLastStage && e) {
                    this._mothAppearInLastStageCount++;
                    var t = this._curBlockConfig.iceMothConfig;
                    if (this._mothAppearInLastStageCount >= t.appearSpaceBlock)
                        if (this._mothAppearInLastStageCount = 0,
                        Math.random() < t.appearRate[1])
                            return this._mothAppearNumber = 1,
                            !0
                }
                return !1
            }
            ,
            t.prototype._init = function() {
                var e;
                this.gameData = new r.default,
                this.result = new a.default,
                this.table.unlockedFace && this.table.unlockedFace.length && (e = this.result.unlockedFace).push.apply(e, this.table.unlockedFace),
                this.result.roleId = this.table.roleId,
                this.result.gameId = this.table.gameId,
                this._curDis = 0,
                this._setCurrentStage(0),
                this._effectedProps.clear(),
                this._setBlockConfig(),
                this.gameData.fogAppearNumber = this._fogAppearNumber,
                this.gameData.mothAppearNumber = this._mothAppearNumber,
                this._createBlock(2 * this.config.battleCfg.createBlockNumber)
            }
            ,
            t.prototype._start = function() {
                return this.gameData
            }
            ,
            t.prototype._update = function(e) {
                this._curDis += e * this.config.battleCfg.gameSpeed;
                var t = this._computeScore()
                  , o = this._countdownSlowdownTime(e)
                  , n = {};
                if (this._isInTeleport) {
                    r = this._createBlockInTeleport();
                    var i = this._createPropsInTeleport(r);
                    l = this._getLeaveTeleportPosition();
                    n = __assign({}, o, l, this._getSyncData({
                        newProps: i,
                        newBlocks: r,
                        isSyncScore: t,
                        isSyncBlockConfig: !1,
                        isSyncFog: !1,
                        isSyncMoth: !1
                    }))
                } else {
                    var r = this._createBlock()
                      , a = this._setStage()
                      , s = this._updateFogDebuffInLastStage(t)
                      , c = this._updateMothInLastStage(t)
                      , l = this._getTeleportPosition();
                    n = __assign({}, l, o, this._getSyncData({
                        newProps: [],
                        newBlocks: r,
                        isSyncScore: t,
                        isSyncBlockConfig: a,
                        isSyncFog: s,
                        isSyncMoth: c
                    }))
                }
                return Object.keys(n).length > 0 ? n : null
            }
            ,
            t.prototype._getTeleportPosition = function() {
                if (!this._isCreatedEnterTeleport && (this.result.blockNumber + 4) % this.config.battleCfg.appearTeleportSpaceBlock == 0) {
                    var e = this.gameData.blocks[3]
                      , t = {
                        x: e.getX() + this.config.battleCfg.blockSizeConfig.hyjProps.width / 2,
                        y: e.getCenterY(this.config.gameCfg.StageHeight),
                        width: this.config.battleCfg.teleportSize.width,
                        height: this.config.battleCfg.teleportSize.height
                    };
                    return this._isCreatedEnterTeleport = !0,
                    {
                        teleportPosition: t
                    }
                }
                return {}
            }
            ,
            t.prototype._getLeaveTeleportPosition = function() {
                if (!this._isCreatedLeaveTeleport && this._hasCreatedBlockNumberInTeleport >= this.config.battleCfg.teleportBlockNumber) {
                    var e = this.gameData.teleportBlocks[this.gameData.teleportBlocks.length - 1]
                      , t = {
                        x: e.getX() + this.config.battleCfg.blockSizeConfig.hyjProps.width / 2,
                        y: e.getCenterY(this.config.gameCfg.StageHeight),
                        width: this.config.battleCfg.teleportSize.width,
                        height: this.config.battleCfg.teleportSize.height
                    };
                    return this._isCreatedLeaveTeleport = !0,
                    {
                        teleportPosition: t
                    }
                }
                return {}
            }
            ,
            t.prototype._onDestroyEnterTeleport = function() {
                this._isCreatedEnterTeleport = !1
            }
            ,
            t.prototype._onEnterTeleport = function() {
                this._isInTeleport = !0,
                this._cacheCurDis = this._curDis,
                this._curDis = 0,
                this._updateSpeed(),
                this._cacheCurBlockConfig = this._curBlockConfig,
                this._curBlockConfig = this.config.battleCfg.teleport;
                var e = this._createBlockInTeleport(2 * this.config.battleCfg.createBlockNumber);
                return this._createPropsInTeleport(e),
                this.result.recordEnterTeleportCount(this._getCurrentTime()),
                {
                    blocks: e
                }
            }
            ,
            t.prototype._onLeaveTeleport = function() {
                this._isInTeleport = !1,
                this.necessaryData.state !== c.GameState.End && (this._curDis = this._cacheCurDis,
                this._curBlockConfig = this._cacheCurBlockConfig),
                this._updateSpeed(),
                this._onDestroyEnterTeleport(),
                this.gameData.teleportBlockNumber = 0,
                this._isCreatedLeaveTeleport = !1,
                this._hasCreatedBlockNumberInTeleport = 0,
                this._lastCreatePropsBlockNumberInTeleport = 0,
                this.gameData.teleportBlocks.length = 0,
                this._cacheCurBlockConfig = null,
                this.result.recordLeaveTeleportTime(this._getCurrentTime())
            }
            ,
            t.prototype._getSyncData = function(e) {
                var t = e.newProps
                  , o = e.newBlocks
                  , n = e.isSyncScore
                  , i = e.isSyncBlockConfig
                  , r = e.isSyncFog
                  , a = e.isSyncMoth;
                if (t.length || o.length || n) {
                    var s = {};
                    return n && (s.score = this.gameData.score),
                    o.length && (s.blocks = o),
                    t.length && (s.props = t),
                    i && (s.curStage = this._curStage,
                    s.fogAppearNumber = this._fogAppearNumber,
                    s.mothAppearNumber = this._mothAppearNumber),
                    r && (s.fogAppearNumber = this._fogAppearNumber),
                    a && (s.mothAppearNumber = this._mothAppearNumber),
                    s
                }
                return null
            }
            ,
            t.prototype._option = function(e) {
                var t = e.type
                  , o = e.data
                  , i = this.gameData;
                switch (t) {
                case n.setInfinityRelive:
                    this.isInfinityRelive = !0;
                    break;
                case n.gameEnd:
                    this.end();
                    break;
                case n.useProps:
                    this._onUseProps(o),
                    i.propsType = o.propsType;
                    break;
                case n.unlockedFace:
                    this._onUnlockFace(o);
                    break;
                case n.pause:
                    o && o.record && (this._pauseStartTime = Date.now(),
                    this.result.recordPauseCount(this._getCurrentTime())),
                    this.pause(),
                    i.isPlaying = !1;
                    break;
                case n.relive:
                    this.isInfinityRelive || (this.result.isRelive ? this.end() : this.result.isRelive = !0);
                    break;
                case n.die:
                    this.isInfinityRelive ? i.isRelive = !1 : i.isRelive = this.result.isRelive;
                    break;
                case n.resume:
                    if (o && o.record) {
                        var r = (Date.now() - this._pauseStartTime) / 1e3
                          , a = Number((this.necessaryData.gameTime + r).toFixed(2));
                        this.result.recordPauseEndTime(a),
                        this._pauseStartTime = 0
                    }
                    this.resume(),
                    i.isPlaying = !0;
                    break;
                case n.enterTeleport:
                    var s = this._onEnterTeleport().blocks;
                    i.teleportBlocks = s;
                    break;
                case n.leaveTeleport:
                    this._onLeaveTeleport();
                    break;
                case n.destroyTeleport:
                    this._onDestroyEnterTeleport()
                }
                return {
                    type: t,
                    data: i
                }
            }
            ,
            t.prototype._onUnlockFace = function(e) {
                this.result.unlockedFace.push(e.unlockedFace)
            }
            ,
            t.prototype._onUseProps = function(e) {
                if (e.propsType === l.PropsType.AddScore) {
                    var t = this.config.battleCfg.propsConfig[e.propsType];
                    this.gameData.score += t.score,
                    this.result.recordAddScoreCount(this._getCurrentTime())
                } else if (e.propsType === l.PropsType.SlowdownTime) {
                    t = this.config.battleCfg.propsConfig[e.propsType];
                    this.config.battleCfg.gameSpeed *= t.slow,
                    this.config.battleCfg.bgSpeed *= t.slow,
                    this._effectedProps.set(e.propsType, {
                        id: e.id,
                        duration: t.duration
                    })
                }
            }
            ,
            t.prototype._getCurrentTime = function() {
                return Number(this.necessaryData.gameTime.toFixed(2))
            }
            ,
            t.prototype.pause = function() {
                this.necessaryData.state = c.GameState.Pause
            }
            ,
            t.prototype.resume = function() {
                this.necessaryData.state = c.GameState.Start
            }
            ,
            t.prototype._countdownSlowdownTime = function(e) {
                var t = this._effectedProps.get(l.PropsType.SlowdownTime);
                return t ? (t.duration -= e,
                t.duration <= 0 ? (this._effectedProps.delete(l.PropsType.SlowdownTime),
                this._updateSpeed(),
                {
                    propsLoseEffectInfo: {
                        id: t.id,
                        propsType: l.PropsType.SlowdownTime
                    }
                }) : {}) : {}
            }
            ,
            t.prototype._updateSpeed = function() {
                this.config.battleCfg.gameSpeed = this.config.gameCfg.GameSpeed * this._getCurrentGameSpeedPower(),
                this.config.battleCfg.bgSpeed = this.config.gameCfg.BgSpeed * this._getCurrentGameSpeedPower()
            }
            ,
            t.prototype._getCurrentGameSpeedPower = function() {
                return this._isInTeleport || 0 === this._curStage ? 1 : this._curStage > 0 ? this.config.battleCfg.gameSpeedPower : void 0
            }
            ,
            Object.defineProperty(t.prototype, "_isLastStage", {
                get: function() {
                    return !!this.config.battleCfg && this._curStage >= this.config.battleCfg.stages[this.config.battleCfg.stages.length - 1].index
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype._setStage = function() {
                if (this._isInTeleport)
                    return !1;
                if (this._isLastStage)
                    return !1;
                var e = this.config.battleCfg.stages[this._curStage + 1];
                return (!e || this._curStage !== e.index && this.result.blockNumber >= e.blockNumber) && (this._setCurrentStage(e.index),
                this._setBlockConfig(),
                !0)
            }
            ,
            t.prototype._setCurrentStage = function(e) {
                this._curStage = e,
                this._updateSpeed()
            }
            ,
            t.prototype._setBlockConfig = function() {
                this._curBlockConfig = this.config.battleCfg.stagesBlockConfig[this._curStage],
                this._fogAppearNumber = this.getFogConfig(),
                this._mothAppearNumber = this.getMothConfig(),
                console.log("\u9b3c\u96fe\u6b21\u6570", this._fogAppearNumber),
                console.log("\u51b0\u86fe\u51fa\u73b0\u7684\u6b21\u6570", this._mothAppearNumber)
            }
            ,
            t.prototype.getFogConfig = function() {
                var e = this._curBlockConfig.fogConfig;
                if (e && !this._isLastStage)
                    for (var t = Math.random(), o = 0, n = Object.keys(e.appearRate), i = 0; i < n.length; i++) {
                        var r = n[i]
                          , a = o + e.appearRate[r];
                        if (t >= o && t < a)
                            return Number(r);
                        o = a
                    }
                return 0
            }
            ,
            t.prototype.getMothConfig = function() {
                var e = this._curBlockConfig.iceMothConfig;
                if (e && !this._isLastStage)
                    for (var t = Math.random(), o = 0, n = Object.keys(e.appearRate), i = 0; i < n.length; i++) {
                        var r = n[i]
                          , a = o + e.appearRate[r];
                        if (t >= o && t < a)
                            return Number(r);
                        o = a
                    }
                return 0
            }
            ,
            t.prototype._getSceneType = function() {
                return this._isInTeleport ? s.SceneType.hyj : this._hasCreatedBlockNumber <= this.config.battleCfg.stages[1].blockNumber ? s.SceneType.jkz : s.SceneType.hlg
            }
            ,
            t.prototype._end = function() {
                this.result.score = this.gameData.score,
                this.result.gameTime = this.necessaryData.gameTime
            }
            ,
            t
        }(i.default);
        o.default = u,
        function(e) {
            e.gameEnd = "gameEnd",
            e.useProps = "useProps",
            e.gotProps = "gotProps",
            e.pause = "pause",
            e.resume = "resume",
            e.enterTeleport = "enterTeleport",
            e.leaveTeleport = "leaveTeleport",
            e.destroyTeleport = "destroyTeleport",
            e.unlockedFace = "unlockedFace",
            e.relive = "relive",
            e.die = "die",
            e.setInfinityRelive = "setInfinityRelive"
        }(n = o.OperateType || (o.OperateType = {})),
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/MapES5": "MapES5",
        "../../ccc-library/mock/GameAbstract": "GameAbstract",
        "../../ccc-library/mock/MockConfig": "MockConfig",
        "./Block": "Block",
        "./GameData": "GameData",
        "./Props": "Props",
        "./Result": "Result"
    }],
    HomeUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "70f4c7W5vdLGbkbuSGrpe/J", "HomeUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/common/EventManager")
          , i = e("../../ccc-library/scripts/components/LhStartButton")
          , r = e("../../ccc-library/scripts/ui/BaseUI")
          , a = e("../../ccc-library/scripts/ui/UIManager")
          , s = e("../configs/GameEvent")
          , c = cc._decorator
          , l = c.ccclass
          , p = c.property
          , u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = a.UIType.Normal,
                t.render = a.UIRender.Normal,
                t.startBtn = null,
                t._clickedStart = !1,
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.startBtn.init({
                    showSelectLevel: !1,
                    showScore: !1,
                    score: 100,
                    selectLevelOptions: {
                        disableLevels: [3],
                        defaultLevel: 1
                    }
                }),
                this.startBtn.node.on(i.LhStartButtonEvent.start, this._onStartGame, this)
            }
            ,
            t.prototype._onStartGame = function() {
                this._clickedStart || (this._clickedStart = !0,
                n.default.instance.event(s.GameEvent.CLICK_START_BTN))
            }
            ,
            t.prototype.hide = function() {
                this._clickedStart = !1,
                e.prototype.hide.call(this)
            }
            ,
            t.uiName = "HomeUI",
            __decorate([p(i.default)], t.prototype, "startBtn", void 0),
            t = __decorate([l], t)
        }(r.default);
        o.default = u,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/scripts/components/LhStartButton": "LhStartButton",
        "../../ccc-library/scripts/ui/BaseUI": "BaseUI",
        "../../ccc-library/scripts/ui/UIManager": "UIManager",
        "../configs/GameEvent": "GameEvent"
    }],
    HttpManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cc185eci+VOtKtKIzFdIvzl", "HttpManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../common/EventManager")
          , i = e("../common/Sdk")
          , r = function() {
            function e() {
                n.default.instance.on(e.HTTPS_ERROR, this, this._onError)
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.get = function(e, t) {
                return void 0 === t && (t = {}),
                this._ajax(__assign({}, t, {
                    url: e,
                    method: "get"
                }))
            }
            ,
            e.prototype.post = function(e, t, o) {
                return void 0 === o && (o = {}),
                this._ajax(__assign({}, o, {
                    url: e,
                    method: "post",
                    data: t
                }))
            }
            ,
            e.prototype._onError = function(e, t) {
                console.error(e, t)
            }
            ,
            e.prototype._ajax = function(e) {
                return i.default.Instance.inSdk ? i.default.Instance.Request(e) : axios.request(e).then(function(e) {
                    return e.data
                })
            }
            ,
            e.HTTPS_ERROR = "HTTPS_ERROR",
            e._instance = null,
            e
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "../common/EventManager": "EventManager",
        "../common/Sdk": "Sdk"
    }],
    IDE: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "3b6a5l5L+dHXLw/n35/z5Hc", "IDE"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.InEditor = function() {
                return !1
            }
            ,
            e.Log = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t]
            }
            ,
            e.Warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t]
            }
            ,
            e.Error = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t]
            }
            ,
            e.GetAssetsUrlByUuid = function(e, t) {}
            ,
            e.GetAssetsUuidByUrl = function(e, t) {}
            ,
            e.GetSubMetasUuidByUuid = function(e, t) {}
            ,
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    InputManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5d997n7yFZPRqF0p3Jur84o", "InputManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/common/MapES5")
          , i = function() {
            function e() {
                this._handlerId = 0,
                this._clickHandlers = new n.default,
                this._onceClickHandlers = []
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                this.destroy(),
                cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this), null, !0)
            }
            ,
            e.prototype.destroy = function() {
                this._clickHandlers.clear(),
                cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_END)
            }
            ,
            e.prototype.addClickHandler = function(e) {
                return this._handlerId++,
                this._clickHandlers.set(this._handlerId, e),
                this._handlerId
            }
            ,
            e.prototype.removeClickHandler = function(e) {
                this._clickHandlers.delete(e)
            }
            ,
            e.prototype.addOnceClickHandler = function(e) {
                this._onceClickHandlers.push(e)
            }
            ,
            e.prototype._onClick = function(e) {
                this._clickHandlers.forEach(function(t) {
                    t(e)
                });
                for (var t = 0; t < this._onceClickHandlers.length; t++) {
                    var o = this._onceClickHandlers.shift();
                    o && (o(e),
                    t--)
                }
            }
            ,
            e._instance = null,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/MapES5": "MapES5"
    }],
    LhGameName: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "32a89gNTyxDFpuFc5GhdLQ6", "LhGameName"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator
          , i = n.ccclass
          , r = n.property
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.oneLineName = null,
                t.twoLineName = null,
                t._oneLineLength = 8,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {}
            ,
            t.prototype.setGameName = function(e) {
                e.length > this._oneLineLength ? this._showTwoLine(e) : this._showOneLine(e)
            }
            ,
            t.prototype._showTwoLine = function(e) {
                this.twoLineName.string = e,
                this.oneLineName.node.parent.active = !1,
                this.twoLineName.node.parent.active = !0
            }
            ,
            t.prototype._showOneLine = function(e) {
                this.oneLineName.string = e,
                this.oneLineName.node.parent.active = !0,
                this.twoLineName.node.parent.active = !1
            }
            ,
            __decorate([r(cc.Label)], t.prototype, "oneLineName", void 0),
            __decorate([r(cc.Label)], t.prototype, "twoLineName", void 0),
            t = __decorate([i], t)
        }(cc.Component);
        o.default = a,
        cc._RF.pop()
    }
    , {}],
    LhGameResult: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "3f4f48d+GhEiIX1LvGXLwI7", "LhGameResult"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i, r = cc._decorator.ccclass, a = cc._decorator.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.successBox = null,
                t.failBox = null,
                t.successTargetBox = null,
                t.btnHome = null,
                t.btnRestart = null,
                t.btnResume = null,
                t.score = null,
                t
            }
            return __extends(t, e),
            t.prototype.show = function(e, t) {
                this.node.active = !0,
                e === n.Success ? (this.successBox.active = !0,
                this.successTargetBox.active = !1,
                this.failBox.active = !1,
                this.btnHome.active = !0,
                this.btnRestart.active = !0,
                this.btnResume.active = !1) : e === n.Fail ? (this.successBox.active = !1,
                this.successTargetBox.active = !1,
                this.failBox.active = !0,
                this.btnHome.active = !0,
                this.btnRestart.active = !0,
                this.btnResume.active = !1) : (this.successBox.active = !1,
                this.successTargetBox.active = !0,
                this.failBox.active = !1,
                this.btnHome.active = !0,
                this.btnRestart.active = !1,
                this.btnResume.active = !0,
                this.score.string = t ? t.toString() : "0")
            }
            ,
            t.prototype.hide = function() {
                this.node.active = !1
            }
            ,
            t.prototype.onClickBtnHome = function() {
                this.hide(),
                console.log("home"),
                this.node.emit(i.GoHome)
            }
            ,
            t.prototype.onClickBtnRestart = function() {
                this.hide(),
                console.log("restart"),
                this.node.emit(i.GameRestart)
            }
            ,
            t.prototype.onClickBtnResume = function() {
                this.hide(),
                console.log("resume"),
                this.node.emit(i.GameResume)
            }
            ,
            __decorate([a(cc.Node)], t.prototype, "successBox", void 0),
            __decorate([a(cc.Node)], t.prototype, "failBox", void 0),
            __decorate([a(cc.Node)], t.prototype, "successTargetBox", void 0),
            __decorate([a(cc.Node)], t.prototype, "btnHome", void 0),
            __decorate([a(cc.Node)], t.prototype, "btnRestart", void 0),
            __decorate([a(cc.Node)], t.prototype, "btnResume", void 0),
            __decorate([a(cc.Label)], t.prototype, "score", void 0),
            t = __decorate([r()], t)
        }(cc.Component);
        o.default = s,
        function(e) {
            e[e.Success = 0] = "Success",
            e[e.Fail = 1] = "Fail",
            e[e.SuccessTarget = 2] = "SuccessTarget"
        }(n = o.LhGameResultEnum || (o.LhGameResultEnum = {})),
        function(e) {
            e.GoHome = "GoHome",
            e.GameRestart = "GameRestart",
            e.GameResume = "GameResume"
        }(i = o.LhGameResultEvent || (o.LhGameResultEvent = {})),
        cc._RF.pop()
    }
    , {}],
    LhSelectLevel: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b58f1gyx+1PgIkQqGZUM+aW", "LhSelectLevel"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = e("./LhStartButton")
          , r = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.init = function(e) {
                var t = this;
                e.disableLevels && e.disableLevels.forEach(function(e) {
                    t.disable(e)
                }),
                e.defaultLevel && this._check(e.defaultLevel)
            }
            ,
            t.prototype.show = function() {
                this.node.active = !0
            }
            ,
            t.prototype.hide = function() {
                this.node.active = !1
            }
            ,
            t.prototype.disable = function(e) {
                var t = this.node.getChildByName("level" + e).getComponent(cc.Button);
                t.node.getChildByName("lock").active = !0,
                t.interactable = !1
            }
            ,
            t.prototype.enable = function(e) {
                var t = this.node.getChildByName("level" + e).getComponent(cc.Button);
                t.node.getChildByName("lock").active = !1,
                t.interactable = !0
            }
            ,
            t.prototype.onClickClose = function() {
                this.hide()
            }
            ,
            t.prototype.onClickLevel1 = function() {
                this.node.emit(i.LhStartButtonEvent.check, 1),
                this._check(1)
            }
            ,
            t.prototype.onClickLevel2 = function() {
                this.node.emit(i.LhStartButtonEvent.check, 2),
                this._check(2)
            }
            ,
            t.prototype.onClickLevel3 = function() {
                this.node.emit(i.LhStartButtonEvent.check, 3),
                this._check(3)
            }
            ,
            t.prototype._check = function(e) {
                for (var t = 1; t <= 3; t++) {
                    if (t === e)
                        this.node.getChildByName("level" + e).getChildByName("check").active = !0;
                    else
                        this.node.getChildByName("level" + t).getChildByName("check").active = !1
                }
            }
            ,
            t.prototype._uncheck = function(e) {
                this.node.getChildByName("level" + e).getChildByName("check").active = !1,
                this.node.emit(i.LhStartButtonEvent.uncheck, e)
            }
            ,
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = r,
        cc._RF.pop()
    }
    , {
        "./LhStartButton": "LhStartButton"
    }],
    LhStartButton: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4aa9au+afRFSpYb5n/jJMV/", "LhStartButton"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = cc._decorator.ccclass, r = cc._decorator.property, a = e("./LhSelectLevel"), s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.selectLevelBtn = null,
                t.levelText = null,
                t.maxScore = null,
                t.lhSelectLevel = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                this.lhSelectLevel.hide()
            }
            ,
            t.prototype.init = function(e) {
                if (e.showScore && !e.score)
                    return console.error("\u53c2\u6570\u9519\u8bef");
                this.selectLevelBtn.node.active = e.showSelectLevel || !1,
                this.maxScore.node.active = e.showScore || !1,
                this.setScore(e.score),
                e.showSelectLevel && (this.lhSelectLevel.node.on(n.check, this._onSelectLevel.bind(this)),
                e.selectLevelOptions && this.lhSelectLevel.init(e.selectLevelOptions))
            }
            ,
            t.prototype.setScore = function(e) {
                this.maxScore.node.active && (this.maxScore.string = e.toString())
            }
            ,
            t.prototype.onClickStart = function() {
                this.node.emit(n.start)
            }
            ,
            t.prototype.onClickSelectLevel = function() {
                this.lhSelectLevel.show()
            }
            ,
            t.prototype._onSelectLevel = function(e) {
                var t = e.getUserData();
                this.node.emit(n.check, t),
                this._setLevel(t),
                this.lhSelectLevel.hide()
            }
            ,
            t.prototype._setLevel = function(e) {
                switch (e) {
                case 1:
                    this.levelText.string = "\u7b80\u5355";
                    break;
                case 2:
                    this.levelText.string = "\u4e2d\u7b49";
                    break;
                case 3:
                    this.levelText.string = "\u56f0\u96be";
                    break;
                default:
                    this.levelText.string = "\u7b80\u5355"
                }
            }
            ,
            __decorate([r(cc.Button)], t.prototype, "selectLevelBtn", void 0),
            __decorate([r(cc.Label)], t.prototype, "levelText", void 0),
            __decorate([r(cc.Label)], t.prototype, "maxScore", void 0),
            __decorate([r(a.default)], t.prototype, "lhSelectLevel", void 0),
            t = __decorate([i()], t)
        }(cc.Component);
        o.default = s,
        function(e) {
            e.check = "check",
            e.uncheck = "uncheck",
            e.start = "start"
        }(n = o.LhStartButtonEvent || (o.LhStartButtonEvent = {})),
        cc._RF.pop()
    }
    , {
        "./LhSelectLevel": "LhSelectLevel"
    }],
    LocalStorageManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e5ca1ac+QVOcKn7fGL7Oh0a", "LocalStorageManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../configs/BaseConfig")
          , i = e("./Base64")
          , r = e("./MapES5")
          , a = function() {
            function e() {
                this._salt = null,
                this._salt = n.default.salt
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.setItem = function(e, t) {
                window.localStorage.setItem(this._salt_base64_encode(e), this._salt_base64_encode(t))
            }
            ,
            e.prototype.getItem = function(e) {
                return this._salt_base64_decode(window.localStorage.getItem(this._salt_base64_encode(e)))
            }
            ,
            e.prototype.clear = function() {
                window.localStorage.clear()
            }
            ,
            e.prototype.removeItem = function(e) {
                window.localStorage.removeItem(this._salt_base64_encode(e))
            }
            ,
            e.prototype.getMap = function() {
                var e = new r.default
                  , t = window.localStorage.items;
                for (var o in t) {
                    var n = t[o];
                    "string" == typeof n && e.set(this._salt_base64_decode(o), this._salt_base64_decode(n))
                }
                return e
            }
            ,
            e.prototype.getNumber = function(e) {
                var t = this.getItem(e)
                  , o = 0;
                return t && (o = Number(t)),
                o
            }
            ,
            e.prototype._salt_base64_encode = function(e) {
                var t = e + this._salt;
                return i.default.encode(t)
            }
            ,
            e.prototype._salt_base64_decode = function(e) {
                return e ? i.default.decode(e).replace(this._salt, "") : null
            }
            ,
            e._instance = null,
            e
        }();
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../configs/BaseConfig": "BaseConfig",
        "./Base64": "Base64",
        "./MapES5": "MapES5"
    }],
    LogoUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "86153qc1dhC0rHpaqiNDq00", "LogoUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./BaseUI")
          , i = e("./UIManager")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = i.UIType.Once,
                t.render = i.UIRender.CloseOther,
                t.mask = null,
                t._endHandler = null,
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {}
            ,
            t.prototype.flash = function(t) {
                e.prototype.show.call(this),
                this._endHandler = t,
                this._start()
            }
            ,
            t.prototype._start = function() {
                this.mask.opacity = 255,
                this._light()
            }
            ,
            t.prototype._light = function() {
                this.mask.runAction(cc.fadeOut(.5)),
                this.mask.runAction(cc.callFunc(this._hold.bind(this)))
            }
            ,
            t.prototype._hold = function() {
                this.scheduleOnce(this._unlight.bind(this), 1)
            }
            ,
            t.prototype._unlight = function() {
                this.mask.runAction(cc.fadeIn(.5)),
                this.mask.runAction(cc.callFunc(this._end.bind(this)))
            }
            ,
            t.prototype._end = function() {
                this.hide(),
                this._endHandler && this._endHandler()
            }
            ,
            t.uiName = "LogoUI",
            __decorate([s(cc.Node)], t.prototype, "mask", void 0),
            t = __decorate([a], t)
        }(n.default);
        o.default = c,
        cc._RF.pop()
    }
    , {
        "./BaseUI": "BaseUI",
        "./UIManager": "UIManager"
    }],
    MapES5: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f4db9qbl+NJKKKrx25hQ1co", "MapES5"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {
                this._keys = null,
                this._values = null,
                this._keys = new Array,
                this._values = new Array
            }
            return e.prototype.set = function(e, t) {
                var o = this._keys.indexOf(e);
                o >= 0 ? this._values[o] = t : (this._keys.push(e),
                this._values.push(t))
            }
            ,
            e.prototype.get = function(e) {
                var t = this._keys.indexOf(e);
                return t >= 0 ? this._values[t] : void 0
            }
            ,
            e.prototype.delete = function(e) {
                var t = this._keys.indexOf(e);
                t >= 0 && (this._keys.splice(t, 1),
                this._values.splice(t, 1))
            }
            ,
            e.prototype.forEach = function(e) {
                for (var t = 0; t < this._keys.length; t++)
                    e(this._values[t], this._keys[t])
            }
            ,
            e.prototype.clear = function() {
                this._keys.length = 0,
                this._values.length = 0
            }
            ,
            Object.defineProperty(e.prototype, "size", {
                get: function() {
                    return this._keys.length
                },
                enumerable: !0,
                configurable: !0
            }),
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    Message: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "343f6adrwFEtpvSnKyqNQbf", "Message"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = e("./type")
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bg = null,
                t.icon = null,
                t.text = null,
                t.duration = 1.5,
                t.type = r.MessageType.info,
                t
            }
            return __extends(t, e),
            t.prototype.hide = function() {
                e.prototype.hide.call(this)
            }
            ,
            t.prototype.show = function(t) {
                var o = this;
                e.prototype.show.call(this, t),
                this.setStyleByType(),
                setTimeout(function() {
                    o.hide()
                }, 1e3 * this.duration)
            }
            ,
            t.prototype.info = function(e, t) {
                void 0 === t && (t = 1.5),
                this.duration = t,
                this.type = r.MessageType.info,
                this.show(e)
            }
            ,
            t.prototype.error = function(e, t) {
                void 0 === t && (t = 1.5),
                this.duration = t,
                this.type = r.MessageType.error,
                this.show(e)
            }
            ,
            t.prototype.success = function(e, t) {
                void 0 === t && (t = 1.5),
                this.duration = t,
                this.type = r.MessageType.success,
                this.show(e)
            }
            ,
            t.prototype.warning = function(e, t) {
                void 0 === t && (t = 1.5),
                this.duration = t,
                this.type = r.MessageType.warning,
                this.show(e)
            }
            ,
            t.prototype.setInfo = function() {
                this.text.string = this.options.content
            }
            ,
            t.prototype.setStyleByType = function() {
                this.type === r.MessageType.info ? (this.text.node.color = new cc.Color(91,119,153,255),
                this.bg.spriteFrame = cc.loader.getRes("main/images/img/message/bg-info", cc.SpriteFrame),
                this.icon.spriteFrame = cc.loader.getRes("main/images/img/message/icon-info", cc.SpriteFrame)) : this.type === r.MessageType.success ? (this.text.node.color = new cc.Color(114,194,65,255),
                this.bg.spriteFrame = cc.loader.getRes("main/images/img/message/bg-success", cc.SpriteFrame),
                this.icon.spriteFrame = cc.loader.getRes("main/images/img/message/icon-success", cc.SpriteFrame)) : this.type === r.MessageType.error ? (this.text.node.color = new cc.Color(216,90,70,255),
                this.bg.spriteFrame = cc.loader.getRes("main/images/img/message/bg-error", cc.SpriteFrame),
                this.icon.spriteFrame = cc.loader.getRes("main/images/img/message/icon-error", cc.SpriteFrame)) : (this.text.node.color = new cc.Color(238,153,74,255),
                this.bg.spriteFrame = cc.loader.getRes("main/images/img/message/bg-warning", cc.SpriteFrame),
                this.icon.spriteFrame = cc.loader.getRes("main/images/img/message/icon-warning", cc.SpriteFrame))
            }
            ,
            __decorate([i(cc.Sprite)], t.prototype, "bg", void 0),
            __decorate([i(cc.Sprite)], t.prototype, "icon", void 0),
            __decorate([i(cc.Label)], t.prototype, "text", void 0),
            t = __decorate([n()], t)
        }(e("./ModalBase").default);
        o.default = a,
        cc._RF.pop()
    }
    , {
        "./ModalBase": "ModalBase",
        "./type": "type"
    }],
    MicroGameConfig: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "91b87WYnshFWoGB+1VKMx90", "MicroGameConfig"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../common/BaseUtils")
          , i = e("../configs/BaseConfig")
          , r = function() {
            return function(e, t) {
                this.httpUrl = "http://local.dev.163.com:4001",
                n.default.getQueryVariable("debug").indexOf("true") < 0 && (this.httpUrl = i.default.battleServerUrl),
                this.mock = e,
                this.onConnect = t.onConnect.bind(t),
                this.onMatchStart = t.onMatchStart.bind(t),
                this.onMatchCancel = t.onMatchCancel.bind(t),
                this.onMatchSuccess = t.onMatchSuccess.bind(t),
                this.onPlayerJoin = t.onPlayerJoin.bind(t),
                this.onRoomStatusChange = t.onRoomStatusChange.bind(t),
                this.onUpdate = t.onUpdate.bind(t),
                this.onOption = t.onOption.bind(t),
                this.onGetResult = t.onGetResult.bind(t)
            }
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "../common/BaseUtils": "BaseUtils",
        "../configs/BaseConfig": "BaseConfig"
    }],
    MicroGameConstants: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "268d01UIcZP7pwoWp/xVmY6", "MicroGameConstants"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        }),
        o.PinusEvent = {
            IO_Errot: "io-error",
            Close: "close",
            Error: "error",
            Heartbeat_Timeout: "heartbeat timeout"
        },
        o.PinusPath = {
            Connector_Login: "connector.entryHandler.entry",
            Match_Start: "match.matchHandler.startMatch",
            Cancel_Start: "match.matchHandler.cancelMatch",
            Connector_JoinRoom: "connector.entryHandler.joinRoom",
            Battle_Ready: "battle.battleHandler.loadingOk",
            Battle_Operate: "battle.battleHandler.operate"
        },
        o.PinusNotify = {
            OnMatchSuccess: "onMatchSuccess",
            OnJoin: "onJoin",
            OnRoomStatusChange: "onRoomStatusChange",
            OnFrameUpdate: "onFrameUpdate",
            OnServerError: "onServerError"
        },
        o.MicroGameEvent = {
            Micro_LoginConnectorSuccess: "Micro_LoginConnectorSuccess",
            Micro_OnMatchStart: "Micro_OnMatchStart",
            Micro_OnMatchCancel: "Micro_OnMatchCancel",
            Micro_OnMatchSuccess: "Micro_OnMatchSuccess",
            Micro_OnPlayerJoin: "Micro_OnPlayerJoin",
            Micro_ReJoinGame: "Micro_ReJoinGame",
            Micro_RoomStatusChange: "Micro_RoomStatusChange",
            Micro_FrameUpdate: "Micro_FrameUpdate",
            Micro_Option: "Micro_Option",
            Micro_Get_Result: "Micro_Get_Result"
        },
        o.errorCode = {
            rightRes: {
                code: 200
            },
            serverErr: {
                code: 500,
                msg: "Server error. Error code\uff1a500"
            },
            notFound: {
                code: 404,
                msg: "Server error. Error code\uff1a404"
            },
            invalidParams: {
                code: 1001,
                msg: "Server error. Error code\uff1a1001"
            },
            connectorNotExist: {
                code: 1002,
                msg: "Server error. Error code\uff1a1002"
            },
            invalidSkey: {
                code: 1003,
                msg: "Server error. Error code\uff1a1003"
            },
            tokenNotExist: {
                code: 1004,
                msg: "Server error. Error code\uff1a1004"
            },
            tokenExpired: {
                code: 1005,
                msg: "Server error. Error code\uff1a1005"
            },
            tokenInvalid: {
                code: 1006,
                msg: "Server error. Error code\uff1a1006"
            },
            roleIdNotMatch: {
                code: 1007,
                msg: "Server error. Error code\uff1a1007"
            },
            roomNotExist: {
                code: 1008,
                msg: "Server error. Error code\uff1a1008"
            },
            roomIsEnd: {
                code: 1009,
                msg: "Server error. Error code\uff1a1009"
            },
            plzConnect: {
                code: 1010,
                msg: "Server error. Error code\uff1a1010"
            },
            playerNotExist: {
                code: 1011,
                msg: "Server error. Error code\uff1a1011"
            },
            unknownOperation: {
                code: 1012,
                msg: "Server error. Error code\uff1a1012"
            },
            serverIsClosed: {
                code: 1013,
                msg: "Server error. Error code\uff1a1013"
            },
            playerIsAlreadyOnline: {
                code: 1014,
                msg: "Server error. Error code\uff1a1014"
            }
        },
        o.ServerErrorCode = {
            kickByAdmin: {
                code: 3001,
                msg: "admin kick"
            },
            kickByRepeatLogin: {
                code: 3002,
                msg: "Your account may be logged in elsewhere"
            }
        },
        cc._RF.pop()
    }
    , {}],
    MicroGameSocket: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "6288bbrSx1P9aX+1gZs6gR3", "MicroGameSocket"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = e("../../scripts/modal/Modal"), r = e("../common/BaseUtils"), a = e("../common/EventManager"), s = e("../common/Sdk"), c = e("../mock/MockServer"), l = e("./HttpManager"), p = e("./MicroGameConstants"), u = e("./Pinus"), h = function() {
            function e() {
                this._initiativeDisconnect = !1,
                this._isConnecting = !1,
                this._connector = null,
                this._config = null,
                this._roleId = Math.floor(1e4 * Math.random()).toString(),
                this._skey = "283b189d416c49f3f2a5fe5362ee6e86",
                this._token = "",
                this.roomId = "",
                this._roleName = "\u6d4b\u8bd5\u8d26\u53f7",
                this._connectorAddress = null,
                this.gameData = {},
                this.config = {},
                this.table = {}
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "roleId", {
                get: function() {
                    return this._roleId
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "roleName", {
                get: function() {
                    return this._roleName
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this._config = e
            }
            ,
            e.prototype.connect = function() {
                var e = this;
                s.default.Instance.inSdk ? (this._getInfoBySdk(),
                this._config.mock ? (this._config.onConnect && this._config.onConnect({
                    roomId: void 0
                }),
                a.default.instance.event(p.MicroGameEvent.Micro_LoginConnectorSuccess, {
                    roomId: void 0
                })) : this._connectConnector()) : this._config.mock ? (this._config.onConnect && this._config.onConnect({
                    roomId: void 0
                }),
                a.default.instance.event(p.MicroGameEvent.Micro_LoginConnectorSuccess, {
                    roomId: void 0
                })) : (this._roleId = r.default.getQueryVariable("roleId") || this._roleId,
                this._skey = r.default.getQueryVariable("skey") || this._skey,
                this._roleName = r.default.getQueryVariable("roleName") || this._roleName,
                this._micro_log("get user info", this._roleId, this._skey, this._roleName),
                this._micro_log("getting link info..."),
                l.default.instance.post(this._config.httpUrl + "/gameApi/login/getLinkInfo", {
                    roleId: this._roleId,
                    time: Date.now(),
                    skey: this._skey,
                    otherRoleInfo: __assign({}, c.default.instance.getTable(), {
                        roleId: this._roleId,
                        roleName: this._roleName
                    })
                }).then(function(t) {
                    if (console.log(t),
                    0 != t.code)
                        throw new Error(t.msg);
                    var o = t.data
                      , n = o.connectorAddress
                      , i = o.token;
                    e._connectorAddress = n,
                    e._token = i,
                    e._connectConnector()
                }).catch(function(t) {
                    e._micro_error("getting link info failed", t)
                }))
            }
            ,
            e.prototype._connectConnector = function() {
                var e = this
                  , t = this._connectorAddress
                  , o = t.host
                  , n = t.port;
                this._micro_log("linking connector...", o, n),
                this._connector && this.disconnect(),
                this._connector = new u.Pinus,
                this._initiativeDisconnect = !1,
                this._isConnecting = !0,
                this._connector.init({
                    host: o,
                    port: n,
                    log: !0
                }, this._login.bind(this), function() {
                    s.default.Instance.inSdk ? s.default.Instance.Post(s.default.GO_HOME, "linking connector failed") : i.default.alert("linking connector failed"),
                    e._micro_error("linking connector failed", o, n)
                })
            }
            ,
            e.prototype._login = function() {
                var e = this;
                this._isConnecting = !1,
                this._confirmSocket() && (this._connector.on(p.PinusEvent.Close, this._onClose.bind(this)),
                this._connector.on(p.PinusEvent.Error, this._onError.bind(this)),
                this._connector.on(p.PinusEvent.IO_Errot, this._onIOError.bind(this)),
                this._connector.on(p.PinusEvent.Heartbeat_Timeout, this._onHeartbeatTimeout.bind(this)),
                this._connector.on(p.PinusNotify.OnMatchSuccess, this._onMatchSuccess.bind(this)),
                this._connector.on(p.PinusNotify.OnJoin, this._onJoin.bind(this)),
                this._connector.on(p.PinusNotify.OnRoomStatusChange, this._onRoomStatusChange.bind(this)),
                this._connector.on(p.PinusNotify.OnFrameUpdate, this._onFrameUpdate.bind(this)),
                this._connector.on(p.PinusNotify.OnServerError, this._onServerError.bind(this)),
                this._micro_log("logining connector..."),
                this._connector.request(p.PinusPath.Connector_Login, {
                    roleId: this._roleId,
                    token: this._token
                }, function(t) {
                    if (e._disposeResponse(t)) {
                        e._micro_log("login connector success");
                        var o = t.data.roomId;
                        e.roomId = o,
                        e._config.onConnect && e._config.onConnect({
                            roomId: o
                        }),
                        a.default.instance.event(p.MicroGameEvent.Micro_LoginConnectorSuccess, {
                            roomId: o
                        })
                    } else
                        i.default.alert(t.msg || t.errorCode.msg),
                        e._micro_error("login connector failed", t)
                }))
            }
            ,
            e.prototype.startMatch = function(e) {
                var t = this;
                if (this._micro_log("start match: " + e),
                this._config.mock)
                    c.default.instance.startMatch(e, function() {
                        t._onMatchSuccess({
                            roomId: void 0
                        })
                    }),
                    this._config.onMatchStart && this._config.onMatchStart(),
                    a.default.instance.event(p.MicroGameEvent.Micro_OnMatchStart);
                else {
                    if (!this._confirmSocket())
                        return;
                    this._connector.request(p.PinusPath.Match_Start, {
                        roleId: this._roleId,
                        mode: e
                    }, function(e) {
                        t._disposeResponse(e) ? (t._micro_log("matching..."),
                        t._config.onMatchStart && t._config.onMatchStart(),
                        a.default.instance.event(p.MicroGameEvent.Micro_OnMatchStart)) : (i.default.alert(e.msg),
                        t._micro_error("start match failed", e))
                    })
                }
            }
            ,
            e.prototype.cancelMatch = function() {
                var e = this;
                if (this._micro_log("cancel match"),
                this._config.mock)
                    c.default.instance.cancelMatch(),
                    this._config.onMatchCancel && this._config.onMatchCancel(),
                    a.default.instance.event(p.MicroGameEvent.Micro_OnMatchCancel);
                else {
                    if (!this._confirmSocket())
                        return;
                    this._connector.request(p.PinusPath.Cancel_Start, {
                        roleId: this._roleId
                    }, function(t) {
                        e._disposeResponse(t) ? (e._micro_log("cancel match success"),
                        e._config.onMatchCancel && e._config.onMatchCancel(),
                        a.default.instance.event(p.MicroGameEvent.Micro_OnMatchCancel)) : (i.default.alert(t.msg),
                        e._micro_warn("cancel match failed"))
                    })
                }
            }
            ,
            e.prototype.joinRoom = function(e) {
                var t = this;
                if (void 0 === e && (e = !1),
                this._micro_log("join room..."),
                this._config.mock)
                    c.default.instance.joinRoom(function() {
                        c.default.instance.start(function() {
                            t._onRoomStatusChange({
                                currentStatus: n.end,
                                result: c.default.instance.getResult()
                            })
                        }, function(e) {
                            t._onFrameUpdate(e)
                        }),
                        t._onRoomStatusChange({
                            currentStatus: n.loading,
                            game: c.default.instance.getGameData(),
                            config: c.default.instance.getConfig(),
                            table: c.default.instance.getTable()
                        })
                    });
                else {
                    if (!this._confirmSocket())
                        return;
                    this._connector.request(p.PinusPath.Connector_JoinRoom, {
                        roleId: this._roleId,
                        roomId: this.roomId
                    }, function(o) {
                        if (t._disposeResponse(o)) {
                            t._micro_log("join room success", o);
                            var r = o.data
                              , a = r.game
                              , s = r.config
                              , c = r.table
                              , l = r.currentStatus;
                            e && (l >= n.loading && t._onRoomStatusChange({
                                currentStatus: n.loading,
                                game: a,
                                config: s,
                                table: c
                            }),
                            l >= n.playing && t._onRoomStatusChange({
                                currentStatus: n.playing
                            }))
                        } else
                            i.default.alert(o.msg || o.errorCode.msg),
                            t._micro_error("join room failed", o)
                    })
                }
            }
            ,
            e.prototype.ready = function() {
                var e = this;
                if (this._micro_log("ready ..."),
                this._config.mock)
                    c.default.instance.ready(function(t) {
                        e._onRoomStatusChange(__assign({
                            currentStatus: n.startCountdown
                        }, t))
                    }, function(t) {
                        e._onRoomStatusChange(__assign({
                            currentStatus: n.playing,
                            game: e.gameData
                        }, t))
                    });
                else {
                    if (!this._confirmSocket())
                        return;
                    this._connector.request(p.PinusPath.Battle_Ready, {
                        roleId: this._roleId,
                        roomId: this.roomId
                    }, function(t) {
                        e._disposeResponse(t) ? e._micro_log("ready success") : (i.default.alert(t.msg || t.errorCode.msg),
                        e._micro_error("ready failed", t))
                    })
                }
            }
            ,
            e.prototype.operate = function(e, t) {
                var o = this;
                if (void 0 === t && (t = {}),
                this._micro_log("operate " + e + " " + JSON.stringify(t) + " ..."),
                this._config.mock) {
                    var n = c.default.instance.option({
                        type: e,
                        data: t
                    });
                    this._config.onOption && this._config.onOption(n),
                    a.default.instance.event(p.MicroGameEvent.Micro_Option, {
                        type: e,
                        data: n
                    })
                } else {
                    if (!this._confirmSocket())
                        return;
                    this._connector.request(p.PinusPath.Battle_Operate, {
                        type: e,
                        data: t,
                        roleId: this._roleId,
                        roomId: this.roomId
                    }, function(e) {
                        o._disposeResponse(e) ? (o._micro_log("operate success"),
                        o._config.onOption && o._config.onOption(e.data),
                        a.default.instance.event(p.MicroGameEvent.Micro_Option, e.data)) : (i.default.alert(e.msg || e.errorCode.msg),
                        o._micro_error("operate failed", e))
                    })
                }
            }
            ,
            e.prototype.getResult = function() {
                var e = this;
                if (this._config.mock) {
                    var t = c.default.instance.getResult();
                    this._config.onGetResult && this._config.onGetResult({
                        result: t
                    })
                } else {
                    this._micro_log("getting result info...");
                    var o = this._config.httpUrl + "/gameApi/room/getResult?roomId=" + this.roomId + "&time=" + Date.now() + "&skey=" + this._skey;
                    l.default.instance.get(o).then(function(t) {
                        t.code;
                        var o = t.data;
                        e._config.onGetResult && e._config.onGetResult({
                            result: o
                        }),
                        a.default.instance.event(p.MicroGameEvent.Micro_Get_Result)
                    }).catch(function(t) {
                        e._micro_error("getting result info failed")
                    })
                }
            }
            ,
            e.prototype.disconnect = function() {
                this._connector && (this._initiativeDisconnect = !0,
                this._connector.disconnect(),
                this._connector = null,
                this._isConnecting = !1)
            }
            ,
            e.prototype._onMatchSuccess = function(e) {
                var t = e.roomId;
                this.roomId = t,
                this._micro_log("match success", this.roomId),
                this._config.onMatchSuccess && this._config.onMatchSuccess(),
                a.default.instance.event(p.MicroGameEvent.Micro_OnMatchSuccess)
            }
            ,
            e.prototype._onJoin = function(e) {
                var t = e.allPlayers;
                e.player;
                this._micro_log("had player join the room"),
                this._micro_log("room members:", t.length);
                for (var o = 0; o < t.length; o++)
                    this._micro_log(t[o]);
                this._config.onPlayerJoin && this._config.onPlayerJoin(e),
                a.default.instance.event(p.MicroGameEvent.Micro_OnPlayerJoin, e)
            }
            ,
            e.prototype._onRoomStatusChange = function(e) {
                var t = e.currentStatus
                  , o = e.game
                  , i = e.config
                  , s = e.table
                  , c = e.result
                  , l = "unknow";
                switch (t) {
                case n.create:
                    l = "create";
                    break;
                case n.linking:
                    l = "linking";
                    break;
                case n.loading:
                    l = "loading",
                    this.table ? this.table = r.default.decodeData(s) : console.error("\u7f3a\u5c11\u6e38\u620ftable"),
                    o ? this.gameData = r.default.decodeData(o) : console.error("\u7f3a\u5c11game data"),
                    i ? this.config = r.default.decodeData(r.default.encodeData(i)) : console.error("\u7f3a\u5c11config");
                    break;
                case n.startCountdown:
                    l = "start countdown";
                    break;
                case n.playing:
                    l = "playing";
                    break;
                case n.end:
                    l = "end";
                    break;
                default:
                    this._micro_error("unknow roomstate:", {
                        currentStatus: t
                    })
                }
                this._micro_log("room status changed to", l),
                this._config.onRoomStatusChange && this._config.onRoomStatusChange({
                    currentStatus: t,
                    result: c
                }),
                a.default.instance.event(p.MicroGameEvent.Micro_RoomStatusChange, {
                    currentStatus: t
                })
            }
            ,
            e.prototype._onFrameUpdate = function(e) {
                this._config.onUpdate(r.default.decodeData(e)),
                a.default.instance.event(p.MicroGameEvent.Micro_FrameUpdate, e)
            }
            ,
            e.prototype._getInfoBySdk = function() {
                var e = s.default.Instance.microGame
                  , t = e.roleInfo
                  , o = e.connectorAddress
                  , n = e.token;
                this._roleId = t.roleId,
                this._roleName = t.roleName,
                this._token = n,
                this._connectorAddress = o
            }
            ,
            e.prototype._onServerError = function(e) {
                var t = e.code
                  , o = e.msg;
                switch (this._micro_error(t, o),
                t) {
                case p.ServerErrorCode.kickByAdmin.code:
                    i.default.alert(p.ServerErrorCode.kickByAdmin.msg),
                    this.disconnect();
                    break;
                case p.ServerErrorCode.kickByRepeatLogin.code:
                    s.default.Instance.inSdk ? s.default.Instance.Post(s.default.GO_HOME, p.ServerErrorCode.kickByRepeatLogin.msg) : i.default.alert(p.ServerErrorCode.kickByRepeatLogin.msg),
                    this.disconnect();
                    break;
                default:
                    i.default.alert("unknown error: " + t)
                }
            }
            ,
            e.prototype._onError = function(e) {
                this._micro_error(e),
                i.default.alert(e)
            }
            ,
            e.prototype._onClose = function() {
                this._initiativeDisconnect || (i.default.alert("link closed"),
                this.disconnect())
            }
            ,
            e.prototype._onIOError = function(e) {
                this._micro_error(e),
                i.default.alert(e)
            }
            ,
            e.prototype._onHeartbeatTimeout = function() {
                i.default.alert("heartbeat timeout")
            }
            ,
            e.prototype._disposeResponse = function(e) {
                return e.code == p.errorCode.rightRes.code
            }
            ,
            e.prototype._confirmSocket = function() {
                return this._connector ? !this._isConnecting : (this._connectorAddress,
                !1)
            }
            ,
            e.prototype._micro_log = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                console.log.apply(console, ["[MicroGameSocket]"].concat(e))
            }
            ,
            e.prototype._micro_warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                console.warn.apply(console, ["[MicroGameSocket]"].concat(e))
            }
            ,
            e.prototype._micro_error = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                console.error.apply(console, ["[MicroGameSocket]"].concat(e))
            }
            ,
            e._instance = null,
            e
        }();
        o.default = h,
        function(e) {
            e[e.create = 1] = "create",
            e[e.linking = 2] = "linking",
            e[e.loading = 3] = "loading",
            e[e.startCountdown = 4] = "startCountdown",
            e[e.playing = 5] = "playing",
            e[e.end = 6] = "end"
        }(n = o.RoomStatus || (o.RoomStatus = {})),
        cc._RF.pop()
    }
    , {
        "../../scripts/modal/Modal": "Modal",
        "../common/BaseUtils": "BaseUtils",
        "../common/EventManager": "EventManager",
        "../common/Sdk": "Sdk",
        "../mock/MockServer": "MockServer",
        "./HttpManager": "HttpManager",
        "./MicroGameConstants": "MicroGameConstants",
        "./Pinus": "Pinus"
    }],
    MockConfig: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "da774fvnzlOIZ6Wv946qnWy", "MockConfig"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        }),
        function(e) {
            e[e.Init = 0] = "Init",
            e[e.Start = 1] = "Start",
            e[e.Pause = 2] = "Pause",
            e[e.End = 3] = "End"
        }(o.GameState || (o.GameState = {})),
        o.operateParamsSchema = {
            setInfinityRelive: {
                properties: {},
                required: []
            },
            gameEnd: {
                properties: {},
                required: []
            },
            relive: {
                properties: {},
                required: []
            },
            die: {
                properties: {},
                required: []
            },
            useProps: {
                properties: {
                    propsType: {
                        type: "number"
                    },
                    id: {
                        type: "number"
                    }
                },
                required: ["propsType", "id"]
            },
            unlockedFace: {
                properties: {
                    unlockedFace: {
                        type: "number"
                    }
                },
                required: ["unlockedFace"]
            },
            pause: {
                properties: {
                    record: {
                        type: "boolean"
                    }
                },
                required: []
            },
            resume: {
                properties: {
                    record: {
                        type: "boolean"
                    }
                },
                required: []
            },
            enterTeleport: {
                properties: {},
                required: []
            },
            leaveTeleport: {
                properties: {},
                required: []
            },
            destroyTeleport: {
                properties: {},
                required: []
            }
        },
        o.gameCfg = {
            frame: 60,
            operateMaxInterval: 60,
            StageWidth: 750,
            StageHeight: 1624,
            GameSpeed: 504,
            BgSpeed: 300,
            ClientFrame: 60,
            syncCacheFrame: 0,
            countdownTime: 0,
            roomPlayerNum: 1,
            loadingMaxTime: 60,
            roomMaxOfflineAliveTime: 0,
            matchIntervalMatchNum: 1e3,
            matchIntervalLockTime: 5,
            mathRule: "default",
            httpMode: "signal"
        },
        o.battleCfg = {
            default: {
                bg1LoopNumber: 2,
                bg1Width: 3e3,
                bgTransitionWidth: 3e3,
                bg2Width: 3e3,
                maxBlockHeight: 1e3,
                bgSpeed: 300,
                gameSpeed: 504,
                gameSpeedPower: 1.3,
                createBlockNumber: 5,
                stages: [{
                    index: 0,
                    blockNumber: 0
                }, {
                    index: 1,
                    blockNumber: 15
                }, {
                    index: 2,
                    blockNumber: 30
                }, {
                    index: 3,
                    blockNumber: 60
                }, {
                    index: 4,
                    blockNumber: 90
                }],
                iceMothCommonConfig: {
                    spaceDurationTime: 8,
                    gameSpeedPower: .5,
                    iceSpeed: [514, 614],
                    iceRotationRange: [25, 65],
                    iceDuration: 5,
                    iceCreatedSpaceTime: .3,
                    iceScaleRange: [1, 6],
                    initY: 600
                },
                propsConfig: {
                    1: {
                        duration: 4,
                        bulletSpeed: 2e3,
                        bulletSpaceTime: .1
                    },
                    2: {
                        slow: .9,
                        duration: 4
                    },
                    3: {
                        scale: .6,
                        duration: 4
                    },
                    4: {
                        score: 5
                    },
                    5: {
                        duration: 4,
                        tipTime: 2
                    },
                    6: {},
                    7: {
                        unlockBlockNumber: [50, 100, 200, 400, 800, 1e3]
                    }
                },
                stagesBlockConfig: [{
                    createPropsSpaceBlockNumber: [3, 5],
                    blockSpaceRange: [700, 700],
                    blockVerticalRange: [724, 824],
                    blockCenterRange: [50, 100],
                    score: 1,
                    props: {
                        1: {
                            rate: .6
                        },
                        3: {
                            rate: .4
                        }
                    }
                }, {
                    createPropsSpaceBlockNumber: [3, 5],
                    blockSpaceRange: [600, 700],
                    blockVerticalRange: [574, 650],
                    blockCenterRange: [200, 300],
                    score: 1,
                    props: {
                        1: {
                            rate: .4
                        },
                        3: {
                            rate: .35
                        },
                        4: {
                            rate: .1
                        },
                        5: {
                            rate: .15
                        }
                    },
                    fogConfig: {
                        durationBlockNumber: 5,
                        appearRate: {
                            1: .7,
                            2: .3
                        },
                        enemyHandRate: .5
                    }
                }, {
                    createPropsSpaceBlockNumber: [3, 5],
                    blockSpaceRange: [600, 700],
                    blockVerticalRange: [524, 624],
                    blockCenterRange: [150, 350],
                    score: 1,
                    props: {
                        1: {
                            rate: .1
                        },
                        3: {
                            rate: .25
                        },
                        4: {
                            rate: .25
                        },
                        5: {
                            rate: .4
                        }
                    },
                    iceMothConfig: {
                        appearRate: {
                            1: .3,
                            2: .6,
                            3: .1
                        }
                    }
                }, {
                    createPropsSpaceBlockNumber: [3, 5],
                    blockSpaceRange: [525, 625],
                    blockVerticalRange: [524, 624],
                    blockCenterRange: [100, 400],
                    score: 1,
                    props: {
                        1: {
                            rate: .05
                        },
                        3: {
                            rate: .15
                        },
                        4: {
                            rate: .3
                        },
                        5: {
                            rate: .5
                        }
                    },
                    fogConfig: {
                        durationBlockNumber: 10,
                        appearRate: {
                            1: .3,
                            2: .6,
                            3: .1
                        },
                        enemyHandRate: .5
                    }
                }, {
                    createPropsSpaceBlockNumber: [3, 5],
                    blockSpaceRange: [500, 600],
                    blockVerticalRange: [500, 600],
                    blockCenterRange: [100, 450],
                    score: 1,
                    props: {
                        1: {
                            rate: .05
                        },
                        3: {
                            rate: .05
                        },
                        4: {
                            rate: .55
                        },
                        5: {
                            rate: .35
                        }
                    },
                    fogConfig: {
                        durationBlockNumber: 10,
                        appearSpaceBlock: 15,
                        appearRate: {
                            1: .8
                        },
                        enemyHandRate: .5
                    },
                    iceMothConfig: {
                        appearSpaceBlock: 5,
                        appearRate: {
                            1: .8
                        }
                    }
                }],
                playerConfig: {
                    initX: -150,
                    initY: 0,
                    initSpeed: -735,
                    g: 27,
                    collisionRadius: 90,
                    deltaRot: .05,
                    iceSpeedPower: .7,
                    initRot: -10,
                    maxRot: 15
                },
                blockCollisionSizeConfig: {
                    hyjProps: {
                        width: 360,
                        height: 1e3
                    },
                    hlgProps: {
                        width: 170,
                        height: 1e3
                    },
                    hlg1: {
                        width: 130,
                        height: 920,
                        y: -40
                    },
                    hlg2: {
                        width: 150,
                        height: 900,
                        y: -50
                    },
                    jkzProps: {
                        width: 210,
                        height: 1e3
                    },
                    jkz1: {
                        width: 350,
                        height: 920,
                        y: -40
                    },
                    jkz2: {
                        width: 166,
                        height: 950,
                        y: -25
                    }
                },
                blockTypes: {
                    hyj: ["hyjProps"],
                    hlg: ["hlg1", "hlg2"],
                    jkz: ["jkz1", "jkz2"]
                },
                blockSizeConfig: {
                    hyjProps: {
                        width: 570
                    },
                    hlg1: {
                        width: 400
                    },
                    hlg2: {
                        width: 197
                    },
                    hlgProps: {
                        width: 248
                    },
                    jkz1: {
                        width: 606
                    },
                    jkz2: {
                        width: 287
                    },
                    jkzProps: {
                        width: 272
                    }
                },
                appearTeleportSpaceBlock: 40,
                teleportBlockNumber: 10,
                teleportCollisionSize: {
                    width: 160,
                    height: 590
                },
                teleportSize: {
                    width: 409,
                    height: 755
                },
                teleport: {
                    createPropsSpaceBlockNumber: [1, 1],
                    blockSpaceRange: [800, 800],
                    blockVerticalRange: [800, 900],
                    blockCenterRange: [50, 100],
                    score: 1,
                    props: {
                        4: {
                            rate: 1
                        }
                    }
                }
            }
        },
        cc._RF.pop()
    }
    , {}],
    MockServer: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ead26QqZnVKqoc3ccofrcNF", "MockServer"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./MockConfig")
          , i = e("../common/BaseUtils")
          , r = function() {
            function e() {
                this._game = null,
                this._matchId = -1,
                this._loopId = -1,
                this._lastTime = -1,
                this._mode = ""
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this._gameClass = e
            }
            ,
            e.prototype.startMatch = function(e, t) {
                this._mode = e,
                this._matchId = setTimeout(function() {
                    t && t()
                }, 1 == n.gameCfg.roomPlayerNum ? 0 : 1e3)
            }
            ,
            e.prototype.cancelMatch = function() {
                -1 != this._matchId && (clearTimeout(this._matchId),
                this._matchId = -1)
            }
            ,
            e.prototype.joinRoom = function(e) {
                this._game = new this._gameClass,
                this._game.init(this.getConfig(), this.getTable()),
                e && e()
            }
            ,
            e.prototype.ready = function(e, t) {
                var o = {
                    game: this._game,
                    config: this._game.config
                };
                setTimeout(function() {
                    e && e(o),
                    setTimeout(function() {
                        t && t(o)
                    }, 1e3 * n.gameCfg.countdownTime)
                }, 1e3)
            }
            ,
            e.prototype.start = function(e, t) {
                return this._endHandler = e,
                this._updateHandler = t,
                this._lastTime = Date.now(),
                this._loopId && clearInterval(this._loopId),
                this._loopId = setInterval(this._gameLoop.bind(this), 1e3 / n.gameCfg.frame),
                this._game.start()
            }
            ,
            e.prototype.update = function(e) {
                return i.default.encodeData(this._game.update(e))
            }
            ,
            e.prototype.option = function(e) {
                return this._game.option(e)
            }
            ,
            e.prototype.getGameData = function() {
                return i.default.encodeData(this._game.gameData)
            }
            ,
            e.prototype.getResult = function() {
                return this._game.getResult()
            }
            ,
            e.prototype.getConfig = function() {
                return {
                    gameCfg: n.gameCfg,
                    battleCfg: n.battleCfg[this._mode] ? n.battleCfg[this._mode] : n.battleCfg.default
                }
            }
            ,
            e.prototype.getTable = function() {
                return {
                    roleName: "\u6d4b\u8bd5\u8d26\u53f7",
                    gameId: "2626dxbx",
                    roleId: "10011",
                    type: "default",
                    allBlockNumber: 48,
                    unlockedFace: [],
                    highestScore: 1e3,
                    isActivityLogin: 1,
                    rankInfo: [{
                        ratio: 90,
                        score: 5
                    }, {
                        ratio: 70,
                        score: 10
                    }, {
                        ratio: 20,
                        score: 15
                    }, {
                        ratio: 10,
                        score: 20
                    }, {
                        ratio: 0,
                        score: 25
                    }]
                }
            }
            ,
            e.prototype._gameLoop = function() {
                var e = Date.now()
                  , t = (e - this._lastTime) / 1e3;
                this._lastTime = e;
                var o = this.update(t);
                o && this._updateHandler(o),
                this._game.necessaryData.state == n.GameState.End && (this._endHandler && this._endHandler(),
                clearInterval(this._loopId))
            }
            ,
            e._instance = null,
            e
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "../common/BaseUtils": "BaseUtils",
        "./MockConfig": "MockConfig"
    }],
    ModalBase: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "14d366WFLxL7623Uk7aR0Pi", "ModalBase"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.options = {
                    title: "\u63d0\u793a",
                    content: "",
                    confirmText: "\u786e\u8ba4",
                    cancelText: "\u53d6\u6d88"
                },
                t.fadeOutAction = null,
                t
            }
            return __extends(t, e),
            t.prototype.update = function(e) {
                this.fadeOutAction && this.fadeOutAction.isDone() && (this.node.active = !1,
                this.fadeOutAction = null)
            }
            ,
            t.prototype.hide = function() {
                this.fadeOutAction = cc.fadeOut(.3),
                this.node.runAction(this.fadeOutAction)
            }
            ,
            t.prototype.show = function(e) {
                "string" == typeof e ? this.options.content = e : "object" == typeof e && (this.options = __assign({}, this.options, e)),
                this.setInfo(),
                this.node.active = !0,
                this.node.runAction(cc.fadeIn(.3))
            }
            ,
            t.prototype.setInfo = function() {}
            ,
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = i,
        cc._RF.pop()
    }
    , {}],
    ModalUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "00b9ch9VkRLz5JJUsrFV6RK", "ModalUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./BaseUI")
          , i = e("./UIManager")
          , r = e("../../../scripts/modal/Message")
          , a = e("../../../scripts/modal/Confirm")
          , s = e("../../../scripts/modal/Alert")
          , c = e("../../../scripts/modal/Prompt")
          , l = cc._decorator
          , p = l.ccclass
          , u = l.property
          , h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = i.UIType.Normal,
                t.render = i.UIRender.Normal,
                t.message = null,
                t.confirm = null,
                t.alert = null,
                t.prompt = null,
                t.gameMessage = null,
                t.gameConfirm = null,
                t.gameAlert = null,
                t.gamePrompt = null,
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.gameConfirm.active = !1,
                this.gameMessage.active = !1,
                this.gameAlert.active = !1,
                this.gamePrompt.active = !1,
                this.message = this.gameMessage.getComponent(r.default),
                this.confirm = this.gameConfirm.getComponent(a.default),
                this.alert = this.gameAlert.getComponent(s.default),
                this.prompt = this.gamePrompt.getComponent(c.default)
            }
            ,
            t.uiName = "ModalUI",
            t.zIndex = 1e3,
            __decorate([u(cc.Node)], t.prototype, "gameMessage", void 0),
            __decorate([u(cc.Node)], t.prototype, "gameConfirm", void 0),
            __decorate([u(cc.Node)], t.prototype, "gameAlert", void 0),
            __decorate([u(cc.Node)], t.prototype, "gamePrompt", void 0),
            t = __decorate([p], t)
        }(n.default);
        o.default = h,
        cc._RF.pop()
    }
    , {
        "../../../scripts/modal/Alert": "Alert",
        "../../../scripts/modal/Confirm": "Confirm",
        "../../../scripts/modal/Message": "Message",
        "../../../scripts/modal/Prompt": "Prompt",
        "./BaseUI": "BaseUI",
        "./UIManager": "UIManager"
    }],
    Modal: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c4bedBxRDhGmJ7J9EhZ2ZQn", "Modal"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/scripts/ui/UIManager")
          , i = e("../../ccc-library/common/Sdk")
          , r = e("../../ccc-library/scripts/ui/ModalUI")
          , a = function() {
            function e() {}
            return Object.defineProperty(e, "message", {
                get: function() {
                    return this.initModalUI(),
                    this.modalUI.message
                },
                enumerable: !0,
                configurable: !0
            }),
            e.confirm = function(e) {
                this.initModalUI(),
                this.modalUI.confirm.show(e)
            }
            ,
            e.alert = function(e) {
                if (i.default.Instance.inSdk) {
                    var t = "string" == typeof e ? e : e.content;
                    i.default.Instance.Post(i.default.SHOW_GAME_MESSAGE, JSON.stringify(t))
                } else
                    this.initModalUI(),
                    this.modalUI.alert.show(e)
            }
            ,
            e.prompt = function(e) {
                this.initModalUI(),
                this.modalUI.prompt.show(e)
            }
            ,
            e.initModalUI = function() {
                this.modalUI || (this.modalUI = n.default.instance.createUI(r.default, r.default.zIndex)),
                this.modalUI.show()
            }
            ,
            e.modalUI = null,
            e
        }();
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/Sdk": "Sdk",
        "../../ccc-library/scripts/ui/ModalUI": "ModalUI",
        "../../ccc-library/scripts/ui/UIManager": "UIManager"
    }],
    MothManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c1988kpfddC1KUEAsmHl6tS", "MothManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./MothScript")
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("./ElementScript")
          , a = e("./CollisionCalculation")
          , s = e("../../ccc-library/configs/BaseConfig")
          , c = function() {
            function e() {
                this._moth = null,
                this._parent = null,
                this._mothAppearNumber = 0,
                this._spaceDurationTime = 0,
                this._icePool = null,
                this._icePrefab = null,
                this._iceList = [],
                this._iceCreatedSpaceTime = 0
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e, t) {
                this.destroy(),
                this._parent = e,
                this._icePrefab = cc.loader.getRes("main/prefabs/Ice"),
                this._createIcePool(),
                this.createMoth(t)
            }
            ,
            e.prototype.destroy = function() {
                this._parent = null,
                this._moth && this._moth.destroySelf(),
                this._moth = null,
                this._mothAppearNumber = 0,
                this._spaceDurationTime = 0,
                this._icePool && this._icePool.clear(),
                this._icePrefab = null,
                this._iceList.forEach(function(e) {
                    return e.destroySelf(!0)
                }),
                this._iceList.length = 0,
                this._iceCreatedSpaceTime = 0
            }
            ,
            e.prototype.createMoth = function(e) {
                e <= 0 || (this._moth ? this._mothAppearNumber += e : (this._mothAppearNumber = e,
                this._instanceMoth()))
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._moth ? (this._moth.fixUpdate(e),
                this._iceCreatedSpaceTime -= e,
                this._iceCreatedSpaceTime <= 0 && (this._createIce(),
                this._iceCreatedSpaceTime = i.default.instance.config.battleCfg.iceMothCommonConfig.iceCreatedSpaceTime),
                this._moth.destroyFlag && (this._moth.destroySelf(),
                this._moth = null,
                this._spaceDurationTime = i.default.instance.config.battleCfg.iceMothCommonConfig.spaceDurationTime)) : !this._moth && this._mothAppearNumber > 0 && (this._spaceDurationTime -= e,
                this._spaceDurationTime < 0 && this._instanceMoth()),
                this._iceList.length && (this._iceList = this._iceList.filter(function(e) {
                    return !e.destroyFlag
                }),
                this._iceList.forEach(function(t) {
                    return t.moveBySpeed(e)
                }))
            }
            ,
            e.prototype.detectImpactPlayerWithIce = function(e) {
                if (e.isInvincible)
                    return !1;
                var t = null;
                return this._iceList.some(function(o) {
                    var n = o.getCollision();
                    if (!n || o.ignoreDetectImpact)
                        return !1;
                    var i = a.default.instance.calBoxAndCircle(n, e.getCollision());
                    return i === a.CollisionState.intersect && (t = o),
                    i === a.CollisionState.intersect
                }),
                null !== t
            }
            ,
            e.prototype._instanceMoth = function() {
                var e = cc.loader.getRes("main/prefabs/Moth")
                  , t = cc.instantiate(e);
                this._moth = t.getComponent(n.default),
                this._moth.init(),
                this._parent.addChild(t),
                this._mothAppearNumber--
            }
            ,
            e.prototype._createIce = function() {
                if (this._moth) {
                    var e;
                    (e = this._icePool.size() > 0 ? this._icePool.get() : this._instanceIce()).parent = this._parent;
                    var t = e.getComponent(r.default)
                      , o = i.default.instance.config.battleCfg.iceMothCommonConfig
                      , n = o.iceScaleRange
                      , a = n[0]
                      , c = n[1]
                      , l = a + Math.random() * (c - a);
                    t.init({
                        x: this._moth.position.x + s.default.StageWidth / 2,
                        y: this._moth.position.y,
                        width: e.width * l,
                        height: e.height * l
                    }, 0);
                    var p = o.iceSpeed[0] + (o.iceSpeed[1] - o.iceSpeed[0]) * Math.random()
                      , u = o.iceRotationRange[0] + (o.iceRotationRange[1] - o.iceRotationRange[0]) * Math.random()
                      , h = p * Math.cos(u / 180 * Math.PI)
                      , d = p * Math.sin(u / 180 * Math.PI);
                    t.setSpeed(h, d),
                    t.changeCollisionWidth(105 * l),
                    t.changeCollisionHeight(105 * l),
                    this._iceList.push(t)
                }
            }
            ,
            e.prototype._createIcePool = function() {
                this._icePool = new cc.NodePool;
                for (var e = 0; e < 10; e++) {
                    var t = this._instanceIce();
                    this._icePool.put(t)
                }
            }
            ,
            e.prototype._instanceIce = function() {
                var e = cc.instantiate(this._icePrefab);
                return e.addComponent(r.default),
                e
            }
            ,
            e._instance = null,
            e
        }();
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "./CollisionCalculation": "CollisionCalculation",
        "./ElementScript": "ElementScript",
        "./MothScript": "MothScript"
    }],
    MothScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "3bf411kvWpM45Ygo4HQ4vCM", "MothScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("../../ccc-library/configs/BaseConfig")
          , a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.destroyFlag = !1,
                t
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "position", {
                get: function() {
                    return this.node.position
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.init = function() {
                this.node.x = r.default.StageWidth / 2,
                this.node.y = i.default.instance.config.battleCfg.iceMothCommonConfig.initY - this.node.height / 2
            }
            ,
            t.prototype.fixUpdate = function(e) {
                var t = e * i.default.instance.config.battleCfg.gameSpeed * i.default.instance.config.battleCfg.iceMothCommonConfig.gameSpeedPower;
                this.node.x -= t,
                this.node.x <= -r.default.StageWidth / 2 - this.node.width && (this.destroyFlag = !0)
            }
            ,
            t.prototype.destroySelf = function() {
                this.node.destroy()
            }
            ,
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = a,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket"
    }],
    NecessaryData: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "8bcfe/ca2RP7r6nMHGO3mx7", "NecessaryData"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./MockConfig")
          , i = function() {
            function e() {
                this.state = n.GameState.Init
            }
            return e.prototype.init = function() {
                this.operateInterval = 0,
                this.gameTime = 0,
                this.frameId = 0,
                this.state = n.GameState.Init
            }
            ,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./MockConfig": "MockConfig"
    }],
    NewAEToolAnimation: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e03a7zrCXJJKIaR0Ckm7ZXm", "NewAEToolAnimation"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/IDE")
          , i = e("../../configs/BaseConfig")
          , r = cc.Boolean
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , l = a.menu
          , p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._data = null,
                t._pureData = null,
                t.map = null,
                t._pureMap = null,
                t.src = null,
                t.runningInit = !1,
                t.autoPlay = !1,
                t._previewFrame = 0,
                t._maxFrame = 0,
                t._rate = 1,
                t._isPlay = !1,
                t._targetLoopNum = 0,
                t._loopNum = 0,
                t._completedCallback = null,
                t._frame = 0,
                t._time = 0,
                t._rateCnt = 0,
                t
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "data", {
                get: function() {
                    return this._data
                },
                set: function(e) {
                    var t = this;
                    this._data = e,
                    n.default.InEditor() ? null != e ? n.default.GetAssetsUrlByUuid(e._uuid, function(o, i) {
                        if (o)
                            n.default.Error(o);
                        else {
                            var r = (i = i.replace(/\\/g, "/")).substring(i.indexOf("resources/") + 10, i.indexOf(e.name + ".json"));
                            t.src = r;
                            var a = "" + t.src + e.name + "_map.json";
                            n.default.GetAssetsUuidByUrl(a, function(e, o) {
                                cc.loader.load({
                                    uuid: o
                                }, function(e, o) {
                                    t.map = o
                                })
                            });
                            var s = e.json
                              , c = s.rate
                              , l = s.duration;
                            t.updateNodes(),
                            t.updateMaxFrame(c, l)
                        }
                    }) : (this.src = null,
                    this.updateNodes(),
                    this.updateMaxFrame(0, 0)) : this.updateNodes()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "_aniData", {
                get: function() {
                    return this._pureData || this._data && this._data.json
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "_aniMap", {
                get: function() {
                    return this._pureMap || this.map && this.map.json
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "previewFrame", {
                get: function() {
                    return this._previewFrame
                },
                set: function(e) {
                    e < 0 && (e = 0),
                    0 == this._maxFrame ? e = 0 : e %= this._maxFrame,
                    this._previewFrame = e,
                    this.gotoFrame(this._previewFrame)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "maxFrame", {
                get: function() {
                    return this._maxFrame
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "isPlay", {
                get: function() {
                    return this._isPlay
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.start = function() {
                this.init()
            }
            ,
            t.prototype.init = function() {
                if (!this._aniData)
                    return console.warn("json data is null");
                var e = this._aniData
                  , t = e.rate
                  , o = e.duration;
                this._rate = Math.round(i.default.frameRate / t),
                this._maxFrame = Math.ceil(o * t),
                this.autoPlay && this.play()
            }
            ,
            t.prototype.setData = function(e, t, o) {
                this.src = o,
                this.map = t,
                this.data = e,
                this.init()
            }
            ,
            t.prototype.setDataWithSpriteFrame = function(e, t) {
                this._pureMap = t,
                this._pureData = e,
                this.updateNodes(),
                this.init()
            }
            ,
            t.prototype._play = function() {
                this.gotoFrame(this._frame)
            }
            ,
            t.prototype.update = function(e) {
                this._isPlay && (this._rateCnt = (this._rateCnt + 1) % this._rate,
                0 == this._rateCnt && (this._frame++,
                this._frame >= this._maxFrame ? (this._frame %= this._maxFrame,
                this._targetLoopNum > 0 ? (this._loopNum++,
                this._loopNum >= this._targetLoopNum ? (this.stop(),
                this._completedCallback && this._completedCallback()) : (this._completedCallback && this._completedCallback(),
                this._play())) : this._play()) : this._play()))
            }
            ,
            t.prototype.play = function(e, t) {
                void 0 === e && (e = 0),
                void 0 === t && (t = null),
                this._completedCallback = t,
                this.setLoopNum(e),
                this._loopNum = 0,
                this._frame = 0,
                this._isPlay = !0
            }
            ,
            t.prototype.stop = function() {
                this._isPlay = !1
            }
            ,
            t.prototype.pause = function() {
                this._isPlay = !1
            }
            ,
            t.prototype.resume = function(e) {
                void 0 === e && (e = null),
                this._completedCallback = e,
                this._isPlay = !0
            }
            ,
            t.prototype.setLoopNum = function(e) {
                this._targetLoopNum = e
            }
            ,
            t.prototype.setPlaySpeed = function(e) {
                if (!(e <= 0)) {
                    var t = this._aniData.rate;
                    this._rate = Math.round(Math.round(i.default.frameRate / t) / e)
                }
            }
            ,
            t.prototype.getCurrentFrame = function() {
                return this._frame
            }
            ,
            t.prototype.updateNodes = function() {
                if (this._aniData) {
                    var e = this._aniData
                      , t = e.width
                      , o = e.height
                      , n = e.layers;
                    this.node.width = t,
                    this.node.height = o,
                    this.node.anchorX = 0,
                    this.node.anchorY = 0,
                    this._updateNodes(this.node, n)
                } else
                    this.node.removeAllChildren()
            }
            ,
            t.prototype._updateNodes = function(e, t) {
                for (var o = {}, n = 0; n < t.length; n++) {
                    o[r = t[n].name] = t[n]
                }
                var i = [];
                for (n = 0; n < e.children.length; n++)
                    o[e.children[n].name] || i.push(e.children[n]);
                for (n = 0; n < i.length; n++)
                    e.removeChild(i[n]);
                for (var r in o) {
                    var a = o[r]
                      , s = a.width
                      , c = a.height
                      , l = a.type
                      , p = e.getChildByName(r);
                    if (p || ((p = new cc.Node).name = r,
                    e.addChild(p)),
                    o[r].layers && o[r].layers.length > 0 && this._updateNodes(p, o[r].layers),
                    "img" == l || "spriteFrame" === l) {
                        var u = p.getComponent(cc.Sprite);
                        u || (u = p.addComponent(cc.Sprite)),
                        u.trim = !1,
                        u.sizeMode = cc.Sprite.SizeMode.RAW
                    }
                    p.width = s,
                    p.height = c
                }
            }
            ,
            t.prototype.updateMaxFrame = function(e, t) {
                this._maxFrame = Math.ceil(e * t),
                this.previewFrame = this.previewFrame
            }
            ,
            t.prototype.gotoFrame = function(e) {
                if (this._aniData) {
                    this._frame = e;
                    var t = this._aniData.layers;
                    this._gotoFrame(e, this.node, t)
                }
            }
            ,
            t.prototype._gotoFrame = function(e, t, o) {
                for (var i = function(i) {
                    var a = o[i]
                      , s = a.name
                      , c = a.frames
                      , l = a.type
                      , p = t.getChildByName(s);
                    if (!p)
                        return "continue";
                    var u = p.getComponent(cc.Sprite)
                      , h = {};
                    for (var d in c) {
                        var f = parseInt(d);
                        if (!isNaN(f)) {
                            if (f > e)
                                break;
                            h = __assign({}, h, c[d])
                        }
                    }
                    var _ = h
                      , m = _.anchorX
                      , g = _.anchorY
                      , y = _.x
                      , b = _.y
                      , v = _.rotation
                      , S = _.scaleX
                      , C = _.scaleY
                      , k = _.alpha
                      , M = _.visible
                      , P = _.img
                      , T = _.spriteFrame;
                    if (p.anchorX = isNaN(m) ? t.anchorX : m,
                    p.anchorY = isNaN(g) ? t.anchorY : g,
                    p.x = isNaN(y) ? t.x : y,
                    p.y = isNaN(b) ? t.y : b,
                    p.rotation = isNaN(v) ? t.rotation : v,
                    p.scaleX = isNaN(S) ? t.scaleX : S,
                    p.scaleY = isNaN(C) ? t.scaleY : C,
                    isNaN(k) || (p.opacity = 255 * k),
                    void 0 != M && (p.active = M),
                    void 0 != P && "" != P && u && r._aniMap) {
                        var E = r._aniMap[P];
                        n.default.InEditor() ? n.default.GetAssetsUuidByUrl("" + r.src + E, function(e, t) {
                            n.default.GetSubMetasUuidByUuid(t, function(e, o) {
                                cc.loader.load({
                                    uuid: t
                                }, function(e, t) {
                                    var n = new cc.SpriteFrame(t,new cc.Rect(0,0,t.width,t.height),!1,new cc.Vec2(0,0),new cc.Size(t.width,t.height));
                                    u.spriteFrame = n,
                                    u.spriteFrame._uuid = o
                                })
                            })
                        }) : "img" === l ? u.spriteFrame = cc.loader.getRes("" + r.src + E, cc.SpriteFrame) : "spriteFrame" === l && (u.spriteFrame = T)
                    }
                    o[i].layers && o[i].layers.length > 0 && r._gotoFrame(e, p, o[i].layers)
                }, r = this, a = 0; a < o.length; a++)
                    i(a)
            }
            ,
            __decorate([c({
                type: cc.JsonAsset,
                visible: !1
            })], t.prototype, "_data", void 0),
            __decorate([c({
                type: cc.JsonAsset
            })], t.prototype, "data", null),
            __decorate([c({
                type: cc.JsonAsset
            })], t.prototype, "map", void 0),
            __decorate([c({
                type: String,
                visible: !1
            })], t.prototype, "src", void 0),
            __decorate([c(r)], t.prototype, "runningInit", void 0),
            __decorate([c(r)], t.prototype, "autoPlay", void 0),
            __decorate([c({
                type: cc.Integer,
                visible: !1
            })], t.prototype, "_previewFrame", void 0),
            __decorate([c({
                type: cc.Integer
            })], t.prototype, "previewFrame", null),
            __decorate([c({
                type: cc.Integer,
                visible: !1
            })], t.prototype, "_maxFrame", void 0),
            t = __decorate([s, l("\u5a92\u4f53\u521b\u610f/\u52a8\u753b\u7ec4\u4ef6/Simple AETool New")], t)
        }(cc.Component);
        o.default = p,
        cc._RF.pop()
    }
    , {
        "../../common/IDE": "IDE",
        "../../configs/BaseConfig": "BaseConfig"
    }],
    NewAnimationMachine: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "924e2d09fBCxp8OeOtmXpCG", "NewAnimationMachine"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/EventManager")
          , i = e("../../common/MapES5")
          , r = e("../AnimationState")
          , a = e("./NewAEToolAnimation")
          , s = e("../../common/IDE")
          , c = cc._decorator
          , l = c.ccclass
          , p = c.property
          , u = c.menu
          , h = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.id = 0,
                t._loaded = !1,
                t._currentAnimState = null,
                t.src = "",
                t.dataList = new Array,
                t.animation = null,
                t.loadStatesFile = !0,
                t._stateJson = null,
                t._previewAnimation = null,
                t.statesMap = null,
                t.defaultState = null,
                t.id = o.AnimationMachineCnt++,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.onLoad = function() {
                this.checkData()
            }
            ,
            t.prototype.start = function() {
                this.init(),
                this._loadStates(),
                this._loaded = !0,
                this._setDefaultState()
            }
            ,
            t.prototype.init = function() {
                this.animation || (this.animation = this.node.getComponent(a.default)),
                this.animation || (this.animation = this.node.addComponent(a.default))
            }
            ,
            t.prototype.setState = function(e) {
                this._currentAnimState && this._currentAnimState.animationName == e.animationName || (this._currentAnimState = e,
                this._currentAnimState && this._play(e.animationName))
            }
            ,
            t.prototype.nextState = function() {
                this._currentAnimState = this._currentAnimState.nextState,
                this._currentAnimState && this._play(this._currentAnimState.animationName)
            }
            ,
            t.prototype._play = function(e) {
                var t = this;
                this._loaded ? (this._currentAnimState.startEvent && n.default.instance.event(this._currentAnimState.startEvent, {
                    id: this.id
                }),
                this._playAETool(e)) : this.scheduleOnce(function() {
                    t._play(e)
                }, .3)
            }
            ,
            t.prototype._playComplated = function() {
                this._currentAnimState.complatedEvent && n.default.instance.event(this._currentAnimState.complatedEvent, {
                    id: this.id
                }),
                this.nextState()
            }
            ,
            t.prototype._playAETool = function(e) {
                for (var t = this, o = null, n = 0; n < this.dataList.length; n++)
                    if (e == this.dataList[n].name) {
                        o = this.dataList[n];
                        break
                    }
                o && this.getMap(o).then(function(e) {
                    t.animation.setData(o, e, d(t.src)),
                    t.animation.gotoFrame(0),
                    t.animation.play(1, t._playComplated.bind(t))
                }).catch(function(e) {
                    console.error(e)
                })
            }
            ,
            Object.defineProperty(t.prototype, "stateJson", {
                get: function() {
                    return this._stateJson
                },
                set: function(e) {
                    if (this._stateJson = e,
                    e) {
                        var t = e.json.defaultState;
                        this.previewAnimation = t
                    }
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "previewAnimation", {
                get: function() {
                    return this._previewAnimation
                },
                set: function(e) {
                    var t = this;
                    this._previewAnimation = e;
                    var o = this.node.getComponent(a.default);
                    o || (o = this.node.addComponent(a.default));
                    for (var n = null, i = 0; i < this.dataList.length; i++)
                        if (this._previewAnimation == this.dataList[i].name) {
                            n = this.dataList[i];
                            break
                        }
                    if (n)
                        if (s.default.InEditor()) {
                            var r = "" + d(this.src) + n.name + "_map.json";
                            s.default.GetAssetsUuidByUrl(r, function(e, i) {
                                cc.loader.load({
                                    uuid: i
                                }, function(e, i) {
                                    o.setData(n, i, d(t.src)),
                                    o.gotoFrame(0)
                                })
                            })
                        } else
                            this.getMap(n).then(function(e) {
                                o.setData(n, e, d(t.src)),
                                o.gotoFrame(0)
                            }).catch(function(e) {
                                console.error(e)
                            })
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype._loadStates = function() {
                if (this.loadStatesFile) {
                    var e = this.stateJson.json
                      , t = e.defaultState
                      , o = e.states;
                    for (var n in this.statesMap = new i.default,
                    o)
                        this.statesMap.set(n, new r.default(n));
                    for (var n in this.defaultState = t ? this.statesMap.get(t) : null,
                    o) {
                        var a = o[n]
                          , s = a.next
                          , c = a.events
                          , l = c.start
                          , p = c.end
                          , u = this.statesMap.get(n);
                        u.nextState = s ? this.statesMap.get(s) : null,
                        u.startEvent = l,
                        u.complatedEvent = p
                    }
                }
            }
            ,
            t.prototype._setDefaultState = function() {
                this.loadStatesFile && this.setState(this.defaultState)
            }
            ,
            t.prototype.getMap = function(e) {
                var t = this;
                return new Promise(function(o, n) {
                    var i = "" + d(t.src) + e.name + "_map";
                    cc.loader.loadRes(i, cc.JsonAsset, function(e, t) {
                        e ? n(e) : o(t)
                    })
                }
                )
            }
            ,
            t.prototype.checkData = function() {
                this.dataList.forEach(function(e, t) {
                    e.json.layers || console.error("\u7d22\u5f15\u4e3a" + t + "\u7684\u52a8\u753bjson\u4e0d\u5408\u89c4\u8303")
                })
            }
            ,
            t.AnimationMachineCnt = 0,
            __decorate([p({
                displayName: "AE\u52a8\u753b\u6570\u636e\u76ee\u5f55"
            })], t.prototype, "src", void 0),
            __decorate([p({
                type: [cc.JsonAsset],
                displayName: "AE\u52a8\u753b\u6570\u636e"
            })], t.prototype, "dataList", void 0),
            __decorate([p({
                displayName: "\u662f\u5426\u4f7f\u7528\u72b6\u6001\u673a\u6587\u4ef6"
            })], t.prototype, "loadStatesFile", void 0),
            __decorate([p({
                type: cc.JsonAsset,
                visible: !1
            })], t.prototype, "_stateJson", void 0),
            __decorate([p({
                type: cc.JsonAsset,
                displayName: "\u72b6\u6001\u673a\u914d\u7f6e\u6587\u4ef6",
                visible: function() {
                    return this.loadStatesFile
                }
            })], t.prototype, "stateJson", null),
            __decorate([p({
                type: String,
                visible: !1
            })], t.prototype, "_previewAnimation", void 0),
            __decorate([p({
                type: String,
                visible: function() {
                    return this.loadStatesFile && this.stateJson
                }
            })], t.prototype, "previewAnimation", null),
            t = o = __decorate([l, u("\u5a92\u4f53\u521b\u610f/\u52a8\u753b\u7ec4\u4ef6/\u52a8\u753b\u72b6\u6001\u673a New")], t)
        }(cc.Component);
        function d(e) {
            return "/" === e[e.length - 1] ? e : e + "/"
        }
        o.default = h,
        cc._RF.pop()
    }
    , {
        "../../common/EventManager": "EventManager",
        "../../common/IDE": "IDE",
        "../../common/MapES5": "MapES5",
        "../AnimationState": "AnimationState",
        "./NewAEToolAnimation": "NewAEToolAnimation"
    }],
    Pinus: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "eb88a9dnrNC+pRr1hcYpWOo", "Pinus"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {
                this._callbacks = {}
            }
            return e.prototype.on = function(e, t) {
                (this._callbacks[e] = this._callbacks[e] || []).push(t)
            }
            ,
            e.prototype.once = function(e, t) {
                var o = this;
                function n() {
                    o.off(e, n),
                    t.apply(o, arguments)
                }
                t._off = n,
                this.on(e, n)
            }
            ,
            e.prototype.removeListener = function(e, t) {
                this.off(e, t)
            }
            ,
            e.prototype.removeAllListeners = function(e, t) {
                this.off(e, t)
            }
            ,
            e.prototype.off = function(e, t) {
                if (this._callbacks = this._callbacks || {},
                0 != arguments.length) {
                    if (!this._callbacks[e])
                        return this;
                    if (1 != arguments.length) {
                        var o = this._callbacks[e].indexOf(t._off || t);
                        ~o && this._callbacks[e].splice(o, 1)
                    } else
                        delete this._callbacks[e]
                } else
                    this._callbacks = {}
            }
            ,
            e.prototype.emit = function(e) {
                for (var t = [], o = 1; o < arguments.length; o++)
                    t[o - 1] = arguments[o];
                this._callbacks = this._callbacks || {};
                var n = this._callbacks[e];
                if (n)
                    for (var i = 0, r = (n = n.slice(0)).length; i < r; ++i)
                        n[i].apply(this, t);
                return this
            }
            ,
            e.prototype.listeners = function(e) {
                return this._callbacks = this._callbacks || {},
                this._callbacks[e] || []
            }
            ,
            e.prototype.hasListeners = function(e) {
                return !!this.listeners(e).length
            }
            ,
            e
        }();
        o.Emitter = n;
        var i = function(e, t, o, n, i) {
            if ("function" == typeof o.copy)
                o.copy(e, t, n, n + i);
            else
                for (var r = 0; r < i; r++)
                    e[t++] = o[n++]
        }
          , r = function(e) {
            return e === u.TYPE_REQUEST || e === u.TYPE_RESPONSE
        }
          , a = function(e) {
            return e === u.TYPE_REQUEST || e === u.TYPE_NOTIFY || e === u.TYPE_PUSH
        }
          , s = 1
          , c = 65535
          , l = {
            Package: {
                TYPE_HANDSHAKE: 1,
                TYPE_HANDSHAKE_ACK: 2,
                TYPE_HEARTBEAT: 3,
                TYPE_DATA: 4,
                TYPE_KICK: 5,
                encode: function(e, t) {
                    var o = t ? t.length : 0
                      , n = new Uint8Array(4 + o)
                      , r = 0;
                    return n[r++] = 255 & e,
                    n[r++] = o >> 16 & 255,
                    n[r++] = o >> 8 & 255,
                    n[r++] = 255 & o,
                    t && i(n, r, t, 0, o),
                    n
                },
                decode: function(e) {
                    var t = new Uint8Array(e)
                      , o = t[0]
                      , n = 1
                      , r = (t[n++] << 16 | t[n++] << 8 | t[n++]) >>> 0
                      , a = r ? new Uint8Array(r) : null;
                    return i(a, 0, t, 4, r),
                    {
                        type: o,
                        body: a
                    }
                }
            },
            Message: {
                TYPE_REQUEST: 0,
                TYPE_NOTIFY: 1,
                TYPE_RESPONSE: 2,
                TYPE_PUSH: 3,
                encode: function(e, t, o, n, p) {
                    var h = r(t) ? function(e) {
                        var t = 0;
                        do {
                            t += 1,
                            e >>= 7
                        } while (e > 0);
                        return t
                    }(e) : 0
                      , d = s + h;
                    if (a(t))
                        if (o) {
                            if ("number" != typeof n)
                                throw new Error("error flag for number route!");
                            d += 2
                        } else if (d += 1,
                        n) {
                            if ((n = l.strencode(n)).length > 255)
                                throw new Error("route maxlength is overflow");
                            d += n.length
                        }
                    p && (d += p.length);
                    var f = new Uint8Array(d)
                      , _ = 0;
                    return _ = function(e, t, o, n) {
                        if (e !== u.TYPE_REQUEST && e !== u.TYPE_NOTIFY && e !== u.TYPE_RESPONSE && e !== u.TYPE_PUSH)
                            throw new Error("unkonw message type: " + e);
                        return o[n] = e << 1 | (t ? 1 : 0),
                        n + s
                    }(t, o, f, _),
                    r(t) && (_ = function(e, t, o, n) {
                        var i = n + t - 1;
                        for (o[i--] = 127 & e; i >= n; )
                            e >>= 7,
                            o[i--] = 127 & e | 128;
                        return n + t
                    }(e, h, f, _)),
                    a(t) && (_ = function(e, t, o, n) {
                        if (e) {
                            if (t > c)
                                throw new Error("route number is overflow");
                            o[n++] = t >> 8 & 255,
                            o[n++] = 255 & t
                        } else
                            t ? (o[n++] = 255 & t.length,
                            i(o, n, t, 0, t.length),
                            n += t.length) : o[n++] = 0;
                        return n
                    }(o, n, f, _)),
                    p && (_ = function(e, t, o) {
                        return i(t, o, e, 0, e.length),
                        o + e.length
                    }(p, f, _)),
                    f
                },
                decode: function(e) {
                    var t = new Uint8Array(e)
                      , o = t.length || t.byteLength
                      , n = 0
                      , s = 0
                      , c = null
                      , p = t[n++]
                      , u = 1 & p
                      , h = p >> 1 & 7;
                    if (r(h)) {
                        var d = t[n++];
                        for (s = 127 & d; 128 & d; )
                            s <<= 7,
                            s |= 127 & (d = t[n++])
                    }
                    if (a(h))
                        if (u)
                            c = t[n++] << 8 | t[n++];
                        else {
                            var f = t[n++];
                            f ? (c = new Uint8Array(f),
                            i(c, 0, t, n, f),
                            c = l.strdecode(c)) : c = "",
                            n += f
                        }
                    var _ = o - n
                      , m = new Uint8Array(_);
                    return i(m, 0, t, n, _),
                    {
                        id: s,
                        type: h,
                        compressRoute: u,
                        route: c,
                        body: m
                    }
                }
            },
            strencode: function(e) {
                for (var t = new Uint8Array(3 * e.length), o = 0, n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n)
                      , a = null;
                    a = r <= 127 ? [r] : r <= 2047 ? [192 | r >> 6, 128 | 63 & r] : [224 | r >> 12, 128 | (4032 & r) >> 6, 128 | 63 & r];
                    for (var s = 0; s < a.length; s++)
                        t[o] = a[s],
                        ++o
                }
                var c = new Uint8Array(o);
                return i(c, 0, t, 0, o),
                c
            },
            strdecode: function(e) {
                for (var t = new Uint8Array(e), o = [], n = 0, i = 0, r = t.length; n < r; )
                    t[n] < 128 ? (i = t[n],
                    n += 1) : t[n] < 224 ? (i = ((63 & t[n]) << 6) + (63 & t[n + 1]),
                    n += 2) : (i = ((15 & t[n]) << 12) + ((63 & t[n + 1]) << 6) + (63 & t[n + 2]),
                    n += 3),
                    o.push(i);
                return String.fromCharCode.apply(null, o)
            }
        }
          , p = l.Package
          , u = l.Message
          , h = new ArrayBuffer(8)
          , d = new Float32Array(h)
          , f = new Float64Array(h)
          , _ = new Uint8Array(h)
          , m = function() {
            function e() {}
            return e.prototype.init = function(e) {
                this.protos = e || {}
            }
            ,
            e.prototype.encode = function(e, t) {
                var o = this.protos[e];
                if (!this.checkMsg(t, o))
                    return null;
                var n = S.codec.byteLength(JSON.stringify(t))
                  , i = new ArrayBuffer(n)
                  , r = new Uint8Array(i)
                  , a = 0;
                return o && (a = this.encodeMsg(r, a, o, t)) > 0 ? r.subarray(0, a) : null
            }
            ,
            e.prototype.checkMsg = function(e, t) {
                if (!t)
                    return !1;
                for (var o in t) {
                    var n = t[o];
                    switch (n.option) {
                    case "required":
                        if (void 0 === e[o])
                            return !1;
                        break;
                    case "optional":
                        void 0 !== e[o] && t.__messages[n.type] && this.checkMsg(e[o], t.__messages[n.type]);
                        break;
                    case "repeated":
                        if (e[o] && t.__messages[n.type])
                            for (var i = 0; i < e[o].length; i++)
                                if (!this.checkMsg(e[o][i], t.__messages[n.type]))
                                    return !1
                    }
                }
                return !0
            }
            ,
            e.prototype.encodeMsg = function(e, t, o, n) {
                for (var i in n)
                    if (o[i]) {
                        var r = o[i];
                        switch (r.option) {
                        case "required":
                        case "optional":
                            t = this.writeBytes(e, t, this.encodeTag(r.type, r.tag)),
                            t = this.encodeProp(n[i], r.type, t, e, o);
                            break;
                        case "repeated":
                            n[i].length > 0 && (t = this.encodeArray(n[i], r, t, e, o))
                        }
                    }
                return t
            }
            ,
            e.prototype.encodeProp = function(e, t, o, n, i) {
                var r = S.codec;
                switch (t) {
                case "uInt32":
                    o = this.writeBytes(n, o, r.encodeUInt32(e));
                    break;
                case "int32":
                case "sInt32":
                    o = this.writeBytes(n, o, r.encodeSInt32(e));
                    break;
                case "float":
                    this.writeBytes(n, o, r.encodeFloat(e)),
                    o += 4;
                    break;
                case "double":
                    this.writeBytes(n, o, r.encodeDouble(e)),
                    o += 8;
                    break;
                case "string":
                    var a = r.byteLength(e);
                    o = this.writeBytes(n, o, r.encodeUInt32(a)),
                    r.encodeStr(n, o, e),
                    o += a;
                    break;
                default:
                    if (i.__messages[t]) {
                        var s = new Uint8Array(r.byteLength(JSON.stringify(e)));
                        a = 0;
                        a = this.encodeMsg(s, a, i.__messages[t], e),
                        o = this.writeBytes(n, o, r.encodeUInt32(a));
                        for (var c = 0; c < a; c++)
                            n[o] = s[c],
                            o++
                    }
                }
                return o
            }
            ,
            e.prototype.encodeArray = function(e, t, o, n, i) {
                var r = 0;
                if (v.isSimpleType(t.type))
                    for (o = this.writeBytes(n, o, this.encodeTag(t.type, t.tag)),
                    o = this.writeBytes(n, o, S.codec.encodeUInt32(e.length)),
                    r = 0; r < e.length; r++)
                        o = this.encodeProp(e[r], t.type, o, n, null);
                else
                    for (r = 0; r < e.length; r++)
                        o = this.writeBytes(n, o, this.encodeTag(t.type, t.tag)),
                        o = this.encodeProp(e[r], t.type, o, n, i);
                return o
            }
            ,
            e.prototype.writeBytes = function(e, t, o) {
                for (var n = 0; n < o.length; n++,
                t++)
                    e[t] = o[n];
                return t
            }
            ,
            e.prototype.encodeTag = function(e, t) {
                var o = b.TYPES[e] || 2;
                return S.codec.encodeUInt32(t << 3 | o)
            }
            ,
            e
        }()
          , g = function() {
            function e() {
                this.offset = 0
            }
            return e.prototype.init = function(e) {
                this.protos = e || {}
            }
            ,
            e.prototype.setProtos = function(e) {
                e && (this.protos = e)
            }
            ,
            e.prototype.decode = function(e, t) {
                var o = this.protos[e];
                return this.buffer = t,
                this.offset = 0,
                o ? this.decodeMsg({}, o, h.length) : null
            }
            ,
            e.prototype.decodeMsg = function(e, t, o) {
                for (; this.offset < o; ) {
                    var n = this.getHead()
                      , i = (n.type,
                    n.tag)
                      , r = t.__tags[i];
                    switch (t[r].option) {
                    case "optional":
                    case "required":
                        e[r] = this.decodeProp(t[r].type, t);
                        break;
                    case "repeated":
                        e[r] || (e[r] = []),
                        this.decodeArray(e[r], t[r].type, t)
                    }
                }
                return e
            }
            ,
            e.prototype.isFinish = function(e, t) {
                return !t.__tags[this.peekHead().tag]
            }
            ,
            e.prototype.getHead = function() {
                var e = S.codec.decodeUInt32(this.getBytes(!1));
                return {
                    type: 7 & e,
                    tag: e >> 3
                }
            }
            ,
            e.prototype.peekHead = function() {
                var e = S.codec.decodeUInt32(this.peekBytes());
                return {
                    type: 7 & e,
                    tag: e >> 3
                }
            }
            ,
            e.prototype.decodeProp = function(e, t) {
                var o = S.codec;
                switch (e) {
                case "uInt32":
                    return o.decodeUInt32(this.getBytes());
                case "int32":
                case "sInt32":
                    return o.decodeSInt32(this.getBytes());
                case "float":
                    var n = o.decodeFloat(this.buffer, this.offset);
                    return this.offset += 4,
                    n;
                case "double":
                    var i = o.decodeDouble(this.buffer, this.offset);
                    return this.offset += 8,
                    i;
                case "string":
                    var r = o.decodeUInt32(this.getBytes())
                      , a = o.decodeStr(this.buffer, this.offset, r);
                    return this.offset += r,
                    a;
                default:
                    if (t && t.__messages[e]) {
                        r = o.decodeUInt32(this.getBytes());
                        var s = {};
                        return this.decodeMsg(s, t.__messages[e], this.offset + r),
                        s
                    }
                }
            }
            ,
            e.prototype.decodeArray = function(e, t, o) {
                if (v.isSimpleType(t))
                    for (var n = S.codec.decodeUInt32(this.getBytes()), i = 0; i < n; i++)
                        e.push(this.decodeProp(t, null));
                else
                    e.push(this.decodeProp(t, o))
            }
            ,
            e.prototype.getBytes = function(e) {
                void 0 === e && (e = !1);
                var t, o = [], n = this.offset;
                e = e || !1;
                do {
                    t = this.buffer[n],
                    o.push(t),
                    n++
                } while (t >= 128);
                return e || (this.offset = n),
                o
            }
            ,
            e.prototype.peekBytes = function() {
                return this.getBytes(!0)
            }
            ,
            e
        }()
          , y = function() {
            function e() {}
            return e.prototype.encodeUInt32 = function(e) {
                var t = parseInt(e);
                if (isNaN(t) || t < 0)
                    return null;
                var o = [];
                do {
                    var n = t % 128
                      , i = Math.floor(t / 128);
                    0 !== i && (n += 128),
                    o.push(n),
                    t = i
                } while (0 !== t);
                return o
            }
            ,
            e.prototype.encodeSInt32 = function(e) {
                var t = parseInt(e);
                return isNaN(t) ? null : (t = t < 0 ? 2 * Math.abs(t) - 1 : 2 * t,
                this.encodeUInt32(t))
            }
            ,
            e.prototype.decodeUInt32 = function(e) {
                for (var t = 0, o = 0; o < e.length; o++) {
                    var n = parseInt(e[o]);
                    if (t += (127 & n) * Math.pow(2, 7 * o),
                    n < 128)
                        return t
                }
                return t
            }
            ,
            e.prototype.decodeSInt32 = function(e) {
                var t = this.decodeUInt32(e);
                return t = (t % 2 + t) / 2 * (t % 2 == 1 ? -1 : 1)
            }
            ,
            e.prototype.encodeFloat = function(e) {
                return d[0] = e,
                _
            }
            ,
            e.prototype.decodeFloat = function(e, t) {
                if (!e || e.length < t + 4)
                    return null;
                for (var o = 0; o < 4; o++)
                    _[o] = e[t + o];
                return d[0]
            }
            ,
            e.prototype.encodeDouble = function(e) {
                return f[0] = e,
                _.subarray(0, 8)
            }
            ,
            e.prototype.decodeDouble = function(e, t) {
                if (!e || e.length < 8 + t)
                    return null;
                for (var o = 0; o < 8; o++)
                    _[o] = e[t + o];
                return f[0]
            }
            ,
            e.prototype.encodeStr = function(e, t, o) {
                for (var n = 0; n < o.length; n++)
                    for (var i = o.charCodeAt(n), r = this.encode2UTF8(i), a = 0; a < r.length; a++)
                        e[t] = r[a],
                        t++;
                return t
            }
            ,
            e.prototype.decodeStr = function(e, t, o) {
                for (var n = [], i = t + o; t < i; ) {
                    var r = 0;
                    e[t] < 128 ? (r = e[t],
                    t += 1) : e[t] < 224 ? (r = ((63 & e[t]) << 6) + (63 & e[t + 1]),
                    t += 2) : (r = ((15 & e[t]) << 12) + ((63 & e[t + 1]) << 6) + (63 & e[t + 2]),
                    t += 3),
                    n.push(r)
                }
                for (var a = "", s = 0; s < n.length; )
                    a += String.fromCharCode.apply(null, n.slice(s, s + 1e4)),
                    s += 1e4;
                return a
            }
            ,
            e.prototype.byteLength = function(e) {
                if ("string" != typeof e)
                    return -1;
                for (var t = 0, o = 0; o < e.length; o++) {
                    var n = e.charCodeAt(o);
                    t += this.codeLength(n)
                }
                return t
            }
            ,
            e.prototype.encode2UTF8 = function(e) {
                return e <= 127 ? [e] : e <= 2047 ? [192 | e >> 6, 128 | 63 & e] : [224 | e >> 12, 128 | (4032 & e) >> 6, 128 | 63 & e]
            }
            ,
            e.prototype.codeLength = function(e) {
                return e <= 127 ? 1 : e <= 2047 ? 2 : 3
            }
            ,
            e
        }()
          , b = {
            TYPES: {
                uInt32: 0,
                sInt32: 0,
                int32: 0,
                double: 1,
                string: 2,
                message: 2,
                float: 5
            }
        }
          , v = {
            isSimpleType: function(e) {
                return "uInt32" === e || "sInt32" === e || "int32" === e || "uInt64" === e || "sInt64" === e || "float" === e || "double" === e
            }
        }
          , S = {
            init: function(e) {
                S.encoder.init(e.encoderProtos),
                S.decoder.init(e.decoderProtos)
            },
            encode: function(e, t) {
                return S.encoder.encode(e, t)
            },
            decode: function(e, t) {
                return S.decoder.decode(e, t)
            },
            encoder: new m,
            decoder: new g,
            codec: new y
        }
          , C = "js-websocket"
          , k = "0.0.5"
          , M = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.callbacks = {},
                t.handlers = {},
                t.routeMap = {},
                t.heartbeatInterval = 0,
                t.heartbeatTimeout = 0,
                t.nextHeartbeatTimeout = 0,
                t.gapThreshold = 100,
                t.heartbeatId = null,
                t.heartbeatTimeoutId = null,
                t.handshakeCallback = null,
                t.handshakeBuffer = {
                    sys: {
                        type: C,
                        version: k
                    },
                    user: {}
                },
                t.reqId = 0,
                t.data = {
                    dict: {},
                    abbrs: {},
                    protos: {
                        client: {},
                        server: {}
                    }
                },
                t.dict = {},
                t.protobuf = S,
                t.data.abbrs[1],
                t.handlers[p.TYPE_HANDSHAKE] = t.handshake,
                t.handlers[p.TYPE_HEARTBEAT] = t.heartbeat,
                t.handlers[p.TYPE_DATA] = t.onData,
                t
            }
            return __extends(t, e),
            t.prototype.init = function(e, t, o) {
                this.initCallback = t;
                var n = e.host
                  , i = e.port
                  , r = (443 === Number(i) ? "wss" : "ws") + "://" + n;
                i && (r += ":" + i),
                this.handshakeBuffer.user = e.user,
                this.handshakeCallback = e.handshakeCallback,
                this.initWebSocket(r, t, o)
            }
            ,
            t.prototype.initWebSocket = function(e, t, o) {
                var n = this;
                this.socket = new WebSocket(e),
                this.socket.binaryType = "arraybuffer",
                this.socket.onopen = function(e) {
                    var t = p.encode(p.TYPE_HANDSHAKE, l.strencode(JSON.stringify(n.handshakeBuffer)));
                    n.send(t)
                }
                ,
                this.socket.onmessage = function(e) {
                    n.processPackage(p.decode(e.data)),
                    n.heartbeatTimeout && (n.nextHeartbeatTimeout = Date.now() + n.heartbeatTimeout)
                }
                ,
                this.socket.onerror = function(e) {
                    o(),
                    n.emit("io-error", e)
                }
                ,
                this.socket.onclose = function(e) {
                    n.emit("close", e)
                }
            }
            ,
            t.prototype.disconnect = function() {
                var e = this.socket;
                e && (e.close && e.close(),
                this.socket = null),
                this.heartbeatId && (clearTimeout(this.heartbeatId),
                this.heartbeatId = null),
                this.heartbeatTimeoutId && (clearTimeout(this.heartbeatTimeoutId),
                this.heartbeatTimeoutId = null)
            }
            ,
            t.prototype.request = function(e, t, o) {
                2 === arguments.length && "function" == typeof t ? (o = t,
                t = {}) : t = t || {},
                (e = e || t.route) && (this.reqId++,
                this.sendMessage(this.reqId, e, t),
                this.callbacks[this.reqId] = o,
                this.routeMap[this.reqId] = e)
            }
            ,
            t.prototype.notify = function(e, t) {
                t = t || {},
                this.sendMessage(0, e, t)
            }
            ,
            t.prototype.sendMessage = function(e, t, o) {
                var n = e ? u.TYPE_REQUEST : u.TYPE_NOTIFY;
                o = (this.data.protos ? this.data.protos.client : {})[t] ? S.encode(t, o) : l.strencode(JSON.stringify(o));
                var i = 0;
                this.data && this.data.dict && this.data.dict[t] && (t = this.data.dict[t],
                i = 1),
                o = u.encode(e, n, i, t, o);
                var r = p.encode(p.TYPE_DATA, o);
                this.send(r)
            }
            ,
            t.prototype.send = function(e) {
                this.socket && this.socket.send(e.buffer)
            }
            ,
            t.prototype.heartbeat = function(e) {
                if (this.heartbeatInterval) {
                    var t = p.encode(p.TYPE_HEARTBEAT, null);
                    if (this.heartbeatTimeoutId && (clearTimeout(this.heartbeatTimeoutId),
                    this.heartbeatTimeoutId = null),
                    !this.heartbeatId) {
                        var o = this;
                        this.heartbeatId = setTimeout(function() {
                            o.heartbeatId = null,
                            o.send(t),
                            o.nextHeartbeatTimeout = Date.now() + o.heartbeatTimeout,
                            o.heartbeatTimeoutId = setTimeout(o.heartbeatTimeoutCb.bind(o), o.heartbeatTimeout)
                        }, this.heartbeatInterval)
                    }
                }
            }
            ,
            t.prototype.heartbeatTimeoutCb = function() {
                var e = this.nextHeartbeatTimeout - Date.now();
                e > this.gapThreshold ? this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb.bind(this), e) : (console.error("server heartbeat timeout"),
                this.emit("heartbeat timeout"),
                this.disconnect())
            }
            ,
            t.prototype.handshake = function(e) {
                if (501 !== (e = JSON.parse(l.strdecode(e))).code)
                    if (200 === e.code) {
                        this.handshakeInit(e);
                        var t = p.encode(p.TYPE_HANDSHAKE_ACK, null);
                        this.send(t),
                        this.initCallback && (this.initCallback(e),
                        this.initCallback = null)
                    } else
                        this.emit("error", "handshake fail");
                else
                    this.emit("error", "client version not fullfill")
            }
            ,
            t.prototype.onData = function(e) {
                var t = u.decode(e);
                t.id > 0 && (t.route = this.routeMap[t.id],
                delete this.routeMap[t.id],
                !t.route) || (t.body = this.deCompose(t),
                this.processMessage(t))
            }
            ,
            t.prototype.onKick = function(e) {
                this.emit("onKick", e)
            }
            ,
            t.prototype.processPackage = function(e) {
                this.handlers[e.type] && this.handlers[e.type].apply(this, [e.body])
            }
            ,
            t.prototype.processMessage = function(e) {
                if (e.id) {
                    var t = this.callbacks[e.id];
                    delete this.callbacks[e.id],
                    "function" == typeof t && t(e.body)
                } else
                    this.emit(e.route, e.body)
            }
            ,
            t.prototype.processMessageBatch = function(e) {
                for (var t = 0, o = e.length; t < o; t++)
                    this.processMessage(e[t])
            }
            ,
            t.prototype.deCompose = function(e) {
                var t = this.data.protos ? this.data.protos.server : {}
                  , o = this.data.abbrs
                  , n = e.route;
                if (e.compressRoute) {
                    if (!o[n])
                        return {};
                    n = e.route = o[n]
                }
                return t[n] ? S.decode(n, e.body) : JSON.parse(l.strdecode(e.body))
            }
            ,
            t.prototype.handshakeInit = function(e) {
                e.sys && e.sys.heartbeat ? (this.heartbeatInterval = 1e3 * e.sys.heartbeat,
                this.heartbeatTimeout = 2 * this.heartbeatInterval) : (this.heartbeatInterval = 0,
                this.heartbeatTimeout = 0),
                this.initData(e),
                "function" == typeof this.handshakeCallback && this.handshakeCallback(e.user)
            }
            ,
            t.prototype.initData = function(e) {
                if (e && e.sys) {
                    var t = e.sys.dict;
                    if (t)
                        for (var o in this.data.dict = t,
                        this.data.abbrs = {},
                        t)
                            this.data.abbrs[t[o]] = o;
                    var n = e.sys.protos;
                    n && (this.data.protos = {
                        server: n.server || {},
                        client: n.client || {}
                    },
                    this.protobuf && this.protobuf.init({
                        encoderProtos: n.client,
                        decoderProtos: n.server
                    }))
                }
            }
            ,
            t
        }(n);
        o.Pinus = M,
        cc._RF.pop()
    }
    , {}],
    Player: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "d2d03BcmsFFZLuKR2sBZFi0", "Player"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = cc._decorator.ccclass, r = e("./CollisionCalculation"), a = e("../../ccc-library/net/MicroGameSocket"), s = e("../mock/Props"), c = e("./PropsAddScoreEffect"), l = e("./PropsSmallerEffect"), p = e("./PropsSlowdownTimeEffect"), u = e("./PropsInvincibleEffect"), h = e("./PropsNutEffect"), d = e("./PropsReliveEffect"), f = e("../../ccc-library/common/MapES5"), _ = e("./PropsFaceEffect"), m = e("../configs/GameEvent"), g = e("../common/Store"), y = e("../../ccc-library/animation/NewAETool/NewAEToolAnimation"), b = e("./PropsIcon"), v = e("../../ccc-library/configs/BaseConfig"), S = e("../../ccc-library/common/EventManager"), C = e("../../resources/components/LhSoundManager/SoundManager"), k = 1, M = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.iceProgress = null,
                t.props = null,
                t._shapeMap = null,
                t.isIce = !1,
                t.mainLayer = null,
                t.isRelive = !1,
                t._curShape = null,
                t._beforeEnterTeleportStatus = null,
                t._speedY = 0,
                t._speedRot = 0,
                t._g = 0,
                t._collision = null,
                t._offsetCenter = cc.v2(0, 34),
                t._gameStageNode = null,
                t._slowCnt = 1,
                t._iceCdDuration = 0,
                t._iceDuration = 0,
                t._propsIconList = new f.default,
                t._willChangeShapePropsTypes = [s.PropsType.Nut, s.PropsType.Invincible, s.PropsType.Smaller, s.PropsType.SlowdownTime],
                t._shadows = [],
                t._updateSpaceTime = 0,
                t
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "isInvincible", {
                get: function() {
                    return this.props.get(s.PropsType.Invincible)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "propsRelive", {
                get: function() {
                    return this.props.get(s.PropsType.Relive)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "isNutIce", {
                get: function() {
                    return this.isIce && this.props.get(s.PropsType.Nut)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.addShadow = function(e) {
                this.mainLayer.addChild(e),
                this._shadows.push(e)
            }
            ,
            t.prototype.removeAllShadow = function() {
                this._shadows.length = 0
            }
            ,
            t.prototype.scaleShadow = function(e) {
                this._shadows.forEach(function(t) {
                    return t.setScale(e)
                })
            }
            ,
            t.prototype.init = function(e) {
                this.mainLayer = e,
                this.props = new f.default,
                this._shapeMap = new f.default,
                this.changeShape(n.Normal);
                var t = a.default.instance.config.battleCfg.playerConfig;
                this._g = t.g,
                this.node.x = -v.default.StageWidth / 2 - this.node.width,
                this.node.y = t.initY,
                this._collision = new r.CircleCollision,
                this._collision.radius = t.collisionRadius
            }
            ,
            t.prototype.startGame = function() {
                var e = a.default.instance.config.battleCfg.playerConfig;
                this.node.runAction(cc.moveTo(.4, cc.v2(e.initX, e.initY)))
            }
            ,
            t.prototype.removeAllPropsEffect = function() {
                var e = this;
                return new Promise(function(t) {
                    if (e.removeIce(),
                    e._destroyPropsIcon(),
                    e.props.size > 0) {
                        var o = 0
                          , i = e.props.size;
                        e.props.forEach(function(r) {
                            r.loseEffect().then(function() {
                                ++o === i && (e.changeShape(n.Normal),
                                e.props.clear(),
                                t(null))
                            })
                        })
                    } else
                        t(null)
                }
                )
            }
            ,
            t.prototype.start = function() {
                this._gameStageNode = this.node.parent
            }
            ,
            t.prototype.ice = function(e) {
                this.isIce || g.default.isDie || (this._iceCdDuration = e,
                this._iceDuration = e,
                this._showIceCd(),
                this.isIce = !0,
                C.default.instance.playSound(C.Sound.ice),
                this.isNutIce ? this.changeShape(n.NutIce) : this.changeShape(n.Ice))
            }
            ,
            t.prototype.removeIce = function() {
                return __awaiter(this, void 0, Promise, function() {
                    var e;
                    return __generator(this, function(t) {
                        return this.isIce ? (e = null,
                        e = this.isNutIce ? this.changeShape(s.PropsType.Nut) : this.changeShape(n.Normal),
                        this._iceCdDuration = 0,
                        this.isIce = !1,
                        this._hideIceCd(),
                        [2, e]) : [2]
                    })
                })
            }
            ,
            t.prototype.slowdown = function(e) {
                this._slowCnt = e
            }
            ,
            t.prototype.setSpeedY = function(e) {
                this._speedY = e
            }
            ,
            t.prototype.destroySelf = function() {
                var e = this;
                this.removeAllPropsEffect().then(function() {
                    e.node.destroy()
                }),
                this._curShape = n.Normal
            }
            ,
            t.prototype.fixUpdate = function(e) {
                var t = this;
                if (this._updateSpaceTime <= 0 && (this._updateSpaceTime = e / this._slowCnt),
                this._updateSpaceTime -= e,
                this._iceCdDuration > 0 ? (this._iceCdDuration -= e,
                this.iceProgress && (this.iceProgress.fillRange = this._iceCdDuration / this._iceDuration)) : this.removeIce(),
                this._propsIconList.forEach(function(t) {
                    t.fixUpdate(e)
                }),
                this._updateSpaceTime <= 0) {
                    this.node.y -= this._speedY * e,
                    this.node.rotation < a.default.instance.config.battleCfg.playerConfig.maxRot && (this.node.rotation += this._speedRot),
                    this._speedY += 60 * this._g * e,
                    this._speedRot += a.default.instance.config.battleCfg.playerConfig.deltaRot;
                    var o = 0;
                    this._propsIconList.forEach(function(e) {
                        e.node.y = t.node.y + t.node.height + o,
                        o += e.node.height
                    }),
                    this.props.forEach(function(t) {
                        return t.fixUpdate(e)
                    }),
                    this.iceProgress && (this.iceProgress.node.parent.y = this.node.y + 154)
                }
            }
            ,
            t.prototype.getCollision = function() {
                return this._collision.x = this.node.x + this._offsetCenter.x,
                this._collision.y = this.node.y + this._offsetCenter.y,
                this._collision
            }
            ,
            t.prototype.scaleCollision = function(e) {
                this._collision.radius *= e,
                this.node.setScale(e)
            }
            ,
            t.prototype.jumpUp = function(e) {
                if (!g.default.isGameEnd) {
                    C.default.instance.playSound(C.Sound.jump);
                    var t = a.default.instance.config.battleCfg.playerConfig;
                    this._speedY = t.initSpeed * (this.isIce ? t.iceSpeedPower : 1),
                    this._speedRot = 0,
                    this.node.rotation = t.initRot
                }
            }
            ,
            t.prototype.gotProps = function(e, t, o) {
                var i = this;
                void 0 === o && (o = !0);
                var r = this._createPropsEffect(e);
                if (t > 0 && r.duration && (r.duration = t),
                this._willChangeShapePropsTypes.indexOf(e) > -1 && (e === s.PropsType.Nut ? this.isIce ? this.changeShape(n.NutIce) : this.changeShape(e) : e === s.PropsType.Invincible ? this.isIce ? this.removeIce().then(function() {
                    i.changeShape(e)
                }) : this.changeShape(e) : this.isIce || this.changeShape(n.Normal)),
                r.id = k++,
                this.props.get(e)) {
                    var a = this.props.get(e);
                    if (e === s.PropsType.Nut || e === s.PropsType.Smaller || e === s.PropsType.Invincible ? a.duration && (a.duration = r.duration) : e === s.PropsType.SlowdownTime && a.takeEffect(this),
                    o) {
                        var c = this._propsIconList.get(e);
                        c && c.refreshCd()
                    }
                } else
                    this.props.set(e, r),
                    r.takeEffect(this),
                    o && this._showPropsIcon(e)
            }
            ,
            t.prototype.propsLoseEffect = function(e, t) {
                var o = null
                  , n = null;
                return this.props.forEach(function(t, i) {
                    t.id === e && (o = t,
                    n = i)
                }),
                this.props.delete(n),
                this._destroyPropsIconByType(n),
                o ? o.loseEffect(t) : Promise.resolve(null)
            }
            ,
            t.prototype.changeShape = function(e) {
                if (e === this._curShape)
                    return null;
                console.log("\u98de\u9f20\u5f53\u524d\u5f62\u6001", e.toString()),
                this._shapeMap.forEach(function(e) {
                    e.active = !1
                });
                var t = this._shapeMap.get(e);
                if (!t) {
                    if (!(t = this.node.getChildByName(e.toString())))
                        return null;
                    this._shapeMap.set(e, t)
                }
                if (!t)
                    return null;
                this._curShape = e,
                t.active = !0;
                var o = null;
                return e === s.PropsType.Relive ? (this.node.rotation = 0,
                o = t.getComponent(y.default)) : e === n.Die && (this._destroyPropsIcon(),
                this.node.rotation = 0,
                o = t.getChildByName("Icon").getComponent(y.default)),
                o ? (o.node.active = !0,
                new Promise(function(e) {
                    o.play(1, function() {
                        o.node.active = !1,
                        e(null)
                    })
                }
                )) : null
            }
            ,
            t.prototype.enterTeleport = function(e) {
                this.removeAllPropsEffect(),
                this._speedY = 0,
                this._beforeEnterTeleportStatus = {
                    y: this.node.y,
                    rotation: this.node.rotation,
                    speedY: this._speedY,
                    speedRot: this._speedRot
                }
            }
            ,
            t.prototype.leaveTeleport = function() {
                this.node.y = this._beforeEnterTeleportStatus.y,
                this.node.rotation = this._beforeEnterTeleportStatus.rotation,
                this._speedY = 0,
                this._speedRot = this._beforeEnterTeleportStatus.speedRot
            }
            ,
            t.prototype._showPropsIcon = function(e) {
                var t = this
                  , o = cc.loader.getRes("main/prefabs/PropsIcon")
                  , n = cc.instantiate(o).getComponent(b.default);
                n.node.x = this.node.x,
                n.node.parent = this.node.parent,
                n.show(e, function() {
                    t._destroyPropsIconByType(e)
                }),
                this._propsIconList.set(e, n)
            }
            ,
            t.prototype._showIceCd = function() {
                var e = cc.loader.getRes("main/prefabs/IceCd")
                  , t = cc.instantiate(e);
                t.x = this.node.x,
                t.y = this.node.y + 154,
                this.iceProgress = t.getChildByName("iceProgress").getComponent(cc.Sprite),
                this.node.parent.addChild(t)
            }
            ,
            t.prototype._hideIceCd = function() {
                this.iceProgress && (this.iceProgress.node.parent.destroy(),
                this.iceProgress = null)
            }
            ,
            t.prototype._destroyPropsIconByType = function(e) {
                var t = this._propsIconList.get(e);
                t && (t.node.destroy(),
                this._propsIconList.delete(e))
            }
            ,
            t.prototype._destroyPropsIcon = function() {
                this._propsIconList.forEach(function(e) {
                    return e.node.destroy()
                }),
                this._propsIconList.clear()
            }
            ,
            t.prototype._createPropsEffect = function(e) {
                var t = this
                  , o = [s.PropsType.Nut, s.PropsType.SlowdownTime, s.PropsType.Invincible, s.PropsType.Smaller];
                switch (o.indexOf(e) > -1 && o.forEach(function(o) {
                    o !== e && t.props.get(o) && S.default.instance.event(m.GameEvent.PROPS_LOSE_EFFECT, {
                        id: t.props.get(o).id
                    })
                }),
                e) {
                case s.PropsType.AddScore:
                    return new c.default;
                case s.PropsType.Smaller:
                    return new l.default;
                case s.PropsType.SlowdownTime:
                    return new p.default;
                case s.PropsType.Invincible:
                    return new u.default;
                case s.PropsType.Nut:
                    var n = new h.default;
                    return n.setGameStage(this._gameStageNode),
                    n;
                case s.PropsType.Relive:
                    return new d.default;
                case s.PropsType.Face:
                    return new _.default
                }
            }
            ,
            t = __decorate([i()], t)
        }(cc.Component);
        o.default = M,
        function(e) {
            e.Normal = "Normal",
            e.NutIce = "NutIce",
            e.Ice = "Ice",
            e.Die = "Die"
        }(n = o.PlayerStatus || (o.PlayerStatus = {})),
        cc._RF.pop()
    }
    , {
        "../../ccc-library/animation/NewAETool/NewAEToolAnimation": "NewAEToolAnimation",
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/common/MapES5": "MapES5",
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../../resources/components/LhSoundManager/SoundManager": "SoundManager",
        "../common/Store": "Store",
        "../configs/GameEvent": "GameEvent",
        "../mock/Props": "Props",
        "./CollisionCalculation": "CollisionCalculation",
        "./PropsAddScoreEffect": "PropsAddScoreEffect",
        "./PropsFaceEffect": "PropsFaceEffect",
        "./PropsIcon": "PropsIcon",
        "./PropsInvincibleEffect": "PropsInvincibleEffect",
        "./PropsNutEffect": "PropsNutEffect",
        "./PropsReliveEffect": "PropsReliveEffect",
        "./PropsSlowdownTimeEffect": "PropsSlowdownTimeEffect",
        "./PropsSmallerEffect": "PropsSmallerEffect"
    }],
    PreloadUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c888e/VkydNE46eF8KV7Sxa", "PreloadUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../configs/BaseConfig")
          , i = e("./BaseUI")
          , r = e("./UIManager")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = r.UIType.Once,
                t.render = r.UIRender.CloseOther,
                t._inLoading = !1,
                t._targetProgress = 0,
                t._curProgress = 0,
                t._addSpeed = 0,
                t._completedCallback = null,
                t.progressImg = null,
                t.progressLabel = null,
                t._flashCnt = 0,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.update = function() {
                1 == this._inLoading && this._curProgress < this._targetProgress && (this._curProgress += this._addSpeed,
                this._curProgress > this._targetProgress && (this._curProgress = this._targetProgress),
                this._updateRender(),
                this._curProgress >= 1 && this._onComplete())
            }
            ,
            t.prototype._onComplete = function() {
                this.schedule(this._flash.bind(this), o._FLAME_SPACE / n.default.frameRate)
            }
            ,
            t.prototype._flash = function() {
                this.progressImg.spriteFrame = cc.loader.getRes("ccc-library/images/loading/" + (this._flashCnt + o._FLASH_INDEX).toString(), cc.SpriteFrame),
                this._flashCnt++,
                this._flashCnt >= o._FLASH_CNT && (this.unscheduleAllCallbacks(),
                this.scheduleOnce(this._preloadCompleted.bind(this), o._COMPLETED_WATI))
            }
            ,
            t.prototype._preloadCompleted = function() {
                this._completedCallback && this._completedCallback()
            }
            ,
            t.prototype._updateRender = function() {
                var e = 100 * this._curProgress;
                this.progressLabel.string = e.toFixed(2) + "%",
                e = Math.floor(e / o._FLASH_SPACE),
                this.progressImg.spriteFrame = cc.loader.getRes("ccc-library/images/loading/" + e.toString(), cc.SpriteFrame)
            }
            ,
            t.prototype._initProgress = function() {
                this.progressLabel.string = "0.00%",
                this._curProgress = this._targetProgress = this._addSpeed = this._flashCnt = 0,
                this._updateRender(),
                this._inLoading = !0
            }
            ,
            t.prototype.init = function() {}
            ,
            t.prototype.startLoad = function(t) {
                e.prototype.show.call(this),
                this._initProgress(),
                this._completedCallback = t
            }
            ,
            t.prototype.setProgress = function(e) {
                this._targetProgress = e,
                this._addSpeed = Math.min((this._targetProgress - this._curProgress) / o._FLAME_RATE, o._MAX_ADD_SPEED)
            }
            ,
            t._FLASH_INDEX = 15,
            t._FLASH_CNT = 5,
            t._MAX_ADD_SPEED = .0857142,
            t._FLAME_RATE = 30,
            t._FLASH_SPACE = 7.14285,
            t._FLAME_SPACE = 6,
            t._COMPLETED_WATI = .5,
            t.uiName = "PreloadUI",
            __decorate([c({
                type: cc.Sprite
            })], t.prototype, "progressImg", void 0),
            __decorate([c(cc.Label)], t.prototype, "progressLabel", void 0),
            t = o = __decorate([s], t)
        }(i.default);
        o.default = l,
        cc._RF.pop()
    }
    , {
        "../../configs/BaseConfig": "BaseConfig",
        "./BaseUI": "BaseUI",
        "./UIManager": "UIManager"
    }],
    Prompt: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ecdf2m+0UlBH6kHXvHV/KjP", "Prompt"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.title = null,
                t.input = null,
                t.btnConfirmText = null,
                t.btnCancelText = null,
                t
            }
            return __extends(t, e),
            t.prototype.hide = function() {
                e.prototype.hide.call(this)
            }
            ,
            t.prototype.show = function(t) {
                e.prototype.show.call(this, t)
            }
            ,
            t.prototype.setInfo = function() {
                this.title.string = this.options.title,
                this.options.content && (this.input.string = this.options.content),
                this.btnConfirmText.string = this.options.confirmText,
                this.btnCancelText.string = this.options.cancelText
            }
            ,
            t.prototype.onConfirm = function() {
                this.options && this.options.onConfirm && this.options.onConfirm(this.input.string),
                this.hide()
            }
            ,
            t.prototype.onCancel = function() {
                this.options && this.options.onCancel && this.options.onCancel(),
                this.hide()
            }
            ,
            __decorate([i(cc.Label)], t.prototype, "title", void 0),
            __decorate([i(cc.EditBox)], t.prototype, "input", void 0),
            __decorate([i(cc.Label)], t.prototype, "btnConfirmText", void 0),
            __decorate([i(cc.Label)], t.prototype, "btnCancelText", void 0),
            t = __decorate([n()], t)
        }(e("./ModalBase").default);
        o.default = r,
        cc._RF.pop()
    }
    , {
        "./ModalBase": "ModalBase"
    }],
    PropsAddScoreEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "fe74f6u68lCv5YXRCZwb42T", "PropsAddScoreEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/net/MicroGameSocket")
          , i = e("../mock/Game")
          , r = e("../mock/Props")
          , a = e("../../ccc-library/common/EventManager")
          , s = e("../configs/GameEvent")
          , c = function() {
            function e() {
                this.id = null,
                this._player = null
            }
            return e.prototype.loseEffect = function() {
                return __awaiter(this, void 0, Promise, function() {
                    return __generator(this, function(e) {
                        return [2]
                    })
                })
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e,
                n.default.instance.operate(i.OperateType.useProps, {
                    propsType: r.PropsType.AddScore,
                    id: this.id
                }),
                a.default.instance.event(s.GameEvent.PROPS_LOSE_EFFECT, {
                    id: this.id
                })
            }
            ,
            e.prototype.fixUpdate = function(e) {}
            ,
            e
        }();
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../configs/GameEvent": "GameEvent",
        "../mock/Game": "Game",
        "../mock/Props": "Props"
    }],
    PropsController: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f0d3d+glyRMnaeN1WucMSx4", "PropsController"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PropsScript")
          , i = e("./ElementManager")
          , r = function() {
            function e() {
                this._elementManager = null,
                this._gameStage = null,
                this._parent = null,
                this._prefab = null,
                this._elementManager = new i.default,
                this._prefab = cc.loader.getRes("main/prefabs/Props")
            }
            return Object.defineProperty(e.prototype, "elements", {
                get: function() {
                    return this._elementManager.elements
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this.destroy(),
                this._gameStage = e,
                this._parent = e.blockLayer
            }
            ,
            e.prototype.destroy = function() {
                this._elementManager && this._elementManager.destroy(),
                this._gameStage = null
            }
            ,
            e.prototype.createProps = function(e) {
                var t = this
                  , o = e.props
                  , n = e.curDis
                  , i = [];
                return o.forEach(function(e) {
                    var o = t.createOneProps({
                        props: e,
                        curDis: n
                    });
                    i.push(o)
                }),
                i
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                var t = this._elementManager.detectImpactWithPlayer(e);
                if (t) {
                    var o = t.node.getComponent(n.default);
                    return o.got(),
                    o
                }
                return null
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._elementManager.fixUpdate(e)
            }
            ,
            e.prototype.createOneProps = function(e) {
                var t = e.props
                  , o = e.curDis
                  , i = t.data
                  , r = this._elementManager.create({
                    data: i,
                    prefab: this._prefab,
                    parent: this._parent,
                    curDis: o
                })
                  , a = r.node.getComponent(n.default);
                return a || (a = r.node.addComponent(n.default)),
                a.init(r),
                a
            }
            ,
            e
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "./ElementManager": "ElementManager",
        "./PropsScript": "PropsScript"
    }],
    PropsFaceEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1c1e3Ati1ZA7KZPcZA/9/BG", "PropsFaceEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/net/MicroGameSocket")
          , i = e("../mock/Game")
          , r = e("../mock/Props")
          , a = e("../../ccc-library/common/EventManager")
          , s = e("../configs/GameEvent")
          , c = function() {
            function e() {
                this.id = null,
                this._player = null
            }
            return e.prototype.loseEffect = function() {
                return __awaiter(this, void 0, Promise, function() {
                    return __generator(this, function(e) {
                        return [2]
                    })
                })
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e,
                n.default.instance.operate(i.OperateType.useProps, {
                    propsType: r.PropsType.Face,
                    id: this.id
                }),
                a.default.instance.event(s.GameEvent.PROPS_LOSE_EFFECT, {
                    id: this.id
                })
            }
            ,
            e.prototype.fixUpdate = function(e) {}
            ,
            e
        }();
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../configs/GameEvent": "GameEvent",
        "../mock/Game": "Game",
        "../mock/Props": "Props"
    }],
    PropsIcon: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c1fa31cNKRJz4Je8yqGQEl+", "PropsIcon"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = e("../mock/Props")
          , a = e("../../ccc-library/net/MicroGameSocket")
          , s = [r.PropsType.Nut, r.PropsType.Invincible, r.PropsType.Smaller, r.PropsType.SlowdownTime]
          , c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.icon = null,
                t.cd = null,
                t.bar = null,
                t._type = null,
                t._cdDuration = 1,
                t._duration = 1,
                t._showCd = !1,
                t._hideCb = null,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this.node.setScale(.6, .6),
                this.node.opacity = 0
            }
            ,
            t.prototype.refreshCd = function() {
                this._cdDuration = this._duration,
                this.cd.progress = 0
            }
            ,
            t.prototype.fixUpdate = function(e) {
                this._cdDuration -= e,
                this._cdDuration <= 0 && this.hide(),
                this._showCd && this.cd.node.active && (this.cd.progress = (this._duration - this._cdDuration) / this._duration)
            }
            ,
            t.prototype.changeShape = function(e) {
                this._type = e,
                this._showCd = s.indexOf(e) > -1;
                var t = cc.loader.getRes("main/images/game/propsIcon/" + e, cc.SpriteFrame);
                if (this.icon.spriteFrame = t,
                this.icon.node.width = t.getRect().width,
                this.icon.node.height = t.getRect().height,
                this._showCd) {
                    this._duration = a.default.instance.config.battleCfg.propsConfig[this._type].duration,
                    this._cdDuration = this._duration;
                    var o = cc.loader.getRes("main/images/game/propsIcon/mask" + e, cc.SpriteFrame);
                    this.bar.spriteFrame = o,
                    this.cd.node.width = o.getRect().width,
                    this.cd.node.height = o.getRect().height,
                    this.cd.progress = 0
                } else
                    this.cd.node.active = !1
            }
            ,
            t.prototype.show = function(e, t) {
                var o = this;
                this._hideCb = t,
                this.changeShape(e);
                var n = cc.moveTo(.4, this.node.x, this.node.y + 69)
                  , i = cc.scaleTo(.4, 1, 1)
                  , r = cc.fadeIn(.4)
                  , a = cc.callFunc(function() {
                    o.effectCD()
                })
                  , s = cc.spawn(n, i, r)
                  , c = cc.sequence(s, a);
                this.node.runAction(c)
            }
            ,
            t.prototype.hide = function() {
                var e = this
                  , t = cc.moveTo(.2, this.node.x, this.node.y + 20)
                  , o = cc.fadeOut(.2)
                  , n = cc.callFunc(function() {
                    e.node.destroy(),
                    e._hideCb && e._hideCb()
                })
                  , i = cc.spawn(t, o)
                  , r = cc.sequence(i, n);
                this.node.runAction(r)
            }
            ,
            t.prototype.effectCD = function() {
                this._showCd && (this.cd.node.active = !0)
            }
            ,
            __decorate([i(cc.Sprite)], t.prototype, "icon", void 0),
            __decorate([i(cc.ProgressBar)], t.prototype, "cd", void 0),
            __decorate([i(cc.Sprite)], t.prototype, "bar", void 0),
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../mock/Props": "Props"
    }],
    PropsInvincibleEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "3b6c8GDDvpGeJ+GpT3nMcZx", "PropsInvincibleEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Player")
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("../mock/Props")
          , a = e("../../ccc-library/common/EventManager")
          , s = e("../configs/GameEvent")
          , c = .05
          , l = function() {
            function e() {
                this.id = null,
                this.type = r.PropsType.Invincible,
                this.duration = 0,
                this._player = null,
                this._shadowNumber = 3,
                this._shadowAnimations = [],
                this._playerNodeInfo = [],
                this._recordNodeInfoSpaceTime = c,
                this.duration = i.default.instance.config.battleCfg.propsConfig[r.PropsType.Invincible].duration
            }
            return e.prototype.loseEffect = function() {
                return __awaiter(this, void 0, Promise, function() {
                    return __generator(this, function(e) {
                        return this._shadowAnimations.forEach(function(e) {
                            return e.destroy()
                        }),
                        this._player.removeAllShadow(),
                        this._playerNodeInfo.length = 0,
                        this._shadowAnimations.length = 0,
                        this._player.changeShape(n.PlayerStatus.Normal),
                        [2]
                    })
                })
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e,
                this._createShadow()
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this.duration -= e,
                this._recordNodeInfo(e),
                this._shadowEffect(e),
                this.duration,
                i.default.instance.config.battleCfg.propsConfig[r.PropsType.Invincible].tipTime,
                this.duration <= 0 && a.default.instance.event(s.GameEvent.PROPS_LOSE_EFFECT, {
                    id: this.id
                })
            }
            ,
            e.prototype._shadowEffect = function(e) {
                var t = this;
                this._shadowAnimations.forEach(function(e, o) {
                    var n = t._playerNodeInfo[o + 1];
                    if (n) {
                        var i = n.position
                          , r = n.rotation;
                        e.x = i.x - 50 * (o + 1),
                        e.y = i.y,
                        e.rotation = r,
                        e.opacity = 255 - 90 * o
                    }
                })
            }
            ,
            e.prototype._recordNodeInfo = function(e) {
                this._player && (this._recordNodeInfoSpaceTime -= e,
                this._recordNodeInfoSpaceTime <= 0 && (this._playerNodeInfo.unshift({
                    position: this._player.node.position,
                    rotation: this._player.node.rotation
                }),
                this._recordNodeInfoSpaceTime = c,
                this._playerNodeInfo.length > this._shadowNumber + 2 && this._playerNodeInfo.pop()))
            }
            ,
            e.prototype._createShadow = function() {
                for (var e = cc.loader.getRes("main/prefabs/BodyShadow"), t = 0; t < this._shadowNumber; t++) {
                    var o = cc.instantiate(e);
                    o.x = this._player.node.x,
                    o.y = this._player.node.y,
                    this._shadowAnimations.push(o),
                    this._player.addShadow(o)
                }
            }
            ,
            e
        }();
        o.default = l,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../configs/GameEvent": "GameEvent",
        "../mock/Props": "Props",
        "./Player": "Player"
    }],
    PropsManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "671a2fXi3JN9aw/uvrb9koH", "PropsManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PropsController")
          , i = function() {
            function e() {
                this._propsController = null,
                this._propsController = new n.default
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this._propsController.init(e)
            }
            ,
            e.prototype.destroy = function() {
                this._propsController.destroy()
            }
            ,
            e.prototype.createProps = function(e) {
                var t = e.props
                  , o = e.curDis;
                return this._propsController.createProps({
                    props: t,
                    curDis: o
                })
            }
            ,
            e.prototype.createOneProps = function(e) {
                var t = e.props
                  , o = e.curDis;
                return this._propsController.createOneProps({
                    props: t,
                    curDis: o
                })
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                return this._propsController.detectImpactWithPlayer(e)
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._propsController.fixUpdate(e)
            }
            ,
            e._instance = null,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./PropsController": "PropsController"
    }],
    PropsNutEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1fa1cLFYUhGKb2LNlrYQypB", "PropsNutEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Player")
          , i = e("../../ccc-library/net/MicroGameSocket")
          , r = e("../mock/Props")
          , a = e("../../ccc-library/common/EventManager")
          , s = e("../configs/GameEvent")
          , c = e("../../ccc-library/configs/BaseConfig")
          , l = e("./BulletScript")
          , p = e("./BlockManager")
          , u = e("./FogManager")
          , h = e("./TeleportBlockManager")
          , d = e("../common/Store")
          , f = e("../../resources/components/LhSoundManager/SoundManager")
          , _ = function() {
            function e() {
                this.id = null,
                this.type = r.PropsType.Nut,
                this.duration = 0,
                this._player = null,
                this._speed = 0,
                this._bulletPool = null,
                this._bulletPrefab = null,
                this._bulletSpaceTime = null,
                this._bullets = [],
                this._gameStageNode = null,
                this._bulletOffset = cc.v2(64, -4);
                var e = i.default.instance.config.battleCfg.propsConfig[r.PropsType.Nut];
                this.duration = e.duration,
                this._speed = e.bulletSpeed,
                this._bulletSpaceTime = e.bulletSpaceTime,
                this._bulletPrefab = cc.loader.getRes("main/prefabs/Bullet"),
                this._createBulletPool()
            }
            return e.prototype.loseEffect = function() {
                return __awaiter(this, void 0, Promise, function() {
                    return __generator(this, function(e) {
                        return [2]
                    })
                })
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this.duration -= e,
                this.duration <= 0 ? (this._player.isNutIce ? this._player.changeShape(n.PlayerStatus.Ice) : this._player.changeShape(n.PlayerStatus.Normal),
                this._bullets.length <= 0 && a.default.instance.event(s.GameEvent.PROPS_LOSE_EFFECT, {
                    id: this.id
                })) : (this._bulletSpaceTime -= e,
                this._bulletSpaceTime <= 0 && (this.createBullet(0),
                this.createBullet(30),
                this.createBullet(-30),
                this._bulletSpaceTime = i.default.instance.config.battleCfg.propsConfig[r.PropsType.Nut].bulletSpaceTime)),
                this._updateBullets(),
                this._detectImpactWithEnemy()
            }
            ,
            e.prototype.createBullet = function(e) {
                var t, o = (t = this._bulletPool.size() > 0 ? this._bulletPool.get() : cc.instantiate(this._bulletPrefab)).getComponent(l.BulletScript);
                o || (o = t.addComponent(l.BulletScript)),
                t.parent = this._gameStageNode;
                var n = -this._player.node.rotation / 180 * Math.PI
                  , i = this._bulletOffset.x * Math.cos(n) - this._bulletOffset.y * Math.sin(n)
                  , r = this._bulletOffset.x * Math.sin(n) + this._bulletOffset.y * Math.cos(n);
                t.x = this._player.node.x + i,
                t.y = this._player.node.y + r,
                o.init(this._player.node.rotation + e),
                f.default.instance.playSound(f.Sound.nut),
                this._bullets.push(o)
            }
            ,
            e.prototype.destroyBullet = function(e) {
                this._bullets = this._bullets.filter(function(t) {
                    return t.node !== e
                }),
                this._bulletPool.put(e)
            }
            ,
            e.prototype.setGameStage = function(e) {
                this._gameStageNode = e
            }
            ,
            e.prototype._detectImpactWithEnemy = function() {
                for (var e = 0; e < this._bullets.length; e++) {
                    var t = this._bullets[e];
                    d.default.isInTeleport ? h.default.instance.detectImpactWithBullet(t) && (f.default.instance.playSound(f.Sound.destroyEl),
                    this.destroyBullet(t.node),
                    e--) : (p.default.instance.detectImpactWithBullet(t) || u.default.instance.detectImpactEnemyHandWithBullet(t)) && (f.default.instance.playSound(f.Sound.destroyEl),
                    this.destroyBullet(t.node),
                    e--)
                }
            }
            ,
            e.prototype._updateBullets = function() {
                for (var e = 0; e < this._bullets.length; e++) {
                    var t = this._bullets[e];
                    t.node.x > c.default.StageWidth / 2 + t.node.width && (this.destroyBullet(t.node),
                    e--)
                }
            }
            ,
            e.prototype._createBulletPool = function() {
                this._bulletPool = new cc.NodePool;
                for (var e = 0; e < 30; e++) {
                    var t = cc.instantiate(this._bulletPrefab);
                    this._bulletPool.put(t)
                }
            }
            ,
            e
        }();
        o.default = _,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../../resources/components/LhSoundManager/SoundManager": "SoundManager",
        "../common/Store": "Store",
        "../configs/GameEvent": "GameEvent",
        "../mock/Props": "Props",
        "./BlockManager": "BlockManager",
        "./BulletScript": "BulletScript",
        "./FogManager": "FogManager",
        "./Player": "Player",
        "./TeleportBlockManager": "TeleportBlockManager"
    }],
    PropsReliveEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "81abakfNdFAf4VsB3vN97x6", "PropsReliveEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../mock/Props")
          , i = e("./BlockManager")
          , r = e("../../ccc-library/configs/BaseConfig")
          , a = e("../common/Store")
          , s = e("./TeleportBlockManager")
          , c = function() {
            function e() {
                this.id = null,
                this.type = n.PropsType.Relive,
                this._player = null
            }
            return e.prototype.loseEffect = function() {
                var e = this;
                return new Promise(function(t) {
                    e._player.removeIce();
                    var o = a.default.isInTeleport ? s.default.instance.findBlockAfterPlayer(e._player.getCollision()) : i.default.instance.findBlockAfterPlayer(e._player.getCollision())
                      , c = o.topBlock
                      , l = o.bottomBlock
                      , p = ((c ? c.getCollision().y : r.default.StageHeight / 2) + (l ? l.getCollision().y : -r.default.StageHeight / 2)) / 2;
                    e._player.node.y = p;
                    var u = e._player.changeShape(n.PropsType.Relive);
                    u && u.then(function() {
                        e._player.setSpeedY(0),
                        e._player.gotProps(n.PropsType.Invincible, 2, !1),
                        t(null)
                    })
                }
                )
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e
            }
            ,
            e.prototype.fixUpdate = function(e) {}
            ,
            e
        }();
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../common/Store": "Store",
        "../mock/Props": "Props",
        "./BlockManager": "BlockManager",
        "./TeleportBlockManager": "TeleportBlockManager"
    }],
    PropsScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "681a7/DMjNJ9Jx5TwoqvuIj", "PropsScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = e("../../ccc-library/animation/NewAETool/NewAEToolAnimation")
          , a = 0
          , s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.closeAni = null,
                t.openAni = null,
                t.img = null,
                t.destroyAni = null,
                t._elementScript = null,
                t.id = 0,
                t
            }
            return __extends(t, e),
            t.prototype.init = function(e) {
                this._elementScript = e,
                this.id = a++
            }
            ,
            t.prototype.got = function() {
                this._elementScript.ignoreDetectImpact = !0,
                this.closeAni.node.active = !1,
                this.openAni.node.active = !0,
                this.openAni.play(1, function() {})
            }
            ,
            t.prototype.getCollision = function() {
                return this._elementScript.getCollision()
            }
            ,
            t.prototype.destroySelf = function(e) {
                var t = this;
                void 0 === e && (e = !1),
                this._elementScript.ignoreDetectImpact = !0,
                this.closeAni.node.active = !1,
                this.destroyAni.node.active = !0,
                e ? this._elementScript.destroySelf(!0) : this.destroyAni.play(1, function() {
                    t._elementScript.destroySelf(!0)
                })
            }
            ,
            __decorate([i(r.default)], t.prototype, "closeAni", void 0),
            __decorate([i(r.default)], t.prototype, "openAni", void 0),
            __decorate([i(cc.Sprite)], t.prototype, "img", void 0),
            __decorate([i(r.default)], t.prototype, "destroyAni", void 0),
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = s,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/animation/NewAETool/NewAEToolAnimation": "NewAEToolAnimation"
    }],
    PropsSlowdownTimeEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1a2c8AgCyJAUaBlOvkeLo4B", "PropsSlowdownTimeEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/net/MicroGameSocket")
          , i = e("../mock/Props")
          , r = e("../mock/Game")
          , a = e("../common/Store")
          , s = function() {
            function e() {
                this.id = null,
                this._player = null
            }
            return e.prototype.loseEffect = function() {
                return __awaiter(this, void 0, Promise, function() {
                    return __generator(this, function(e) {
                        return a.default.updateSpeed(),
                        this._player.slowdown(1),
                        [2]
                    })
                })
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e,
                n.default.instance.config.battleCfg.gameSpeed *= n.default.instance.config.battleCfg.propsConfig[i.PropsType.SlowdownTime].slow,
                n.default.instance.config.battleCfg.bgSpeed *= n.default.instance.config.battleCfg.propsConfig[i.PropsType.SlowdownTime].slow,
                this._player.slowdown(n.default.instance.config.battleCfg.propsConfig[i.PropsType.SlowdownTime].slow),
                n.default.instance.operate(r.OperateType.useProps, {
                    propsType: i.PropsType.SlowdownTime,
                    id: this.id
                })
            }
            ,
            e.prototype.fixUpdate = function(e) {}
            ,
            e
        }();
        o.default = s,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../common/Store": "Store",
        "../mock/Game": "Game",
        "../mock/Props": "Props"
    }],
    PropsSmallerEffect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "6cc42Rv/bZGnJgVWWlooz1A", "PropsSmallerEffect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/net/MicroGameSocket")
          , i = e("../mock/Props")
          , r = e("../../ccc-library/common/EventManager")
          , a = e("../configs/GameEvent")
          , s = function() {
            function e() {
                this.id = null,
                this.duration = 0,
                this._player = null,
                this.duration = n.default.instance.config.battleCfg.propsConfig[i.PropsType.Smaller].duration
            }
            return e.prototype.loseEffect = function() {
                return __awaiter(this, void 0, Promise, function() {
                    return __generator(this, function(e) {
                        return this._player.scaleCollision(1),
                        this._player.scaleShadow(1),
                        [2]
                    })
                })
            }
            ,
            e.prototype.takeEffect = function(e) {
                this._player = e;
                var t = n.default.instance.config.battleCfg.propsConfig[i.PropsType.Smaller].scale;
                this._player.scaleCollision(t),
                this._player.scaleShadow(t)
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this.duration -= e,
                this.duration <= 0 && r.default.instance.event(a.GameEvent.PROPS_LOSE_EFFECT, {
                    id: this.id
                })
            }
            ,
            e
        }();
        o.default = s,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../configs/GameEvent": "GameEvent",
        "../mock/Props": "Props"
    }],
    Props: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4477f+EzQhAvIha2qs9tXKm", "Props"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            return function() {}
        }();
        o.Props = n,
        function(e) {
            e[e.Nut = 1] = "Nut",
            e[e.SlowdownTime = 2] = "SlowdownTime",
            e[e.Smaller = 3] = "Smaller",
            e[e.AddScore = 4] = "AddScore",
            e[e.Invincible = 5] = "Invincible",
            e[e.Relive = 6] = "Relive",
            e[e.Face = 7] = "Face"
        }(o.PropsType || (o.PropsType = {})),
        cc._RF.pop()
    }
    , {}],
    RankInfoScript: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "50d534PrZhNZoJO/h3MIx/M", "RankInfoScript"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator.ccclass
          , i = cc._decorator.property
          , r = e("../../ccc-library/net/MicroGameSocket")
          , a = e("../../ccc-library/configs/BaseConfig")
          , s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.number = null,
                t._info = null,
                t._x = 0,
                t.markForDelete = !1,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this.node.x = this._x;
                var e = cc.loader.getRes("main/images/game/rank/" + this._info.ratio, cc.SpriteFrame);
                e ? (this.number.spriteFrame = e,
                this.number.node.width = e.getRect().width,
                this.number.node.height = e.getRect().height) : console.error(this._info.ratio + "\u6ca1\u6709\u5bf9\u5e94\u7684\u56fe\u7247")
            }
            ,
            t.prototype.fixUpdate = function(e) {
                this.node.x -= e * r.default.instance.config.battleCfg.gameSpeed,
                this.node.x < -a.default.StageWidth / 2 - this.number.node.width && (this.markForDelete = !0,
                this.destroySelf())
            }
            ,
            t.prototype.init = function(e, t) {
                this._info = e,
                this._x = t
            }
            ,
            t.prototype.destroySelf = function() {
                this.node.destroy()
            }
            ,
            __decorate([i(cc.Sprite)], t.prototype, "number", void 0),
            t = __decorate([n()], t)
        }(cc.Component);
        o.default = s,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/configs/BaseConfig": "BaseConfig",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket"
    }],
    RankManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "87556gM37NIOLf76ZJROaEh", "RankManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./RankInfoScript")
          , i = e("../common/Store")
          , r = function() {
            function e() {
                this._infos = [],
                this._rankInfoScripts = []
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this.destroy(),
                this._infos = e
            }
            ,
            e.prototype.destroy = function() {
                this._infos.length = 0,
                this._rankInfoScripts.forEach(function(e) {
                    return e.destroySelf()
                }),
                this._rankInfoScripts.length = 0
            }
            ,
            e.prototype.fixUpdate = function(e) {
                var t = e.dt
                  , o = e.score
                  , n = e.curBlockConfig
                  , i = e.player
                  , r = e.gameStage
                  , a = e.blocks;
                if (this._infos.length) {
                    var s = this._infos[0];
                    o + 2 * n.score > s.score && this._createRankInfo(i, 2, s, r, a)
                }
                this._rankInfoScripts.forEach(function(e) {
                    return e.fixUpdate(t)
                }),
                this._rankInfoScripts = this._rankInfoScripts.filter(function(e) {
                    return !e.markForDelete
                })
            }
            ,
            e.prototype._createRankInfo = function(e, t, o, n, r) {
                var a = null;
                if (r.some(function(o, n) {
                    var i = o.getCollision();
                    if (!i)
                        return !1;
                    var r = i.x > e.getCollision().x;
                    return r && (a = n + t),
                    r
                }),
                null !== a) {
                    var s = r[a];
                    if (!s)
                        return;
                    var c = void 0
                      , l = r[a + 1];
                    l && l.getCollision().x === s.getCollision().x && (l = r[a + 2]),
                    c = l ? (s.getCollision().x + l.getCollision().x) / 2 : s.getCollision().x + i.default.curBlockConfig.blockSpaceRange[0] / 2,
                    this._createRankNode(o, n.node, c),
                    this._infos.shift()
                }
            }
            ,
            e.prototype._createRankNode = function(e, t, o) {
                var i = cc.loader.getRes("main/prefabs/RankInfo")
                  , r = cc.instantiate(i)
                  , a = r.getComponent(n.default);
                a.init(e, o),
                this._rankInfoScripts.push(a),
                t.addChild(r)
            }
            ,
            e._instance = null,
            e
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "../common/Store": "Store",
        "./RankInfoScript": "RankInfoScript"
    }],
    ResourceConfig: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "23ee7sp4IhPvrnKHjEimtNP", "ResourceConfig"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = {
            fonts: [],
            pre: [{
                folder: "main",
                type: cc.Prefab
            }, {
                folder: "main",
                type: cc.SpriteFrame
            }, {
                folder: "main",
                type: cc.JsonAsset
            }, {
                folder: "demo",
                type: cc.Prefab
            }, {
                folder: "demo",
                type: cc.SpriteFrame
            }, {
                folder: "demo",
                type: cc.JsonAsset
            }, {
                folder: "components",
                type: cc.Prefab
            }, {
                folder: "components",
                type: cc.SpriteFrame
            }, {
                folder: "components",
                type: cc.JsonAsset
            }, {
                folder: "fonts",
                type: cc.Font
            }],
            lazy: []
        };
        o.NormalRes = {
            fonts: n.fonts.slice(),
            pre: n.pre.slice(),
            lazy: n.lazy.slice()
        },
        o.WebGLRes = {
            fonts: n.fonts.slice(),
            pre: n.pre.slice(),
            lazy: n.lazy.slice()
        },
        cc._RF.pop()
    }
    , {}],
    ResultUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cd392To7tNNXpd31K2SWz5s", "ResultUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/scripts/ui/BaseUI")
          , i = e("../../ccc-library/scripts/ui/UIManager")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = i.UIType.Normal,
                t.render = i.UIRender.Normal,
                t.score = null,
                t.time = null,
                t._gameController = null,
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {}
            ,
            t.prototype.showResult = function(e, t) {
                this._gameController || (this._gameController = t),
                this.show(),
                this.score.string = "\u5206\u6570\uff1a" + e.score.toString(),
                this.time.string = "\u65f6\u957f\uff1a" + Math.ceil(e.gameTime).toString()
            }
            ,
            t.prototype.onClickRestart = function() {
                console.log("\u91cd\u5f00"),
                this._gameController.restart(),
                this.hide()
            }
            ,
            t.prototype.onClickHome = function() {
                console.log("\u56de\u9996\u9875"),
                this._gameController.goHome(),
                this.hide()
            }
            ,
            t.uiName = "ResultUI",
            __decorate([s(cc.Label)], t.prototype, "score", void 0),
            __decorate([s(cc.Label)], t.prototype, "time", void 0),
            t = __decorate([a], t)
        }(n.default);
        o.default = c,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/scripts/ui/BaseUI": "BaseUI",
        "../../ccc-library/scripts/ui/UIManager": "UIManager"
    }],
    Result: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "d474fzQf+FByr6Nb7xVJ8rD", "Result"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {
                this.score = 0,
                this.gameTime = 0,
                this.gotAddScoreCount = 0,
                this.addScoreDetail = [],
                this.pauseCount = 0,
                this.pauseDetail = [],
                this.enterTeleportCount = 0,
                this.teleportTotalTime = 0,
                this.enterTeleportDetail = [],
                this.blockNumber = 0,
                this.unlockedFace = [],
                this.roleId = "",
                this.gameId = "",
                this.isRelive = !1
            }
            return e.prototype.recordAddScoreCount = function(e) {
                this.gotAddScoreCount++,
                this.addScoreDetail.length >= 30 && this.addScoreDetail.shift(),
                this.addScoreDetail.push({
                    time: e
                })
            }
            ,
            e.prototype.recordPauseCount = function(e) {
                this.pauseCount++,
                this.pauseDetail.length >= 30 && this.pauseDetail.shift(),
                this.pauseDetail.push({
                    startTime: e,
                    endTime: null
                })
            }
            ,
            e.prototype.recordPauseEndTime = function(e) {
                this.pauseDetail[this.pauseDetail.length - 1].endTime = e
            }
            ,
            e.prototype.recordEnterTeleportCount = function(e) {
                this.enterTeleportCount++,
                this.enterTeleportDetail.length >= 10 && this.enterTeleportDetail.shift(),
                this.enterTeleportDetail.push({
                    enterTime: e,
                    leaveTime: null
                })
            }
            ,
            e.prototype.recordLeaveTeleportTime = function(e) {
                var t = this.enterTeleportDetail[this.enterTeleportDetail.length - 1];
                t.leaveTime = e,
                this.teleportTotalTime += t.leaveTime - t.enterTime
            }
            ,
            e
        }();
        o.default = n,
        cc._RF.pop()
    }
    , {}],
    Sdk: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "58d6eHcfy1HlpjpYSCPNDhN", "Sdk"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./EventManager")
          , i = function() {
            function e() {
                this.microGame = {},
                this.exitHandler = null,
                this.AddMsgListener("TryExit", this._exit)
            }
            return Object.defineProperty(e, "Instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "inSdk", {
                get: function() {
                    return window.top.location != self.location
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.Init = function() {
                window.addEventListener("message", this.OnMessage)
            }
            ,
            e.prototype.OnMessage = function(t) {
                var o = t.data;
                if ("string" == typeof o) {
                    var i = o.split("&#&");
                    if ("CCC" === i[0]) {
                        var r = i[1]
                          , a = JSON.parse(i[2]);
                        r == e.MESSAGE || r == e.CLIENT_MESSAGE ? n.default.instance.event(a.msgType, a.data) : n.default.instance.event(r, a)
                    }
                }
            }
            ,
            e.prototype.Post = function(e, t) {
                void 0 === t && (t = {});
                var o = "CCC&#&" + e + "&#&" + JSON.stringify(t) + "&#&" + window.location.href;
                window.parent.postMessage(o, "*")
            }
            ,
            e.prototype.PostClient = function(t, o) {
                void 0 === o && (o = {});
                var n = "CCC&#&" + e.CLIENT_MESSAGE + "&#&" + JSON.stringify({
                    msgType: t,
                    data: JSON.stringify(o)
                }) + "&#&" + window.location.href;
                window.parent.postMessage(n, "*")
            }
            ,
            e.prototype.AddMsgListener = function(e, t) {
                this.inSdk ? n.default.instance.on(e, this, t) : window[e] = t
            }
            ,
            e.prototype.AddMsgOnceListener = function(e, t) {
                this.inSdk ? n.default.instance.once(e, this, t) : window[e] = t
            }
            ,
            e.prototype.Request = function(t) {
                return e.Instance.Post(e.REQUEST, t),
                new Promise(function(t, o) {
                    e.Instance.AddMsgOnceListener(e.REQUEST_SUCCESS, function(e) {
                        return t(e.getUserData())
                    }),
                    e.Instance.AddMsgOnceListener(e.REQUEST_ERROR, function(e) {
                        return o(e.getUserData())
                    })
                }
                )
            }
            ,
            e.prototype.RequestGet = function(t, o) {
                return void 0 === o && (o = {}),
                new Promise(function(n, i) {
                    e.Instance.Request(__assign({}, o, {
                        method: "get",
                        url: t
                    })).then(n).catch(i)
                }
                )
            }
            ,
            e.prototype.RequestPost = function(t, o, n) {
                return void 0 === o && (o = {}),
                void 0 === n && (n = {}),
                new Promise(function(i, r) {
                    e.Instance.Request(__assign({}, n, {
                        url: t,
                        method: "post",
                        data: o
                    })).then(i).catch(r)
                }
                )
            }
            ,
            e.prototype._exit = function() {
                this.exitHandler && this.exitHandler()
            }
            ,
            e.ENGINE_LOADED = "ENGINE_LOADED",
            e.START_PRELOAD = "START_PRELOAD",
            e.PRELOAD_PROGRESS = "PRELOAD_PROGRESS",
            e.PRELOAD_LOADED = "PRELOAD_LOADED",
            e.START_GAME = "START_GAME",
            e.START_MICRO_GAME = "START_MICRO_GAME",
            e.RESTART_GAME = "RESTART_GAME",
            e.CLIENT_MESSAGE = "CLIENT_MESSAGE",
            e.MESSAGE = "MESSAGE",
            e.GAME_END = "GAME_END",
            e.REQUEST = "REQUEST",
            e.REQUEST_SUCCESS = "REQUEST_SUCCESS",
            e.REQUEST_ERROR = "REQUEST_ERROR",
            e.AUDIO_MUTE = "AUDIO_MUTE",
            e.AUDIO_UNMUTE = "AUDIO_UNMUTE",
            e.DIE = "DIE",
            e.RELIVE = "RELIVE",
            e.END = "END",
            e.GO_HOME = "GO_HOME",
            e.PAUSE = "PAUSE",
            e.SET_CONFIG = "SET_CONFIG",
            e.SHOW_GAME_MESSAGE = "SHOW_GAME_MESSAGE",
            e._instance = null,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./EventManager": "EventManager"
    }],
    SoundManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cefadsUm/BC7oxFLG0Sh27Y", "SoundManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i, r = e("../../../ccc-library/common/Sdk"), a = e("../../../ccc-library/common/MapES5"), s = function() {
            function e() {
                var e;
                this._isMute = !1,
                this._map = ((e = {})[i.Normal] = "https://www.narakathegame.com/2023/0117/4a49383e1f8a6fc382d4cd3a85523786.mp3",
                e[i.Hyj] = "https://www.narakathegame.com/2023/0117/6cea3811323c72a6723f9eeca7c523bb.mp3",
                e[n.jump] = "https://www.narakathegame.com/2023/0129/8d1e7a8ee50fca840687555fa7932d76.mp3",
                e[n.gotProps] = "https://www.narakathegame.com/2023/0129/e971b22931a178169a262962a25022be.mp3",
                e[n.gotFace] = "https://www.narakathegame.com/2023/0129/dd90f22d98f309256377b26dae541f71.mp3",
                e[n.addScore] = "https://www.narakathegame.com/2023/0129/72d74749969c515c29468305833b646f.mp3",
                e[n.nut] = "https://www.narakathegame.com/2023/0129/a34a37581566814e6e4c7e6fe029c036.mp3",
                e[n.destroyEl] = "https://www.narakathegame.com/2023/0129/b9d4722daf8e6045b7bd6c717c433829.mp3",
                e[n.die] = "https://www.narakathegame.com/2023/0129/e3071d81384497998d8d6fbc96653c1c.mp3",
                e[n.relive] = "https://www.narakathegame.com/2023/0129/8454c92febb147641a44998cf61ad47c.mp3",
                e[n.fogAppear] = "https://www.narakathegame.com/2023/0129/43c672b42779f510f2e274f8e824cdf3.mp3",
                e[n.ice] = "https://www.narakathegame.com/2023/0129/1996071afc874b9d22ea24a97fb6b4e3.mp3",
                e[n.clickBtn] = "https://www.narakathegame.com/2023/0129/5239f249bd985e08fefcdfc53ebdbaae.mp3",
                e[n.enterTeleport] = "https://www.narakathegame.com/2023/0129/d68fdecd60b368c6accb0709dbc82533.mp3",
                e[n.leaveTeleport] = "https://www.narakathegame.com/2023/0129/adc4195b56cc622580db286890b9659f.mp3",
                e),
                this._clips = null,
                this._bgmId = new a.default
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.preload = function() {
                var e = this;
                return new Promise(function(t) {
                    e._clips = new a.default;
                    var o = 0
                      , i = Object.keys(e._map);
                    i.forEach(function(r) {
                        var a = e._map[r];
                        cc.loader.load({
                            url: a,
                            type: "mp3"
                        }, function(a, s) {
                            o++,
                            e._clips.set(r, s),
                            r === n.mute && cc.audioEngine.play(s, !1, 0),
                            o >= i.length && t(null)
                        })
                    })
                }
                )
            }
            ,
            e.prototype.init = function() {
                r.default.Instance.inSdk && (r.default.Instance.AddMsgListener(r.default.AUDIO_MUTE, this.mute.bind(this)),
                r.default.Instance.AddMsgListener(r.default.AUDIO_UNMUTE, this.unmute.bind(this))),
                this.preload()
            }
            ,
            e.prototype.mute = function() {
                this._isMute = !0,
                this.pauseAllBgm()
            }
            ,
            e.prototype.unmute = function() {
                this._isMute = !1,
                this.playAllBgm()
            }
            ,
            e.prototype.playSound = function(e, t) {
                if (void 0 === t && (t = 1),
                !this._isMute) {
                    var o = this._clips.get(e);
                    o ? cc.audioEngine.playEffect(o, !1) : console.error(e, "is not found or loaded")
                }
            }
            ,
            e.prototype.playBgm = function(e, t) {
                if (void 0 === t && (t = .2),
                !this._isMute) {
                    var o = this._clips.get(e);
                    if (o) {
                        var n = cc.audioEngine.play(o, !0, t);
                        this._bgmId.set(e, n)
                    } else
                        console.error(e, "is not found or loaded")
                }
            }
            ,
            e.prototype.pauseBgm = function(e) {
                if (!this._isMute) {
                    var t = this._bgmId.get(e);
                    cc.audioEngine.pause(t)
                }
            }
            ,
            e.prototype.playAllBgm = function() {
                cc.audioEngine.resumeAll()
            }
            ,
            e.prototype.pauseAllBgm = function() {
                cc.audioEngine.pauseAll()
            }
            ,
            e._instance = null,
            e
        }();
        o.default = s,
        function(e) {
            e.mute = "mute",
            e.jump = "jump",
            e.gotProps = "gotProps",
            e.gotFace = "gotFace",
            e.addScore = "addScore",
            e.nut = "nut",
            e.destroyEl = "destroyEl",
            e.die = "die",
            e.relive = "relive",
            e.fogAppear = "fogAppear",
            e.ice = "ice",
            e.clickBtn = "clickBtn",
            e.enterTeleport = "enterTeleport",
            e.leaveTeleport = "leaveTeleport"
        }(n = o.Sound || (o.Sound = {})),
        function(e) {
            e.Normal = "Normal",
            e.Hyj = "Hyj"
        }(i = o.Bgm || (o.Bgm = {})),
        cc._RF.pop()
    }
    , {
        "../../../ccc-library/common/MapES5": "MapES5",
        "../../../ccc-library/common/Sdk": "Sdk"
    }],
    Store: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cf6d38KgKhI5bNpk6K2clMX", "Store"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/net/MicroGameSocket")
          , i = e("../../ccc-library/common/MapES5")
          , r = function() {
            function e() {}
            return e.getCurrentGameSpeedPower = function() {
                return this.isInTeleport || 0 === this.curStage ? 1 : this.curStage > 0 ? n.default.instance.config.battleCfg.gameSpeedPower : void 0
            }
            ,
            e.updateSpeed = function() {
                n.default.instance.config.battleCfg.gameSpeed = n.default.instance.config.gameCfg.GameSpeed * e.getCurrentGameSpeedPower(),
                n.default.instance.config.battleCfg.bgSpeed = n.default.instance.config.gameCfg.BgSpeed * e.getCurrentGameSpeedPower()
            }
            ,
            Object.defineProperty(e, "curStage", {
                get: function() {
                    return e._curStage
                },
                set: function(t) {
                    e._curStage = t,
                    e._setPropsRateConfig(),
                    e.updateSpeed()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "isLastStage", {
                get: function() {
                    return !!n.default.instance.config.battleCfg && this.curStage === n.default.instance.config.battleCfg.stages[n.default.instance.config.battleCfg.stages.length - 1].index
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "curBlockConfig", {
                get: function() {
                    return n.default.instance.config.battleCfg.stagesBlockConfig[this.curStage]
                },
                enumerable: !0,
                configurable: !0
            }),
            e.init = function() {
                e._setPropsRateConfig()
            }
            ,
            e.destroy = function() {
                this.isDie = !1,
                this.curStage = 0,
                this.gamePause = !1,
                this.gameStart = !1,
                this.isInTeleport = !1,
                this.isGameEnd = !1,
                this.passBlockNumber = 0
            }
            ,
            e.getPropsRateConfig = function(e) {
                var t = new i.default
                  , o = 0;
                Object.keys(e).forEach(function(t) {
                    o += e[t].rate
                });
                var n = 0;
                return Object.keys(e).forEach(function(i) {
                    var r = Number(i)
                      , a = e[r]
                      , s = n + a.rate / o;
                    t.set(r, [n, s]),
                    n = s
                }),
                t
            }
            ,
            e._setPropsRateConfig = function() {
                this.propsRateConfig.clear(),
                this.propsRateConfig = e.getPropsRateConfig(e.curBlockConfig.props)
            }
            ,
            e.webConfig = {},
            e.isInTeleport = !1,
            e.passBlockNumber = 0,
            e.isGameEnd = !1,
            e.isInfinityRelive = !1,
            e.isDie = !1,
            e.gameStart = !1,
            e.gamePause = !1,
            e._curStage = 0,
            e.propsRateConfig = new i.default,
            e
        }();
        o.default = r,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/MapES5": "MapES5",
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket"
    }],
    TeleportBlockManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "dc162Bimk5BF78+SVKbjohg", "TeleportBlockManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./BlockController")
          , i = function() {
            function e() {
                this._blockController = null,
                this._createdBlockNumber = 0,
                this._blockController = new n.default
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                var t = e.blocks
                  , o = e.prefab
                  , n = e.parent
                  , i = e.curDis;
                console.log("\u56de\u9633\u955c\u521d\u59cb\u5316"),
                this._createdBlockNumber += t.length,
                this._blockController.init({
                    blocks: t,
                    prefab: o,
                    parent: n,
                    curDis: i
                })
            }
            ,
            e.prototype.destroy = function() {
                this._blockController.destroy()
            }
            ,
            e.prototype.getBlocks = function() {
                return this._blockController.getBlocks()
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._blockController.fixUpdate(e)
            }
            ,
            e.prototype.createBlocks = function(e) {
                var t = e.blocks
                  , o = e.prefab
                  , n = e.curDis;
                this._createdBlockNumber += t.length,
                this._blockController.createBlocks({
                    blocks: t,
                    prefab: o,
                    curDis: n
                })
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                return this._blockController.detectImpactWithPlayer(e)
            }
            ,
            e.prototype.detectImpactWithBullet = function(e) {
                return !!this._blockController.detectImpactWithBullet(e)
            }
            ,
            e.prototype.findBlockAfterPlayer = function(e) {
                return this._blockController.findBlockAfterPlayer(e)
            }
            ,
            e._instance = null,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./BlockController": "BlockController"
    }],
    TeleportBuff: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "56fd1XrFLpBpqdIDxueb6ZT", "TeleportBuff"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./CollisionCalculation")
          , i = e("./ElementScript")
          , r = e("../../ccc-library/net/MicroGameSocket")
          , a = e("../mock/Game")
          , s = function() {
            function e() {
                this._enterTeleport = null,
                this._leaveTeleport = null,
                this._prefab = null
            }
            return e.prototype.detectImpactEnterTeleportWithPlayer = function(e) {
                return !(!this._enterTeleport || !this._enterTeleport.node) && n.default.instance.calBoxAndCircle(this._enterTeleport.getCollision(), e.getCollision()) === n.CollisionState.intersect
            }
            ,
            e.prototype.detectImpactLeaveTeleportWithPlayer = function(e) {
                return !(!this._leaveTeleport || !this._leaveTeleport.node) && n.default.instance.calBoxAndCircle(this._leaveTeleport.getCollision(), e.getCollision()) === n.CollisionState.intersect
            }
            ,
            e.prototype.createTeleport = function(e) {
                var t = e.rectInfo
                  , o = e.curDis
                  , n = e.isInTeleport
                  , i = e.parent
                  , s = this._instanceTeleport(i, t, o);
                return s.changeCollisionWidth(r.default.instance.config.battleCfg.teleportCollisionSize.width),
                s.changeCollisionHeight(r.default.instance.config.battleCfg.teleportCollisionSize.height),
                n ? this._leaveTeleport = s : (this._enterTeleport = s,
                this._enterTeleport.setBeforeDestroyHandler(function() {
                    return new Promise(function(e) {
                        r.default.instance.operate(a.OperateType.destroyTeleport),
                        e(null)
                    }
                    )
                })),
                this._enterTeleport
            }
            ,
            e.prototype._instanceTeleport = function(e, t, o) {
                this._prefab || (this._prefab = cc.loader.getRes("main/prefabs/Teleport"));
                var n = cc.instantiate(this._prefab)
                  , r = n.getComponent(i.default);
                return r || (r = n.addComponent(i.default)),
                e.addChild(n),
                r.init({
                    x: t.x,
                    y: t.y,
                    width: t.width,
                    height: t.height
                }, o),
                r
            }
            ,
            e.prototype.onEnterTeleport = function() {
                if (this._enterTeleport)
                    return this._enterTeleport.node.position
            }
            ,
            e.prototype.destroyEnterTeleport = function() {
                this._enterTeleport.destroySelf(!1),
                this._enterTeleport = null
            }
            ,
            e.prototype.onLeaveTeleport = function() {
                this._leaveTeleport
            }
            ,
            e.prototype.destroyLeaveTeleport = function() {
                this._leaveTeleport.destroySelf(!0),
                this._leaveTeleport = null
            }
            ,
            e.prototype.fixUpdate = function(e) {
                var t = e * r.default.instance.config.battleCfg.gameSpeed;
                this._enterTeleport && (this._enterTeleport.destroyFlag ? this._enterTeleport = null : this._enterTeleport.move(t)),
                this._leaveTeleport && (this._leaveTeleport.destroyFlag ? this._leaveTeleport = null : this._leaveTeleport.move(t))
            }
            ,
            e.prototype.destroySelf = function() {
                this._enterTeleport && this._enterTeleport.destroySelf(!0),
                this._leaveTeleport && this._leaveTeleport.destroySelf(!0),
                this._prefab = null
            }
            ,
            e
        }();
        o.default = s,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/net/MicroGameSocket": "MicroGameSocket",
        "../mock/Game": "Game",
        "./CollisionCalculation": "CollisionCalculation",
        "./ElementScript": "ElementScript"
    }],
    TeleportPropsManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e8c31G/IVpACJxzFA2b8dc+", "TeleportPropsManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PropsController")
          , i = function() {
            function e() {
                this._propsController = null,
                this._propsController = new n.default
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e),
                    this._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this._propsController.init(e)
            }
            ,
            e.prototype.destroy = function() {
                this._propsController.destroy()
            }
            ,
            e.prototype.createProps = function(e) {
                var t = e.props
                  , o = e.curDis;
                return this._propsController.createProps({
                    props: t,
                    curDis: o
                })
            }
            ,
            e.prototype.createOneProps = function(e) {
                var t = e.props
                  , o = e.curDis;
                return this._propsController.createOneProps({
                    props: t,
                    curDis: o
                })
            }
            ,
            e.prototype.detectImpactWithPlayer = function(e) {
                return this._propsController.detectImpactWithPlayer(e)
            }
            ,
            e.prototype.fixUpdate = function(e) {
                this._propsController.fixUpdate(e)
            }
            ,
            e._instance = null,
            e
        }();
        o.default = i,
        cc._RF.pop()
    }
    , {
        "./PropsController": "PropsController"
    }],
    UIManager: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "932b8S1IzBE5bct99oAMjfb", "UIManager"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/MapES5")
          , i = e("../../configs/BaseConfig")
          , r = function() {
            function e() {
                this.uiResMap = null,
                this.uiMap = null,
                this.uiRoot = null,
                this.rootMap = null,
                this.showMap = null,
                this.showStack = null,
                this._uiRootPrefab = null
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                this.uiResMap = new n.default,
                this.uiMap = new n.default,
                this.rootMap = new n.default,
                this.showMap = new n.default,
                this.showStack = new Array,
                this._getViewConfigs(e)
            }
            ,
            e.prototype._getViewConfigs = function(e) {
                var t = null;
                for (t in e.json) {
                    var o = new c(t,e.json[t]);
                    this.uiResMap.set(t, o)
                }
            }
            ,
            e.prototype.createRoot = function(e) {
                this._uiRootPrefab = e
            }
            ,
            e.prototype._createRoot = function() {
                this.uiRoot = cc.instantiate(this._uiRootPrefab),
                this.uiRoot.name = "uiRoot",
                this.uiRoot.width = i.default.StageWidth,
                this.uiRoot.height = i.default.StageHeight,
                this.uiRoot.x = this.uiRoot.y = 0,
                cc.game.addPersistRootNode(this.uiRoot),
                cc.game.addPersistRootNode(this.uiRoot)
            }
            ,
            e.prototype.preloadUI = function(e, t) {
                var o = 2 * e.length;
                if (0 != o)
                    for (var n = 0, i = function() {
                        ++n >= o && t && t()
                    }, r = 0; r < e.length; r++) {
                        var a = e[r]
                          , s = this.uiResMap.get(a);
                        if (null != s) {
                            cc.loader.loadRes(s.url, cc.Prefab, i.bind(this));
                            for (var c = new Array, l = 0; l < s.assets.length; l++)
                                c.push(s.assets[l]);
                            cc.loader.loadResArray(c, cc.SpriteFrame, i.bind(this))
                        } else
                            console.error("UI[" + a + "]", "config is not found"),
                            i()
                    }
                else
                    t && t()
            }
            ,
            e.prototype.createUI = function(e, t) {
                var o = this.uiMap.get(e);
                if (null == o) {
                    var n = cc.loader.getRes(this.uiResMap.get(e.uiName).url)
                      , i = cc.instantiate(n);
                    (o = i.getComponent(e)).view = i,
                    o.setZIndex(t),
                    o.init(),
                    this.uiResMap.delete(o.name),
                    o.type != a.Once && this.uiMap.set(e, o)
                }
                return o
            }
            ,
            e.prototype.showUI = function(e) {
                var t = this;
                switch (e.render) {
                case s.CloseOther:
                    t.rootMap.forEach(function(o, n) {
                        n != e.name && t._removeUI(o)
                    });
                    break;
                case s.HideOther:
                    t.showMap.forEach(function(o, n) {
                        n != e.name && t._hideUI(o)
                    });
                    break;
                case s.Stack:
                    t.showMap.forEach(function(o, n) {
                        n != e.name && o.render == s.Stack && (t._hideUI(o),
                        t._pushStackUI(o))
                    })
                }
                t._showUI(e)
            }
            ,
            e.prototype.sleepUI = function(e) {}
            ,
            e.prototype.awakeUI = function(e) {}
            ,
            e.prototype.hideUI = function(e) {
                switch (e.type) {
                case a.Once:
                    return void this.closeUI(e);
                case a.Normal:
                case a.Dialog:
                }
                if (e.render == s.Stack) {
                    var t = this._popStackUI();
                    null != t && this._showUI(t),
                    this._removeUI(e)
                } else
                    this._hideUI(e)
            }
            ,
            e.prototype.closeUI = function(e) {
                if (e.render == s.Stack) {
                    var t = this._popStackUI();
                    null != t && this._showUI(t)
                }
                this._removeUI(e)
            }
            ,
            e.prototype._rootUI = function(e) {
                if (null == this.rootMap.get(e.name)) {
                    var t = e.view;
                    t.parent && t.parent.removeChild(t),
                    this.uiRoot || this._createRoot(),
                    this.uiRoot.addChild(t),
                    this.rootMap.set(e.name, e)
                }
            }
            ,
            e.prototype._showUI = function(e) {
                this._rootUI(e),
                e.view.active = !0,
                this.showMap.set(e.name, e)
            }
            ,
            e.prototype._hideUI = function(e) {
                this._rootUI(e),
                e.view.active = !1,
                this.showMap.delete(e.name)
            }
            ,
            e.prototype._removeUI = function(e) {
                if (null != e && null != this.rootMap.get(e.name)) {
                    var t = e.view;
                    if (t.parent && t.parent.removeChild(t),
                    this.rootMap.delete(e.name),
                    this.showMap.delete(e.name),
                    e.render == s.Stack)
                        for (var o = 0; o < this.showStack.length; o++)
                            if (e.name == this.showStack[o].name) {
                                this.showStack.splice(o, 1);
                                break
                            }
                    e.destroy(),
                    t.destroy(),
                    this.uiMap.delete(e.constructor)
                }
            }
            ,
            e.prototype._pushStackUI = function(e) {
                this.showStack.push(e)
            }
            ,
            e.prototype._popStackUI = function() {
                var e = this.showStack.length
                  , t = null;
                return e > 0 && (t = this.showStack[e - 1],
                this.showStack.length -= 1),
                t
            }
            ,
            e.prototype._topStackUI = function() {
                var e = this.showStack.length
                  , t = null;
                return e > 0 && (t = this.showStack[e - 1]),
                t
            }
            ,
            e._instance = null,
            e
        }();
        o.default = r;
        var a, s, c = function() {
            return function(e, t) {
                this.uiName = null,
                this.url = null,
                this.assets = null,
                this.uiName = e,
                this.url = t.url;
                var o = t.assets;
                if (this.assets = new Array,
                void 0 != o.length)
                    for (var n = 0; n < o.length; n++)
                        this.assets.push(o[n]);
                else
                    console.error("UI[" + e + "]", "assets config is not array")
            }
        }();
        (function(e) {
            e[e.Once = 0] = "Once",
            e[e.Normal = 1] = "Normal",
            e[e.Dialog = 2] = "Dialog"
        }
        )(a = o.UIType || (o.UIType = {})),
        function(e) {
            e[e.Normal = 0] = "Normal",
            e[e.CloseOther = 1] = "CloseOther",
            e[e.HideOther = 2] = "HideOther",
            e[e.Stack = 3] = "Stack"
        }(s = o.UIRender || (o.UIRender = {})),
        cc._RF.pop()
    }
    , {
        "../../common/MapES5": "MapES5",
        "../../configs/BaseConfig": "BaseConfig"
    }],
    Utils: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "920beTJ9ydKO7lfwJV6NBN0", "Utils"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.formatTime = function(e) {
                return this.padStart(Math.floor(e / 60).toString(), 2, "0") + ":" + this.padStart((e % 60).toString(), 2, "0")
            }
            ,
            t.padStart = function(e, t, o) {
                for (var n = e, i = e.length; i < t; i++)
                    n = o + n;
                return n
            }
            ,
            t
        }(e("../../ccc-library/common/BaseUtils").default);
        o.default = n,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/BaseUtils": "BaseUtils"
    }],
    VHomeUI: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "9ce9bxNBEVIXY8DuzW0x3E3", "VHomeUI"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../ccc-library/common/EventManager")
          , i = e("../../ccc-library/scripts/components/LhStartButton")
          , r = e("../../ccc-library/scripts/ui/BaseUI")
          , a = e("../../ccc-library/scripts/ui/UIManager")
          , s = e("../configs/GameEvent")
          , c = cc._decorator
          , l = c.ccclass
          , p = c.property
          , u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = a.UIType.Normal,
                t.render = a.UIRender.Normal,
                t.startBtn = null,
                t._clickedStart = !1,
                t
            }
            return __extends(t, e),
            t.prototype.init = function() {
                this.startBtn.init({
                    showSelectLevel: !0,
                    showScore: !0,
                    score: 100,
                    selectLevelOptions: {
                        disableLevels: [3],
                        defaultLevel: 1
                    }
                }),
                this.startBtn.node.on(i.LhStartButtonEvent.start, this._onStartGame, this)
            }
            ,
            t.prototype._onStartGame = function() {
                this._clickedStart || (this._clickedStart = !0,
                n.default.instance.event(s.GameEvent.CLICK_START_BTN))
            }
            ,
            t.prototype.hide = function() {
                this._clickedStart = !1,
                e.prototype.hide.call(this)
            }
            ,
            t.uiName = "VHomeUI",
            __decorate([p(i.default)], t.prototype, "startBtn", void 0),
            t = __decorate([l], t)
        }(r.default);
        o.default = u,
        cc._RF.pop()
    }
    , {
        "../../ccc-library/common/EventManager": "EventManager",
        "../../ccc-library/scripts/components/LhStartButton": "LhStartButton",
        "../../ccc-library/scripts/ui/BaseUI": "BaseUI",
        "../../ccc-library/scripts/ui/UIManager": "UIManager",
        "../configs/GameEvent": "GameEvent"
    }],
    gameTypes: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "393b4sPtylEepQ/gmQwOHQg", "gameTypes"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        }),
        cc._RF.pop()
    }
    , {}],
    types: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5e840m6DlZIL41eauxuC5zj", "types"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        }),
        cc._RF.pop()
    }
    , {}],
    type: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "8c15cuF8ORMg7voITM+ibTT", "type"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        }),
        function(e) {
            e[e.success = 0] = "success",
            e[e.error = 1] = "error",
            e[e.info = 2] = "info",
            e[e.warning = 3] = "warning"
        }(o.MessageType || (o.MessageType = {})),
        cc._RF.pop()
    }
    , {}]
}, {}, ["AEToolAnimation", "AEToolData", "AEToolFrame", "AEToolNode", "AEToolPlayer", "AnimationMachine", "AnimationState", "NewAEToolAnimation", "NewAnimationMachine", "Base64", "BaseUtils", "EventManager", "IDE", "LocalStorageManager", "MapES5", "Sdk", "BaseConfig", "GameAbstract", "MockConfig", "MockServer", "NecessaryData", "HttpManager", "MicroGameConfig", "MicroGameConstants", "MicroGameSocket", "Pinus", "LhGameName", "LhGameResult", "LhSelectLevel", "LhStartButton", "AnimationManager", "EnterScript", "GameScript", "BaseUI", "LogoUI", "ModalUI", "PreloadUI", "UIManager", "SoundManager", "Store", "Utils", "GameEvent", "ResourceConfig", "BlockController", "BlockManager", "BlockScript", "BulletScript", "CollisionCalculation", "ElementManager", "ElementScript", "EnemyHand", "FogDebuff", "FogManager", "GameController", "GameStage", "InputManager", "MothManager", "MothScript", "Player", "PropsAddScoreEffect", "PropsController", "PropsFaceEffect", "PropsIcon", "PropsInvincibleEffect", "PropsManager", "PropsNutEffect", "PropsReliveEffect", "PropsScript", "PropsSlowdownTimeEffect", "PropsSmallerEffect", "RankInfoScript", "RankManager", "TeleportBlockManager", "TeleportBuff", "TeleportPropsManager", "gameTypes", "Block", "Game", "GameConstants", "GameData", "Props", "Result", "types", "Alert", "Confirm", "Message", "Modal", "ModalBase", "Prompt", "type", "GameUI", "HomeUI", "ResultUI", "VHomeUI"]);
