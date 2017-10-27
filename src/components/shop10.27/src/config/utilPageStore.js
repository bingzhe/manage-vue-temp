/*
 * 页面存储
 * QQ:15586350 [rockyshi 2014-04-02]
 */
import { Util } from './util.js';

(function (/*$*/) {
    window.Store = new function () {
        var THIS = this;
        // var sCurPage = "X" + $.md5(window.location.pathname) + "_";
        var sCurPage = window.location.pathname;

        THIS.GetPageData = function (key, defval) {
            key = "page#" + sCurPage + "#" + key;
            var val = window.localStorage.getItem(key);
            return (!Util.IsDefine(val) || null === val || "" === val) ? defval : val;
        };

        THIS.SetPageData = function (key, value) {
            key = "page#" + sCurPage + "#" + key;
            window.localStorage.setItem(key, value);
        };

        THIS.GetGlobalData = function (key, defval) {
            key = "global#" + key;
            var val = window.localStorage.getItem(key);
            return (!Util.IsDefine(val) || val === "") ? defval : val;
        };

        THIS.SetGlobalData = function (key, value) {
            key = "global#" + key;
            window.localStorage.setItem(key, value);
        };
    };
})(jQuery);