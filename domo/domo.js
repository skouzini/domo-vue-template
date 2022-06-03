/*! For license information please see domo.js.LICENSE.txt */
!function(e, t) {
    "object"==typeof exports && "object"==typeof module ? 
        module.exports=t()
        : "function" == typeof define && define.amd ? define([],t) : "object" == typeof exports ? exports.domo=t()
        : e.domo = t()
    } (self, (function() {
        return(() => {
        "use strict";
        var e = {
            727:(e, t, r) => {
                var o = r(554), n = r(206), a = function() {
                    function e() {}
                    return e.post = function(e, t, r) {
                        return i(o.RequestMethods.POST, e, r, !0, t)
                    }, 
                    e.put = function(e, t, r) {
                        return i(o.RequestMethods.PUT, e, r, !0, t)
                    }, 
                    e.get = function(e, t) {
                        return i(o.RequestMethods.GET, e, t)
                    }, 
                    e.delete = function(e, t) {
                        return i(o.RequestMethods.DELETE, e, t)
                    }, 
                    e.getAll = function(t, r) {
                        return Promise.all(t.map((function(t) {
                            return e.get(t, r)
                        })))
                    }, e.onDataUpdate = function(e) {
                        function t(t) {
                            if(c(t.origin) && "string" == typeof t.data && t.data.length>0)
                            try{
                                var r = JSON.parse(t.data);
                                if(!r.hasOwnProperty("alias")) return;
                                var o = r.alias, n = JSON.stringify({ 
                                    event: "ack", alias: o 
                                });
                                t.source instanceof MessagePort || t.source instanceof ServiceWorker || t.source.postMessage(n,t.origin), e(o)}
                                catch(e) {
                                    console.warn("There was an error in onDataUpdate! It may be that our event listener caught a message from another source and tried to parse it, so your update still may have worked. If you would like more info, here is the error: \n",e)
                                }
                            }
                        return window.addEventListener("message",t) , function() {
                            return window.removeEventListener("message",t)
                        }
                    },
                    e.navigate = function(e,t) {
                        var r = JSON.stringify({ event:"navigate", url:e, isNewWindow:t });
                        window.parent.postMessage(r,"*")
                    },
                    e.filterContainer = function(e) {
                        var t = window.navigator.userAgent.toLowerCase(), r = /safari/.test(t), o = /iphone|ipod|ipad/.test(t), n = JSON.stringify({event:"filter", filter:e && e.map((function(e){
                            return {
                                columnName:e.column, operator:e.operator || e.operand, values:e.values, dataType:e.dataType
                            }
                        }))
                    });
                    o && !r?window.webkit.messageHandlers.domofilter.postMessage(e&&e.map((
                        function(e) {
                            return{
                                column:e.column, operand:e.operator || e.operand, values:e.values, dataType:e.dataType
                            }
                        }))):window.parent.postMessage(n,"*")
                    },
                    e.connected = !1,
                    e.listeners = { onFiltersUpdate:[] },
                    e.connect = function() {
                        e.connected || (e.connected=!0, e.channel=new MessageChannel, window.parent.postMessage(JSON.stringify({ event:"subscribe" }), "*", [e.channel.port2]))
                    },
                    e.onFiltersUpdate = function(t) {
                        e.connect();
                        var r = e.listeners.onFiltersUpdate.push(t)-1;
                        return e.channel.port1.onmessage = function(t) {
                            var r = t.ports[0];
                            void 0 !== r && "filtersUpdated" === t.data.event && e.listeners.onFiltersUpdate.length > 0 && (r.postMessage({}), e.listeners.onFiltersUpdate.forEach((function(e) {
                                return e(t.data.filters)
                            })))
                        },
                        function() {
                            e.listeners.onFiltersUpdate.splice(r,1)
                        }
                    },
                    e.env = d(), 
                    e.__util = { 
                        isVerifiedOrigin:c, getQueryParams:d, setFormatHeaders:p, isSuccess:u 
                    }, 
                    e
                } (), s=window.__RYUU_AUTHENTICATION_TOKEN__;
                function i(e,t,r,n,a) {
                    return r = r || {}, new Promise((function(i,c) {
                        var d = new XMLHttpRequest;
                        if (n?d.open(e,t,n):d.open(e,t), p(d,t,r), function(e,t) {
                            t.contentType ? 
                            "multipart" !== t.contentType && e.setRequestHeader("Content-Type", t.contentType)
                            : e.setRequestHeader("Content-Type", o.DataFormats.JSON)
                        } (d,r), function(e) {
                            s && e.setRequestHeader("X-DOMO-Ryuu-Token", s)
                        } (d), function(e,t) {
                            void 0 !== t.responseType && (e.responseType = t.responseType)
                        } (d,r), 
                        d.onload = function() {
                            var e;
                            if( u(d.status) ) {
                                !["csv","excel"].includes(r.format) && d.response || i(d.response), "blob" === r.responseType && i(new Blob([d.response], { type:d.getResponseHeader("content-type") }));
                                var t = d.response;
                                try{
                                    e = JSON.parse(t)
                                }
                                catch(e){
                                    return void c(Error("Invalid JSON response"))
                                }i(e)
                            }else c(Error(d.statusText))
                        },
                        d.onerror = function() {
                            c(Error("Network Error"))
                        }, a) 
                        if (r.contentType && r.contentType !== o.DataFormats.JSON) d.send(a);
                        else {
                            var f = JSON.stringify(a);
                            d.send(f)
                        }
                        else d.send()
                    }))
                } function u(e) {
                    return e>=200&&e<300
                } function c(e) {
                    var t = e.match( "^https?://([^/]+[.])?(domo|domotech|domorig).(com|io)?(/.*)?$" ),
                    r = e.match( "(.*).(domoapps).(.*)" );
                    return !!t && !r
                } function d() {
                    var e = location.search.substr(1), t = {};
                    return e.split("&").forEach((function(e) {
                        var r=e.split("=");t[r[0]]=decodeURIComponent(r[1])
                    })), t
                } function p(e,t,r) {
                    if (-1 !== t.indexOf("data/v")) {
                        var a = void 0 !== r.format ?
                        (0,n.domoFormatToRequestFormat)(r.format)
                        : o.DataFormats.DEFAULT;
                        e.setRequestHeader("Accept", a)
                    }
                } function f(e) {
                    if (e === document.body) return function(e) {
                        for (var t = 0; t < e.children.length; t++) f(e.children[t])
                    } (e);
                    var t , r;
                    if (e.dataset 
                        && e.dataset.domoHref?(t="href", r=e.dataset.domoHref):e.dataset 
                        && e.dataset.domoSrc?(t="src", r=e.dataset.domoSrc):e.hasAttribute 
                        && e.hasAttribute("href")?(t="href", r=e.getAttribute("href")):e.hasAttribute 
                        && e.hasAttribute("src")
                        && (t="src", r=e.getAttribute("src")), r
                        && s) {
                            var o = new URL(r,document.location.origin);
                            o.origin === document.location.origin && (o.searchParams.append("rpt", s), e.setAttribute(t, o.href))
                        }
                    }
                    var l = new MutationObserver((function(e) {
                        for( var t = 0, r=e; t < r.length; t++) r[t].addedNodes.forEach(f)}));
                        l.observe(document.documentElement, { childList:!0 }), l.observe(document.head, { childList:!0 }), e.exports=a
                    }, 
                    548:(e, t) => {
                        var r;
                        Object.defineProperty(t, "__esModule", { value:!0 }), t.DataFormats=void 0, (r=t.DataFormats || (t.DataFormats={})).DEFAULT = "application/array-of-objects", r.ARRAY_OF_OBJECTS = "application/array-of-objects", r.JSON = "application/json", r.CSV = "text/csv", r.EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", r.PLAIN = "text/plain"
                    }, 
                    64:(e,t) => {
                        var r;
                        Object.defineProperty(t, "__esModule", { value:!0 }), t.RequestMethods=void 0, (r = t.RequestMethods || (t.RequestMethods = {})).get="GET", r.GET="GET", r.post="POST", r.POST="POST", r.put="PUT", r.PUT="PUT", r.delete="DELETE", r.DELETE="DELETE"
                    },
                    554:(e,t,r) => {
                        Object.defineProperty(t, "__esModule", { value:!0 }), t.FilterDataTypes = t.DataFormats = t.RequestMethods = void 0;
                        var o = r(64);
                        Object.defineProperty(t, "RequestMethods", {
                            enumerable:!0, get:function() {
                                return o.RequestMethods
                            }
                        });
                        var n = r(548);
                        Object.defineProperty(t, "DataFormats", {
                            enumerable:!0, get:function() {
                                return n.DataFormats
                            }
                        });
                        var a = r(616);
                        Object.defineProperty(t, "FilterDataTypes", { 
                            enumerable:!0, get:function() {
                                return a.FilterDataTypes
                            }
                        })
                    },
                    616:(e, t) => {
                        var r;
                        Object.defineProperty(t, "__esModule", { value:!0 }), t.FilterDataTypes = void 0, (r = t.FilterDataTypes || (t.FilterDataTypes = {})).NUMERIC = "NUMERIC", r.DATE = "DATE", r.DATETIME = "DATETIME", r.STRING = "STRING"
                    },
                    206:(e, t, r) => {
                        Object.defineProperty(t, "__esModule", { value:!0} ), t.domoFormatToRequestFormat=void 0;
                        var o=r(554);
                        t.domoFormatToRequestFormat = function(e) {
                            switch(e) {
                                case"array-of-objects": 
                                    return o.DataFormats.ARRAY_OF_OBJECTS;
                                case"array-of-arrays": 
                                    return o.DataFormats.JSON;
                                case"excel": 
                                    return o.DataFormats.EXCEL;
                                case"csv": 
                                    return o.DataFormats.CSV;
                                default: 
                                    return o.DataFormats.DEFAULT
                            }
                        }
                    }
                },
                t = {};
                return function r(o) {
                    var n=t[o];
                    if (void 0 !== n) return n.exports;
                    var a = t[o] = {
                        exports:{}
                    };
                    return e[o](a,a.exports,r), a.exports
                }(727)
            })()
        }));
