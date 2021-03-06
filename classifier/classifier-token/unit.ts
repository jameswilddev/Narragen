import { ClassifierState } from "../classifier-state";
import { classifierToken } from ".";

describe("classifierToken", () => {
  type TestNextState = "Test Next State";

  const when = (
    content: string,
    assertionCallback: (state: () => ClassifierState<TestNextState>) => void
  ): void => {
    describe(`when ${content.toLowerCase()}`, () => {
      let state: ClassifierState<TestNextState>;

      beforeAll(() => {
        state = {
          next: {
            state: "Test Next State",
            onGlobal: jasmine.createSpy("onGlobal"),
            onAttribute: jasmine.createSpy("onAttribute"),
            onRule: jasmine.createSpy("onRule"),
            onWhen: jasmine.createSpy("onWhen"),
            onIs: jasmine.createSpy("onIs"),
            onCreate: jasmine.createSpy("onCreate"),
            onSet: jasmine.createSpy("onSet"),
            onTo: jasmine.createSpy("onTo"),
            onName: jasmine.createSpy("onName"),
            onEof: jasmine.createSpy("onEof"),
          },
        };

        classifierToken(state, 37, 148, content);
      });

      it("does not report eof", () => {
        expect(state.next.onEof).not.toHaveBeenCalled();
      });

      assertionCallback(() => state);
    });
  };

  when("GLoBAl", (state) => {
    it('reports one "global" token', () => {
      expect(state().next.onGlobal).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "global" token', () => {
      expect(state().next.onGlobal).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("attRIBUtE", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('reports one "attribute" token', () => {
      expect(state().next.onAttribute).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "attribute" token', () => {
      expect(state().next.onAttribute).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("ruLE", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('reports one "rule" token', () => {
      expect(state().next.onRule).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "rule" token', () => {
      expect(state().next.onRule).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("wHEn", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('reports one "when" token', () => {
      expect(state().next.onWhen).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "when" token', () => {
      expect(state().next.onWhen).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("iS", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('reports one "is" token', () => {
      expect(state().next.onIs).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "is" token', () => {
      expect(state().next.onIs).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("CReaTE", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('reports one "create" token', () => {
      expect(state().next.onCreate).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "create" token', () => {
      expect(state().next.onCreate).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("sEt", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('reports one "set" token', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "set" token', () => {
      expect(state().next.onSet).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("To", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('reports one "to" token', () => {
      expect(state().next.onTo).toHaveBeenCalledTimes(1);
    });

    it('reports the expected "to" token', () => {
      expect(state().next.onTo).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148
      );
    });

    it("does not report any name tokens", () => {
      expect(state().next.onName).not.toHaveBeenCalled();
    });
  });

  when("anyTHINGwhichISnotAkeyword", (state) => {
    it('does not report any "global" tokens', () => {
      expect(state().next.onGlobal).not.toHaveBeenCalled();
    });

    it('does not report any "attribute" tokens', () => {
      expect(state().next.onAttribute).not.toHaveBeenCalled();
    });

    it('does not report any "rule" tokens', () => {
      expect(state().next.onRule).not.toHaveBeenCalled();
    });

    it('does not report any "when" tokens', () => {
      expect(state().next.onWhen).not.toHaveBeenCalled();
    });

    it('does not report any "is" tokens', () => {
      expect(state().next.onIs).not.toHaveBeenCalled();
    });

    it('does not report any "create" tokens', () => {
      expect(state().next.onCreate).not.toHaveBeenCalled();
    });

    it('does not report any "set" tokens', () => {
      expect(state().next.onSet).not.toHaveBeenCalled();
    });

    it('does not report any "to" tokens', () => {
      expect(state().next.onTo).not.toHaveBeenCalled();
    });

    it('reports one "name token', () => {
      expect(state().next.onName).toHaveBeenCalledTimes(1);
    });

    it("reports the expected name token", () => {
      expect(state().next.onName).toHaveBeenCalledWith(
        "Test Next State",
        37,
        148,
        "anyTHINGwhichISnotAkeyword"
      );
    });
  });
});
