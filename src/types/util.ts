export type KeysOfType<Base, Condition> = {
  [K in keyof Base]: Base[K] extends Condition ? K : never;
}[keyof Base];

// Extracts type from an array.
// See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type UnpackArray<T> = T extends (infer U)[] ? U : never;
