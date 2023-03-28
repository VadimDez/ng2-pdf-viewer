/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2022 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */
"use strict";

var _test_utils = require("./test_utils.js");

var _event_utils = require("../../web/event_utils.js");

var _api = require("../../display/api.js");

var _is_node = require("../../shared/is_node.js");

var _pdf_find_controller = require("../../web/pdf_find_controller.js");

var _pdf_link_service = require("../../web/pdf_link_service.js");

const tracemonkeyFileName = "tracemonkey.pdf";

class MockLinkService extends _pdf_link_service.SimpleLinkService {
  constructor() {
    super();
    this._page = 1;
    this._pdfDocument = null;
  }

  setDocument(pdfDocument) {
    this._pdfDocument = pdfDocument;
  }

  get pagesCount() {
    return this._pdfDocument.numPages;
  }

  get page() {
    return this._page;
  }

  set page(value) {
    this._page = value;
  }

}

async function initPdfFindController(filename) {
  const loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename || tracemonkeyFileName));
  const pdfDocument = await loadingTask.promise;
  const eventBus = new _event_utils.EventBus();
  const linkService = new MockLinkService();
  linkService.setDocument(pdfDocument);
  const pdfFindController = new _pdf_find_controller.PDFFindController({
    linkService,
    eventBus
  });
  pdfFindController.setDocument(pdfDocument);
  return {
    eventBus,
    pdfFindController
  };
}

function testSearch({
  eventBus,
  pdfFindController,
  state,
  matchesPerPage,
  selectedMatch,
  pageMatches = null,
  pageMatchesLength = null
}) {
  return new Promise(function (resolve) {
    const eventState = Object.assign(Object.create(null), {
      source: this,
      type: "",
      query: null,
      caseSensitive: false,
      entireWord: false,
      phraseSearch: true,
      findPrevious: false,
      matchDiacritics: false
    }, state);
    eventBus.dispatch("find", eventState);
    let totalPages = matchesPerPage.length;

    for (let i = totalPages - 1; i >= 0; i--) {
      if (matchesPerPage[i] > 0) {
        totalPages = i + 1;
        break;
      }
    }

    const totalMatches = matchesPerPage.reduce((a, b) => {
      return a + b;
    });
    eventBus.on("updatefindmatchescount", function onUpdateFindMatchesCount(evt) {
      if (pdfFindController.pageMatches.length !== totalPages) {
        return;
      }

      eventBus.off("updatefindmatchescount", onUpdateFindMatchesCount);
      expect(evt.matchesCount.total).toBe(totalMatches);

      for (let i = 0; i < totalPages; i++) {
        expect(pdfFindController.pageMatches[i].length).toEqual(matchesPerPage[i]);
      }

      expect(pdfFindController.selected.pageIdx).toEqual(selectedMatch.pageIndex);
      expect(pdfFindController.selected.matchIdx).toEqual(selectedMatch.matchIndex);

      if (pageMatches) {
        expect(pdfFindController.pageMatches).toEqual(pageMatches);
        expect(pdfFindController.pageMatchesLength).toEqual(pageMatchesLength);
      }

      resolve();
    });
  });
}

