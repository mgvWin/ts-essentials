/**
 * This file contains a lot of unused functions as it's only typechecked.
 */
import { IsExactType as IsExact, AssertTrue as Assert } from "conditional-type-checks";
import { DeepReadonly, DeepRequired, Tuple } from "../lib";

function testDeepReadonly() {
  type Input = {
    a: number[][];
    nested: {
      a: 1;
    };
    readonlyAlready: ReadonlyArray<number>;
  }[];

  type Expected = ReadonlyArray<{
    readonly a: ReadonlyArray<ReadonlyArray<number>>;
    readonly nested: {
      readonly a: 1;
    };
    readonly readonlyAlready: ReadonlyArray<number>;
  }>;

  type Test = Assert<IsExact<DeepReadonly<Input>, Expected>>;
}

function testNonNullable() {
  type Test = Assert<IsExact<NonNullable<"abc" | null | undefined>, "abc">>;
}

function testDeepRequire() {
  type Input = {
    a?: number;
    nested?: {
      a?: 1;
    };
  }[];

  type Expected = {
    a: number;
    nested: {
      a: 1;
    };
  }[];

  type Test = Assert<IsExact<DeepRequired<Input>, Expected>>;
}

function testTupleInference() {
  type Expected = [number, string];

  function returnTuple<T extends Tuple>(tuple: T) {
    return tuple;
  }

  const ret = returnTuple([1, "s"]);

  type Test = Assert<IsExact<typeof ret, Expected>>;
}
