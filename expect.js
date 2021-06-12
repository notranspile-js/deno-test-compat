/*
 * Copyright 2021, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertThrows,
  equal,
} from "./deps.js";

export default function expect(actual) {
  var res = {
    to: {
      equal: function (expected) {
        assertStrictEquals(actual, expected);
      },
      eql: function (expected) {
        assertEquals(actual, expected);
      },
      have: {
        length: function (expectedlen) {
          assertEquals(actual.length, expectedlen);
        },
      },
      not: {
        be: {
          ok: function () {
            assert(!actual);
          },
          empty: function () {
            assert(actual.length > 0);
          },
        },
      },
      be: function (expected) {
        assertStrictEquals(actual, expected);
      },
      "throw": function () {
        assertThrows(actual);
      },
      deep: {},
    },

    not: {
      toBe: function (expected) {
        assert(actual !== expected);
      },

      toThrow: function () {
        actual();
      },
    },
  };

  res.to.be.ok = function () {
    assert(actual);
  };

  res.to.be.a = function (ctor) {
    if ("string" === typeof (ctor)) {
      assert(ctor === typeof (actual));
    } else {
      assert(actual instanceof ctor);
    }
  };

  res.to.be.empty = function () {
    assertEquals(actual.length, 0);
  };

  res.to.deep.equal = res.to.eql;

  res.toBe = res.to.be;

  res.toEqual = res.to.eql;

  res.toThrow = res.to.throw;

  res.toThrowError = res.to.throw;

  res.toBeTruthy = res.to.be.ok;

  res.toEqualMatch = function (arr) {
    assert(actual.length === arr.length);
    for (var i = 0; i < arr.length; i++) {
      assertEquals(actual[i], arr[i]);
    }
  };

  res.toBeNull = function () {
    assert(null === actual);
  };

  res.toBeUndefined = function () {
    assert("undefined" === typeof (actual));
  };

  res.to.be.an = {
    instanceOf: function (clazz) {
      assert(actual instanceof clazz);
    },
  };

  res.toBeGreaterThan = function (expected) {
    assert(actual > expected);
  };

  res.toBeFalsy = function () {
    assert(!actual);
  };

  res.toContain = function (subs) {
    for (var i = 0; i < arguments.length; i++) {
      var contains = false;
      for (var j = 0; j < actual.length; j++) {
        if (equal(actual[j], arguments[i])) {
          contains = true;
          break;
        }
      }
      assert(contains);
    }
  };

  return res;
}
