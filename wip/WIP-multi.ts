import * as Effect from "@effect/io/Effect";
import * as Context from "@effect/data/Context";
import { pipe } from "@effect/data/Function";

export interface Dependency {
  readonly value: number;
}

export const Dependency = Context.Tag<Dependency>();

const print = pipe(
  Dependency,
  Effect.flatMap(dependency =>
    Effect.sync(() => console.log("%o", dependency.value)),
  ),
);

const program = pipe(
  print,
  Effect.updateService(Dependency, x => ({ value: x.value + 1 })),
  Effect.provideService(Dependency, { value: 2 }),
  Effect.provideService(Dependency, { value: 1 }),
);

Effect.runFork(program);