describe("pdf_find_controller", function () {
  it("performs a normal search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "Dynamic"
      },
      matchesPerPage: [11, 5, 0, 3, 0, 0, 0, 1, 1, 1, 0, 3, 4, 4],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      }
    });
  });
  it("performs a normal search and finds the previous result", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "conference",
        findPrevious: true
      },
      matchesPerPage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
      selectedMatch: {
        pageIndex: 13,
        matchIndex: 4
      }
    });
  });
  it("performs a case sensitive search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "Dynamic",
        caseSensitive: true
      },
      matchesPerPage: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      }
    });
  });
  it("performs an entire word search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "Government",
        entireWord: true
      },
      matchesPerPage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      selectedMatch: {
        pageIndex: 12,
        matchIndex: 0
      }
    });
  });
  it("performs a multiple term (no phrase) search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "alternate solution",
        phraseSearch: false
      },
      matchesPerPage: [0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 5,
        matchIndex: 0
      }
    });
  });
  it("performs a normal search, where the text is normalized", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController("fraction-highlight.pdf");
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "fraction"
      },
      matchesPerPage: [3],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[19, 46, 62]],
      pageMatchesLength: [[8, 8, 8]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "1/2"
      },
      matchesPerPage: [2],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[27, 54]],
      pageMatchesLength: [[1, 1]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "½"
      },
      matchesPerPage: [2],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[27, 54]],
      pageMatchesLength: [[1, 1]]
    });
  });
  it("performs a normal search, where the text with diacritics is normalized", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController("french_diacritics.pdf");
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "a"
      },
      matchesPerPage: [6],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[0, 2, 4, 6, 8, 10]],
      pageMatchesLength: [[1, 1, 1, 1, 1, 1]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "u"
      },
      matchesPerPage: [6],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[44, 46, 48, 50, 52, 54]],
      pageMatchesLength: [[1, 1, 1, 1, 1, 1]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "ë",
        matchDiacritics: true
      },
      matchesPerPage: [2],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[28, 30]],
      pageMatchesLength: [[1, 1]]
    });
  });
  it("performs a search where one of the results contains an hyphen", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "optimiz"
      },
      matchesPerPage: [1, 4, 2, 3, 3, 0, 2, 9, 1, 0, 0, 6, 3, 4],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      }
    });
  });
  it("performs a search where the result is on two lines", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "user experience"
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[2743]],
      pageMatchesLength: [[14]]
    });
  });
  it("performs a search where the result is on two lines with a punctuation at eol", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "version.the"
      },
      matchesPerPage: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 1,
        matchIndex: 0
      },
      pageMatches: [[], [1493]],
      pageMatchesLength: [[], [11]]
    });
  });
  it("performs a search with a minus sign in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "trace-based  just-in-time"
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[0], [], [], [], [], [], [], [], [], [], [], [], [], [2087]],
      pageMatchesLength: [[24], [], [], [], [], [], [], [], [], [], [], [], [], [24]]
    });
  });
  it("performs a search with square brackets in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "[Programming Languages]"
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1501]],
      pageMatchesLength: [[25]]
    });
  });
  it("performs a search with parenthesis in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "\t   (checks)"
      },
      matchesPerPage: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 1,
        matchIndex: 0
      },
      pageMatches: [[], [201]],
      pageMatchesLength: [[], [9]]
    });
  });
  it("performs a search with a final dot in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    const query = "complex applications.";
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1946]],
      pageMatchesLength: [[21]]
    });
  });
  it("performs a search with a dot in the query and a missing whitespace", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    const query = "complex applications.J";
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1946]],
      pageMatchesLength: [[23]]
    });
  });
  it("performs a search with a dot followed by a whitespace in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    const query = "complex applications. j";
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1946]],
      pageMatchesLength: [[23]]
    });
  });
  it("performs a search in a text containing diacritics before -\\n", async function () {
    if (_is_node.isNodeJS) {
      pending("Linked test-cases are not supported in Node.js.");
    }

    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController("issue14562.pdf");
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "ä",
        matchDiacritics: true
      },
      matchesPerPage: [80],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[302, 340, 418, 481, 628, 802, 983, 989, 1015, 1063, 1084, 1149, 1157, 1278, 1346, 1394, 1402, 1424, 1500, 1524, 1530, 1686, 1776, 1788, 1859, 1881, 1911, 1948, 2066, 2076, 2163, 2180, 2215, 2229, 2274, 2324, 2360, 2402, 2413, 2424, 2463, 2532, 2538, 2553, 2562, 2576, 2602, 2613, 2638, 2668, 2792, 2805, 2836, 2847, 2858, 2895, 2901, 2915, 2939, 2959, 3089, 3236, 3246, 3336, 3384, 3391, 3465, 3474, 3482, 3499, 3687, 3693, 3708, 3755, 3786, 3862, 3974, 4049, 4055, 4068]],
      pageMatchesLength: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
    });
  });
});