//# sourceMappingURL = data:application/json;charset=utf-8;base64,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QUdyQixJQUFJQyxFQUFTeUssRUFBeUJFLEdBQVksQ0FHakQ1SyxRQUFTLElBT1YsT0FIQThLLEVBQW9CRixHQUFVM0ssRUFBUUEsRUFBT0QsUUFBUzJLLEdBRy9DMUssRUFBT0QsUUNsQlcySyxDQUFvQixNUk85QyIsInNvdXJjZXMiOlsid2VicGFjazovL2RvbW8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RvbW8vLi9zcmMvZG9tby50cyIsIndlYnBhY2s6Ly9kb21vLy4vc3JjL21vZGVscy9lbnVtcy9kYXRhLWZvcm1hdHMudHMiLCJ3ZWJwYWNrOi8vZG9tby8uL3NyYy9tb2RlbHMvZW51bXMvcmVxdWVzdC1tZXRob2RzLnRzIiwid2VicGFjazovL2RvbW8vLi9zcmMvbW9kZWxzL2luZGV4LnRzIiwid2VicGFjazovL2RvbW8vLi9zcmMvbW9kZWxzL2ludGVyZmFjZXMvZmlsdGVyLWRhdGEtdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZG9tby8uL3NyYy91dGlscy9kYXRhLWhlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZG9tby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kb21vL3dlYnBhY2svc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJkb21vXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRvbW9cIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQge1xuICBSZXF1ZXN0TWV0aG9kcyxcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIE9iamVjdFJlcXVlc3RPcHRpb25zLFxuICBBcnJheVJlcXVlc3RPcHRpb25zLFxuICBEYXRhRm9ybWF0cyxcbiAgUXVlcnlQYXJhbXMsXG4gIEZpbHRlcixcbiAgUmVxdWVzdEJvZHksXG4gIFJlc3BvbnNlQm9keSxcbiAgT2JqZWN0UmVzcG9uc2VCb2R5LFxuICBBcnJheVJlc3BvbnNlQm9keSxcbn0gZnJvbSBcIi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBkb21vRm9ybWF0VG9SZXF1ZXN0Rm9ybWF0IH0gZnJvbSBcIi4vdXRpbHMvZGF0YS1oZWxwZXJzXCI7XG5cbmV4cG9ydCA9IGRvbW87XG5cbmNsYXNzIGRvbW8ge1xuICBzdGF0aWMgcG9zdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBib2R5PzogUmVxdWVzdEJvZHksXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zXG4gICk6IFByb21pc2U8UmVzcG9uc2VCb2R5PjtcbiAgc3RhdGljIHBvc3Q8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYm9keT86IFJlcXVlc3RCb2R5LFxuICAgIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc1xuICApOiBQcm9taXNlPFQ+O1xuICBzdGF0aWMgcG9zdDxUPihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBib2R5PzogUmVxdWVzdEJvZHksXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zXG4gICk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBkb21vSHR0cDxUPihSZXF1ZXN0TWV0aG9kcy5QT1NULCB1cmwsIG9wdGlvbnMsIHRydWUsIGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIHB1dChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBib2R5PzogUmVxdWVzdEJvZHksXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zXG4gICk6IFByb21pc2U8UmVzcG9uc2VCb2R5PjtcbiAgc3RhdGljIHB1dDxUPihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBib2R5PzogUmVxdWVzdEJvZHksXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zXG4gICk6IFByb21pc2U8VD47XG4gIHN0YXRpYyBwdXQ8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYm9keT86IFJlcXVlc3RCb2R5LFxuICAgIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc1xuICApOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gZG9tb0h0dHA8VD4oUmVxdWVzdE1ldGhvZHMuUFVULCB1cmwsIG9wdGlvbnMsIHRydWUsIGJvZHkpO1xuICB9XG5cbiAgc3RhdGljIGdldChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zOiBPYmplY3RSZXF1ZXN0T3B0aW9uc1xuICApOiBQcm9taXNlPE9iamVjdFJlc3BvbnNlQm9keVtdPjtcbiAgc3RhdGljIGdldChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zOiBBcnJheVJlcXVlc3RPcHRpb25zXG4gICk6IFByb21pc2U8QXJyYXlSZXNwb25zZUJvZHk+O1xuICBzdGF0aWMgZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlQm9keT47XG4gIHN0YXRpYyBnZXQ8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8VD47XG4gIHN0YXRpYyBnZXQ8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBkb21vSHR0cDxUPihSZXF1ZXN0TWV0aG9kcy5HRVQsIHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlKHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlQm9keT47XG4gIHN0YXRpYyBkZWxldGU8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8VD47XG4gIHN0YXRpYyBkZWxldGU8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBkb21vSHR0cDxUPihSZXF1ZXN0TWV0aG9kcy5ERUxFVEUsIHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWxsKFxuICAgIHVybHM6IHN0cmluZ1tdLFxuICAgIG9wdGlvbnM6IE9iamVjdFJlcXVlc3RPcHRpb25zXG4gICk6IFByb21pc2U8T2JqZWN0UmVzcG9uc2VCb2R5W11bXT47XG4gIHN0YXRpYyBnZXRBbGwoXG4gICAgdXJsczogc3RyaW5nW10sXG4gICAgb3B0aW9uczogQXJyYXlSZXF1ZXN0T3B0aW9uc1xuICApOiBQcm9taXNlPEFycmF5UmVzcG9uc2VCb2R5W10+O1xuICBzdGF0aWMgZ2V0QWxsKFxuICAgIHVybHM6IHN0cmluZ1tdLFxuICAgIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc1xuICApOiBQcm9taXNlPFJlc3BvbnNlQm9keVtdPjtcbiAgc3RhdGljIGdldEFsbDxUPih1cmxzOiBzdHJpbmdbXSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxUW10+O1xuICBzdGF0aWMgZ2V0QWxsPFQ+KHVybHM6IHN0cmluZ1tdLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFRbXT4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIHVybHMubWFwKGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIGRvbW8uZ2V0PFQ+KHVybCwgb3B0aW9ucyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBkb21vYXBwIG9wdGlvbmFsbHkgaGFuZGxlIGl0cyBvd24gZGF0YSB1cGRhdGVzLlxuICAgKi9cbiAgc3RhdGljIG9uRGF0YVVwZGF0ZShjYjogKGFsaWFzOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICBmdW5jdGlvbiBpbm5lckNhbGxiYWNrKGV2ZW50OiBNZXNzYWdlRXZlbnQpIHtcbiAgICAgIGlmICghaXNWZXJpZmllZE9yaWdpbihldmVudC5vcmlnaW4pKSByZXR1cm47XG5cbiAgICAgIGlmICh0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJiBldmVudC5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhbGlhc1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGFsaWFzID0gbWVzc2FnZS5hbGlhcztcblxuICAgICAgICAgIC8vIHNlbmQgYWNrbm93bGVkZ2VtZW50IHRvIHByZXZlbnQgYXV0b3JlZnJlc2hcbiAgICAgICAgICBjb25zdCBhY2sgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBldmVudDogXCJhY2tcIixcbiAgICAgICAgICAgIGFsaWFzOiBhbGlhcyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIE9ubHkgV2luZG93UHJveHkgfCBXaW5kb3cgaGF2ZSB0aGUgcG9zdE1lc3NhZ2UgbWV0aG9kIGFuZCB0aGUgdHlwZSBvZiBldmVudC5zb3VyY2UgdmFyaWVzIGJldHdlZW4gYnJvd3NlcnNcbiAgICAgICAgICBpZiAoIShldmVudC5zb3VyY2UgaW5zdGFuY2VvZiBNZXNzYWdlUG9ydCkgJiYgIShldmVudC5zb3VyY2UgaW5zdGFuY2VvZiBTZXJ2aWNlV29ya2VyKSkge1xuICAgICAgICAgICAgZXZlbnQuc291cmNlLnBvc3RNZXNzYWdlKGFjaywgZXZlbnQub3JpZ2luKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbmZvcm0gZG9tbyBhcHAgd2hpY2ggYWxpYXMgaGFzIGJlZW4gdXBkYXRlZFxuICAgICAgICAgIGNiKGFsaWFzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc3QgaW5mbyA9XG4gICAgICAgICAgICBcIlRoZXJlIHdhcyBhbiBlcnJvciBpbiBvbkRhdGFVcGRhdGUhIEl0IG1heSBiZSB0aGF0IG91ciBldmVudCBsaXN0ZW5lciBjYXVnaHQgXCIgK1xuICAgICAgICAgICAgXCJhIG1lc3NhZ2UgZnJvbSBhbm90aGVyIHNvdXJjZSBhbmQgdHJpZWQgdG8gcGFyc2UgaXQsIHNvIHlvdXIgdXBkYXRlIHN0aWxsIG1heSBoYXZlIHdvcmtlZC4gXCIgK1xuICAgICAgICAgICAgXCJJZiB5b3Ugd291bGQgbGlrZSBtb3JlIGluZm8sIGhlcmUgaXMgdGhlIGVycm9yOiBcXG5cIjtcbiAgICAgICAgICBjb25zb2xlLndhcm4oaW5mbywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaW5uZXJDYWxsYmFjayk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBpbm5lckNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIGRvbW9hcHAgb3B0aW9uYWxseSBoYW5kbGUgb3RoZXIgZXZlbnRzXG4gICAqL1xuICBzdGF0aWMgY2hhbm5lbD86IE1lc3NhZ2VDaGFubmVsO1xuICBzdGF0aWMgY29ubmVjdGVkID0gZmFsc2U7XG4gIHN0YXRpYyBsaXN0ZW5lcnM6IHsgW2luZGV4OiBzdHJpbmddOiBGdW5jdGlvbltdIH0gPSB7XG4gICAgb25GaWx0ZXJzVXBkYXRlOiBbXSxcbiAgfTtcblxuICBzdGF0aWMgY29ubmVjdCA9ICgpID0+IHtcbiAgICBpZiAoZG9tby5jb25uZWN0ZWQpIHJldHVybjtcbiAgICBkb21vLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgZG9tby5jaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7IGV2ZW50OiBcInN1YnNjcmliZVwiIH0pLCBcIipcIiwgW1xuICAgICAgZG9tby5jaGFubmVsLnBvcnQyLFxuICAgIF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMZXQgdGhlIGRvbW9hcHAgaGFuZGxlIGl0cyBvd24gZmlsdGVyIHVwZGF0ZXNcbiAgICovXG4gIHN0YXRpYyBvbkZpbHRlcnNVcGRhdGUgPSAoY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB7XG4gICAgZG9tby5jb25uZWN0KCk7XG4gICAgY29uc3QgaW5kZXggPSBkb21vLmxpc3RlbmVycy5vbkZpbHRlcnNVcGRhdGUucHVzaChjYWxsYmFjaykgLSAxO1xuXG4gICAgZG9tby5jaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IFtyZXNwb25zZVBvcnRdID0gZS5wb3J0cztcbiAgICAgIGlmIChyZXNwb25zZVBvcnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGUuZGF0YS5ldmVudCA9PT0gXCJmaWx0ZXJzVXBkYXRlZFwiICYmXG4gICAgICAgIGRvbW8ubGlzdGVuZXJzLm9uRmlsdGVyc1VwZGF0ZS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgcmVzcG9uc2VQb3J0LnBvc3RNZXNzYWdlKHt9KTsgLy8gUHJldmVudHMgdGhlIGFwcCBmcm9tIHJlbG9hZGluZy4gU2F5cyB3ZSd2ZSBoYW5kbGVkIGl0XG4gICAgICAgIGRvbW8ubGlzdGVuZXJzLm9uRmlsdGVyc1VwZGF0ZS5mb3JFYWNoKChjYikgPT4gY2IoZS5kYXRhLmZpbHRlcnMpKTsgLy8gPC0gc3BsaXQgb3V0IG9uRmlsdGVyc1VwZGF0ZSBzbyB0aGF0IHlvdSBjYW4gaGFuZGxlIGVhY2ggbWVzc2FnZSBkaWZmZXJlbnRseSBoZXJlXG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHVucmVnaXN0ZXJcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9tby5saXN0ZW5lcnMub25GaWx0ZXJzVXBkYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogUmVxdWVzdCBhIG5hdmlnYXRpb24gY2hhbmdlXG4gICAqL1xuICBzdGF0aWMgbmF2aWdhdGUodXJsOiBzdHJpbmcsIGlzTmV3V2luZG93OiBib29sZWFuKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGV2ZW50OiBcIm5hdmlnYXRlXCIsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGlzTmV3V2luZG93OiBpc05ld1dpbmRvdyxcbiAgICB9KTtcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWx0ZXJDb250YWluZXIoZmlsdGVyczogRmlsdGVyW10gfCBudWxsKTogdm9pZCB7XG4gICAgY29uc3QgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxcbiAgICAgIHNhZmFyaSA9IC9zYWZhcmkvLnRlc3QodXNlckFnZW50KSxcbiAgICAgIGlvcyA9IC9pcGhvbmV8aXBvZHxpcGFkLy50ZXN0KHVzZXJBZ2VudCk7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgZXZlbnQ6IFwiZmlsdGVyXCIsXG4gICAgICBmaWx0ZXI6IGZpbHRlcnMgJiYgZmlsdGVycy5tYXAoKGZpbHRlcikgPT4gKHtcbiAgICAgICAgY29sdW1uTmFtZTogZmlsdGVyLmNvbHVtbixcbiAgICAgICAgb3BlcmF0b3I6IGZpbHRlci5vcGVyYXRvciB8fCAoZmlsdGVyIGFzIGFueSkub3BlcmFuZCwgLy8gTW9zdCBmaWx0ZXIgY29kZSAoaW5jbHVkaW5nIFBob2VuaXgpIHN0aWxsIHVzZXMgXCJvcGVyYW5kXCIgaW5zdGVhZCBvZiBcIm9wZXJhdG9yXCJcbiAgICAgICAgdmFsdWVzOiBmaWx0ZXIudmFsdWVzLFxuICAgICAgICBkYXRhVHlwZTogZmlsdGVyLmRhdGFUeXBlLFxuICAgICAgfSkpLFxuICAgIH0pO1xuXG4gICAgaWYgKGlvcyAmJiAhc2FmYXJpKSB7XG4gICAgICAod2luZG93IGFzIGFueSkud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5kb21vZmlsdGVyLnBvc3RNZXNzYWdlKFxuICAgICAgICBmaWx0ZXJzICYmIGZpbHRlcnMubWFwKChmaWx0ZXIpID0+ICh7XG4gICAgICAgICAgY29sdW1uOiBmaWx0ZXIuY29sdW1uLFxuICAgICAgICAgIG9wZXJhbmQ6IGZpbHRlci5vcGVyYXRvciB8fCAoZmlsdGVyIGFzIGFueSkub3BlcmFuZCxcbiAgICAgICAgICB2YWx1ZXM6IGZpbHRlci52YWx1ZXMsXG4gICAgICAgICAgZGF0YVR5cGU6IGZpbHRlci5kYXRhVHlwZSxcbiAgICAgICAgfSkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZW52ID0gZ2V0UXVlcnlQYXJhbXMoKTtcblxuICBzdGF0aWMgX191dGlsID0ge1xuICAgIGlzVmVyaWZpZWRPcmlnaW4sXG4gICAgZ2V0UXVlcnlQYXJhbXMsXG4gICAgc2V0Rm9ybWF0SGVhZGVycyxcbiAgICBpc1N1Y2Nlc3MsXG4gIH07XG59XG5cbmNvbnN0IHRva2VuID0gKHdpbmRvdyBhcyBhbnkpLl9fUllVVV9BVVRIRU5USUNBVElPTl9UT0tFTl9fO1xuXG5mdW5jdGlvbiBkb21vSHR0cChcbiAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kcyxcbiAgdXJsOiBzdHJpbmcsXG4gIG9wdGlvbnM6IE9iamVjdFJlcXVlc3RPcHRpb25zLFxuICBhc3luYz86IGJvb2xlYW4sXG4gIGJvZHk/OiBSZXF1ZXN0Qm9keVxuKTogUHJvbWlzZTxPYmplY3RSZXNwb25zZUJvZHlbXT47XG5mdW5jdGlvbiBkb21vSHR0cChcbiAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kcyxcbiAgdXJsOiBzdHJpbmcsXG4gIG9wdGlvbnM6IEFycmF5UmVxdWVzdE9wdGlvbnMsXG4gIGFzeW5jPzogYm9vbGVhbixcbiAgYm9keT86IFJlcXVlc3RCb2R5XG4pOiBQcm9taXNlPEFycmF5UmVzcG9uc2VCb2R5PjtcbmZ1bmN0aW9uIGRvbW9IdHRwKFxuICBtZXRob2Q6IFJlcXVlc3RNZXRob2RzLFxuICB1cmw6IHN0cmluZyxcbiAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gIGFzeW5jPzogYm9vbGVhbixcbiAgYm9keT86IFJlcXVlc3RCb2R5XG4pOiBQcm9taXNlPFJlc3BvbnNlQm9keT47XG5mdW5jdGlvbiBkb21vSHR0cDxUPihcbiAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kcyxcbiAgdXJsOiBzdHJpbmcsXG4gIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLFxuICBhc3luYz86IGJvb2xlYW4sXG4gIGJvZHk/OiBSZXF1ZXN0Qm9keVxuKTogUHJvbWlzZTxUPjtcbmZ1bmN0aW9uIGRvbW9IdHRwKFxuICBtZXRob2Q6IFJlcXVlc3RNZXRob2RzLFxuICB1cmw6IHN0cmluZyxcbiAgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMsXG4gIGFzeW5jPzogYm9vbGVhbixcbiAgYm9keT86IFJlcXVlc3RCb2R5XG4pOiBQcm9taXNlPFJlc3BvbnNlQm9keT4ge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChcbiAgICByZXNvbHZlOiAodmFsdWU/OiBSZXNwb25zZUJvZHkpID0+IHZvaWQsXG4gICAgcmVqZWN0OiAocmVhc29uPzogRXJyb3IpID0+IHZvaWRcbiAgKSB7XG4gICAgLy8gRG8gdGhlIHVzdWFsIFhIUiBzdHVmZlxuICAgIGxldCByZXE6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICByZXEub3BlbihtZXRob2QsIHVybCwgYXN5bmMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEub3BlbihtZXRob2QsIHVybCk7XG4gICAgfVxuICAgIHNldEZvcm1hdEhlYWRlcnMocmVxLCB1cmwsIG9wdGlvbnMpO1xuICAgIHNldENvbnRlbnRIZWFkZXJzKHJlcSwgb3B0aW9ucyk7XG4gICAgc2V0QXV0aFRva2VuSGVhZGVyKHJlcSk7XG4gICAgc2V0UmVzcG9uc2VUeXBlKHJlcSwgb3B0aW9ucyk7XG5cbiAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRhdGE7XG4gICAgICAvLyBUaGlzIGlzIGNhbGxlZCBldmVuIG9uIDQwNCBldGMgc28gY2hlY2sgdGhlIHN0YXR1c1xuICAgICAgaWYgKGlzU3VjY2VzcyhyZXEuc3RhdHVzKSkge1xuICAgICAgICBpZiAoW1wiY3N2XCIsIFwiZXhjZWxcIl0uaW5jbHVkZXMob3B0aW9ucy5mb3JtYXQpIHx8ICFyZXEucmVzcG9uc2UpIHtcbiAgICAgICAgICByZXNvbHZlKHJlcS5yZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucmVzcG9uc2VUeXBlID09PSBcImJsb2JcIikge1xuICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICBuZXcgQmxvYihbcmVxLnJlc3BvbnNlXSwge1xuICAgICAgICAgICAgICB0eXBlOiByZXEuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIiksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VTdHIgPSByZXEucmVzcG9uc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gaWYoIXJlc3BvbnNlU3RyKSB7XG4gICAgICAgICAgLy8gICByZXNwb25zZVN0ciA9IFwie31cIjtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2VTdHIpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHJlamVjdChFcnJvcihcIkludmFsaWQgSlNPTiByZXNwb25zZVwiKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCB0aGUgcmVzcG9uc2UgdGV4dFxuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJlamVjdCB3aXRoIHRoZSBzdGF0dXMgdGV4dFxuICAgICAgICAvLyB3aGljaCB3aWxsIGhvcGVmdWxseSBiZSBhIG1lYW5pbmdmdWwgZXJyb3JcbiAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0KSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBuZXR3b3JrIGVycm9yc1xuICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgfTtcblxuICAgIC8vIE1ha2UgdGhlIHJlcXVlc3RcbiAgICBpZiAoYm9keSkge1xuICAgICAgaWYgKCFvcHRpb25zLmNvbnRlbnRUeXBlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgPT09IERhdGFGb3JtYXRzLkpTT04pIHtcbiAgICAgICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgICAvLyBNYWtlIHRoZSByZXF1ZXN0XG4gICAgICAgIHJlcS5zZW5kKGpzb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYm9keSBjYW4gbm8gbG9uZ2VyIGJlIEpTT05cbiAgICAgICAgcmVxLnNlbmQoYm9keSBhcyBEb2N1bWVudCB8IFhNTEh0dHBSZXF1ZXN0Qm9keUluaXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXEuc2VuZCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzU3VjY2VzcyhzdGF0dXM6IG51bWJlcikge1xuICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG59XG5cbmZ1bmN0aW9uIGlzVmVyaWZpZWRPcmlnaW4ob3JpZ2luOiBzdHJpbmcpIHtcbiAgY29uc3Qgd2hpdGVsaXN0ZWQgPSBvcmlnaW4ubWF0Y2goXG4gICAgXCJeaHR0cHM/Oi8vKFteL10rWy5dKT8oZG9tb3xkb21vdGVjaHxkb21vcmlnKS4oY29tfGlvKT8oLy4qKT8kXCJcbiAgKTtcbiAgY29uc3QgYmxhY2tsaXN0ZWQgPSBvcmlnaW4ubWF0Y2goXCIoLiopLihkb21vYXBwcykuKC4qKVwiKTtcbiAgcmV0dXJuICEhd2hpdGVsaXN0ZWQgJiYgIWJsYWNrbGlzdGVkO1xufVxuXG5mdW5jdGlvbiBnZXRRdWVyeVBhcmFtcygpOiBRdWVyeVBhcmFtcyB7XG4gIGNvbnN0IHF1ZXJ5ID0gbG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKTtcbiAgbGV0IHJlc3VsdDogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIHF1ZXJ5LnNwbGl0KFwiJlwiKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgY29uc3QgaXRlbSA9IHBhcnQuc3BsaXQoXCI9XCIpO1xuICAgIHJlc3VsdFtpdGVtWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChpdGVtWzFdKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHNldEZvcm1hdEhlYWRlcnMoXG4gIHJlcTogWE1MSHR0cFJlcXVlc3QsXG4gIHVybDogc3RyaW5nLFxuICBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNcbikge1xuICBpZiAodXJsLmluZGV4T2YoXCJkYXRhL3ZcIikgPT09IC0xKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBmb3JtYXRcbiAgY29uc3QgcmVxdWVzdEZvcm1hdDogRGF0YUZvcm1hdHMgPVxuICAgIG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWRcbiAgICAgID8gZG9tb0Zvcm1hdFRvUmVxdWVzdEZvcm1hdChvcHRpb25zLmZvcm1hdClcbiAgICAgIDogRGF0YUZvcm1hdHMuREVGQVVMVDtcblxuICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCByZXF1ZXN0Rm9ybWF0KTtcbn1cblxuZnVuY3Rpb24gc2V0Q29udGVudEhlYWRlcnMocmVxOiBYTUxIdHRwUmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLmNvbnRlbnRUeXBlKSB7XG4gICAgLy8gc2V0IGNvbnRlbnQgdHlwZSBpZiB1c2VyIHBhc3NlZCBvcHRpb25cbiAgICBpZiAob3B0aW9ucy5jb250ZW50VHlwZSAhPT0gXCJtdWx0aXBhcnRcIikge1xuICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgb3B0aW9ucy5jb250ZW50VHlwZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIERhdGFGb3JtYXRzLkpTT04pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEF1dGhUb2tlbkhlYWRlcihyZXE6IFhNTEh0dHBSZXF1ZXN0KSB7XG4gIGlmICh0b2tlbikge1xuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdYLURPTU8tUnl1dS1Ub2tlbicsIHRva2VuKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHNldFJlc3BvbnNlVHlwZShyZXE6IFhNTEh0dHBSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMpIHtcbiAgLy9zZXQgcmVzcG9uc2UgdHlwZSBpZiB1c2VyIHBhc3NlZCBvcHRpb25cbiAgaWYgKG9wdGlvbnMucmVzcG9uc2VUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXEucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTm9kZShub2RlOiBIVE1MRWxlbWVudCl7XG4gIGlmIChub2RlID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIHByb2Nlc3NCb2R5KG5vZGUpO1xuICB9XG4gIGxldCBhdHRyO1xuICBsZXQgdXJsO1xuICBpZiAobm9kZS5kYXRhc2V0ICYmIG5vZGUuZGF0YXNldC5kb21vSHJlZikge1xuICAgIGF0dHIgPSAnaHJlZic7XG4gICAgdXJsID0gbm9kZS5kYXRhc2V0LmRvbW9IcmVmO1xuICB9IGVsc2UgaWYgKG5vZGUuZGF0YXNldCAmJiBub2RlLmRhdGFzZXQuZG9tb1NyYykge1xuICAgIGF0dHIgPSAnc3JjJztcbiAgICB1cmwgPSBub2RlLmRhdGFzZXQuZG9tb1NyYztcbiAgfSBlbHNlIGlmIChub2RlLmhhc0F0dHJpYnV0ZSAmJiBub2RlLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSB7XG4gICAgYXR0ciA9ICdocmVmJztcbiAgICB1cmwgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICB9IGVsc2UgaWYgKG5vZGUuaGFzQXR0cmlidXRlICYmIG5vZGUuaGFzQXR0cmlidXRlKCdzcmMnKSkge1xuICAgIGF0dHIgPSAnc3JjJztcbiAgICB1cmwgPSBub2RlLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gIH1cblxuICBpZiAodXJsICYmIHRva2VuKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh1cmwsIGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgY29uc3QgaXNSZWxhdGl2ZVVybCA9IChuZXdVcmwpLm9yaWdpbiA9PT0gZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuICAgIGlmIChpc1JlbGF0aXZlVXJsKSB7XG4gICAgICBuZXdVcmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgncnB0JywgdG9rZW4pO1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3VXJsLmhyZWYpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gcHJvY2Vzc0JvZHkobm9kZTogRWxlbWVudCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBoYW5kbGVOb2RlKDxIVE1MRWxlbWVudD5ub2RlLmNoaWxkcmVuW2ldKTtcbiAgfVxufVxuXG5jb25zdCBvYiA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgZm9yIChjb25zdCByZWNvcmQgb2YgbXV0YXRpb25zKSB7XG4gICAgcmVjb3JkLmFkZGVkTm9kZXMuZm9yRWFjaChoYW5kbGVOb2RlKTtcbiAgfVxufSk7XG5vYi5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG5vYi5vYnNlcnZlKGRvY3VtZW50LmhlYWQsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuIiwiLyoqXG4gKiBTdXBwb3J0ZWQgYGFjY2VwdGAgaGVhZGVycyBmb3IgY29udHJvbGxpbmcgdGhlIGZvcm1hdFxuICogb2YgdGhlIGRhdGEgcmV0dXJuZWQgZnJvbSBEb21vLlxuICpcbiAqIFNlZSBbZGV2ZWxvcGVyLmRvbW8uY29tXShodHRwczovL2RldmVsb3Blci5kb21vLmNvbS9kb2NzL2Rldi1zdHVkaW8tcmVmZXJlbmNlcy9kYXRhLWFwaSNEYXRhJTIwRm9ybWF0cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbmV4cG9ydCBlbnVtIERhdGFGb3JtYXRzIHtcbiAgREVGQVVMVCA9ICdhcHBsaWNhdGlvbi9hcnJheS1vZi1vYmplY3RzJyxcbiAgQVJSQVlfT0ZfT0JKRUNUUyA9ICdhcHBsaWNhdGlvbi9hcnJheS1vZi1vYmplY3RzJyxcbiAgSlNPTiA9ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgQ1NWID0gJ3RleHQvY3N2JyxcbiAgRVhDRUwgPSAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuICBQTEFJTiA9ICd0ZXh0L3BsYWluJ1xufSIsImV4cG9ydCBlbnVtIFJlcXVlc3RNZXRob2RzIHtcbiAgZ2V0ID0gJ0dFVCcsXG4gIEdFVCA9ICdHRVQnLFxuICBwb3N0ID0gJ1BPU1QnLFxuICBQT1NUID0gJ1BPU1QnLFxuICBwdXQgPSAnUFVUJyxcbiAgUFVUID0gJ1BVVCcsXG4gIGRlbGV0ZSA9ICdERUxFVEUnLFxuICBERUxFVEUgPSAnREVMRVRFJyxcbn1cbiIsImV4cG9ydCB7IFJlcXVlc3RNZXRob2RzIH0gZnJvbSAnLi9lbnVtcy9yZXF1ZXN0LW1ldGhvZHMnO1xuZXhwb3J0IHsgRG9tb0RhdGFGb3JtYXRzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2RvbW8tZGF0YS1mb3JtYXRzJztcbmV4cG9ydCB7IERhdGFGb3JtYXRzIH0gZnJvbSAnLi9lbnVtcy9kYXRhLWZvcm1hdHMnO1xuZXhwb3J0IHsgRmlsdGVyRGF0YVR5cGVzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbHRlci1kYXRhLXR5cGVzJztcbmV4cG9ydCB7IEZpbHRlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWx0ZXInO1xuXG5leHBvcnQgeyBSZXF1ZXN0T3B0aW9ucywgT2JqZWN0UmVxdWVzdE9wdGlvbnMsIEFycmF5UmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvcmVxdWVzdC1vcHRpb25zJztcbmV4cG9ydCB7IFF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3F1ZXJ5LXBhcmFtcyc7XG5leHBvcnQgeyBSZXF1ZXN0Qm9keSB9IGZyb20gJy4vaW50ZXJmYWNlcy9yZXF1ZXN0LWJvZHknO1xuZXhwb3J0IHsgUmVzcG9uc2VCb2R5LCBPYmplY3RSZXNwb25zZUJvZHksIEFycmF5UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLWJvZHknO1xuZXhwb3J0IHsgSnNvbiB9IGZyb20gJy4vaW50ZXJmYWNlcy9qc29uJztcbiIsImV4cG9ydCBlbnVtIEZpbHRlckRhdGFUeXBlc3tcbiAgTlVNRVJJQyA9IFwiTlVNRVJJQ1wiLFxuICBEQVRFID0gXCJEQVRFXCIsXG4gIERBVEVUSU1FID0gXCJEQVRFVElNRVwiLFxuICBTVFJJTkcgPSBcIlNUUklOR1wiLFxufVxuIiwiaW1wb3J0IHsgRG9tb0RhdGFGb3JtYXRzLCBEYXRhRm9ybWF0cyB9IGZyb20gJy4uL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21vRm9ybWF0VG9SZXF1ZXN0Rm9ybWF0KGZvcm1hdDogRG9tb0RhdGFGb3JtYXRzKTogRGF0YUZvcm1hdHMge1xuICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgIGNhc2UgJ2FycmF5LW9mLW9iamVjdHMnOiB7XG4gICAgICByZXR1cm4gRGF0YUZvcm1hdHMuQVJSQVlfT0ZfT0JKRUNUUztcbiAgICB9XG4gICAgY2FzZSAnYXJyYXktb2YtYXJyYXlzJzoge1xuICAgICAgcmV0dXJuIERhdGFGb3JtYXRzLkpTT047XG4gICAgfVxuICAgIGNhc2UgJ2V4Y2VsJzoge1xuICAgICAgcmV0dXJuIERhdGFGb3JtYXRzLkVYQ0VMO1xuICAgIH1cbiAgICBjYXNlICdjc3YnOiB7XG4gICAgICByZXR1cm4gRGF0YUZvcm1hdHMuQ1NWO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gRGF0YUZvcm1hdHMuREVGQVVMVDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNzI3KTtcbiJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJzZWxmIiwicG9zdCIsInVybCIsImJvZHkiLCJvcHRpb25zIiwiZG9tb0h0dHAiLCJSZXF1ZXN0TWV0aG9kcyIsIlBPU1QiLCJwdXQiLCJQVVQiLCJnZXQiLCJHRVQiLCJkZWxldGUiLCJERUxFVEUiLCJnZXRBbGwiLCJ1cmxzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImRvbW8iLCJvbkRhdGFVcGRhdGUiLCJjYiIsImlubmVyQ2FsbGJhY2siLCJldmVudCIsImlzVmVyaWZpZWRPcmlnaW4iLCJvcmlnaW4iLCJkYXRhIiwibGVuZ3RoIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsImhhc093blByb3BlcnR5IiwiYWxpYXMiLCJhY2siLCJzdHJpbmdpZnkiLCJzb3VyY2UiLCJNZXNzYWdlUG9ydCIsIlNlcnZpY2VXb3JrZXIiLCJwb3N0TWVzc2FnZSIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJuYXZpZ2F0ZSIsImlzTmV3V2luZG93IiwicGFyZW50IiwiZmlsdGVyQ29udGFpbmVyIiwiZmlsdGVycyIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsInRvTG93ZXJDYXNlIiwic2FmYXJpIiwidGVzdCIsImlvcyIsImZpbHRlciIsImNvbHVtbk5hbWUiLCJjb2x1bW4iLCJvcGVyYXRvciIsIm9wZXJhbmQiLCJ2YWx1ZXMiLCJkYXRhVHlwZSIsIndlYmtpdCIsIm1lc3NhZ2VIYW5kbGVycyIsImRvbW9maWx0ZXIiLCJjb25uZWN0ZWQiLCJsaXN0ZW5lcnMiLCJvbkZpbHRlcnNVcGRhdGUiLCJjb25uZWN0IiwiY2hhbm5lbCIsIk1lc3NhZ2VDaGFubmVsIiwicG9ydDIiLCJjYWxsYmFjayIsImluZGV4IiwicHVzaCIsInBvcnQxIiwib25tZXNzYWdlIiwiZSIsInJlc3BvbnNlUG9ydCIsInBvcnRzIiwidW5kZWZpbmVkIiwiZm9yRWFjaCIsInNwbGljZSIsImVudiIsImdldFF1ZXJ5UGFyYW1zIiwiX191dGlsIiwic2V0Rm9ybWF0SGVhZGVycyIsImlzU3VjY2VzcyIsInRva2VuIiwiX19SWVVVX0FVVEhFTlRJQ0FUSU9OX1RPS0VOX18iLCJtZXRob2QiLCJhc3luYyIsInJlc29sdmUiLCJyZWplY3QiLCJyZXEiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJjb250ZW50VHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJEYXRhRm9ybWF0cyIsInNldENvbnRlbnRIZWFkZXJzIiwic2V0QXV0aFRva2VuSGVhZGVyIiwicmVzcG9uc2VUeXBlIiwic2V0UmVzcG9uc2VUeXBlIiwib25sb2FkIiwic3RhdHVzIiwiaW5jbHVkZXMiLCJmb3JtYXQiLCJyZXNwb25zZSIsIkJsb2IiLCJ0eXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJyZXNwb25zZVN0ciIsImV4IiwiRXJyb3IiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsInNlbmQiLCJqc29uIiwid2hpdGVsaXN0ZWQiLCJtYXRjaCIsImJsYWNrbGlzdGVkIiwicXVlcnkiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInJlc3VsdCIsInNwbGl0IiwicGFydCIsIml0ZW0iLCJkZWNvZGVVUklDb21wb25lbnQiLCJpbmRleE9mIiwicmVxdWVzdEZvcm1hdCIsImRvbW9Gb3JtYXRUb1JlcXVlc3RGb3JtYXQiLCJERUZBVUxUIiwiaGFuZGxlTm9kZSIsIm5vZGUiLCJkb2N1bWVudCIsImkiLCJjaGlsZHJlbiIsInByb2Nlc3NCb2R5IiwiYXR0ciIsImRhdGFzZXQiLCJkb21vSHJlZiIsImRvbW9TcmMiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJuZXdVcmwiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJhcHBlbmQiLCJzZXRBdHRyaWJ1dGUiLCJocmVmIiwib2IiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwiYWRkZWROb2RlcyIsIm9ic2VydmUiLCJkb2N1bWVudEVsZW1lbnQiLCJjaGlsZExpc3QiLCJoZWFkIiwiRmlsdGVyRGF0YVR5cGVzIiwiQVJSQVlfT0ZfT0JKRUNUUyIsIkVYQ0VMIiwiQ1NWIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwiX193ZWJwYWNrX21vZHVsZXNfXyJdLCJzb3VyY2VSb290IjoiIn0=