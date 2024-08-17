import React, { useRef, useState, useCallback, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var ScrollPicker = function (_a) {
    var list = _a.list, onSelectedChange = _a.onSelectedChange, _b = _a.ScrollPickerLayout, ScrollPickerLayout = _b === void 0 ? "ul" : _b, _c = _a.ScrollPickerCenter, ScrollPickerCenter = _c === void 0 ? "div" : _c, _d = _a.ScrollPickerItem, ScrollPickerItem = _d === void 0 ? "li" : _d;
    var SCROLL_DEBOUNCE_TIME = 100;
    var newList = __spreadArray(__spreadArray([""], list, true), [""], false);
    var ref = useRef(null);
    var _e = useState(1), selected = _e[0], setSelected = _e[1];
    var itemRefs = useRef([]);
    var timerRef = useRef(null);
    var ITEM_HEIGHT = 50;
    var handleScroll = useCallback(function () {
        if (ref.current) {
            clearTimeout(timerRef.current);
            if (ref.current.scrollTop < ITEM_HEIGHT) {
                ref.current.scrollTop = ITEM_HEIGHT;
            }
            timerRef.current = setTimeout(function () {
                var _a;
                var index = Math.floor((ref.current.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT);
                if (list[index] !== "") {
                    setSelected(index);
                    (_a = itemRefs.current[index]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    onSelectedChange && onSelectedChange(newList[index]);
                }
            }, SCROLL_DEBOUNCE_TIME);
        }
    }, [onSelectedChange, newList]);
    useEffect(function () {
        if (ref.current) {
            ref.current.scrollTop = selected * ITEM_HEIGHT;
        }
    }, []);
    return (React.createElement(ScrollPickerLayout, { ref: ref, onScroll: handleScroll },
        React.createElement(ScrollPickerCenter, null),
        newList.map(function (item, index) { return (React.createElement(ScrollPickerItem, { key: index, isSelected: index === selected, ref: function (el) { return (itemRefs.current[index] = el); } }, item)); })));
};

export { ScrollPicker as default };
//# sourceMappingURL=index.es.js.map
