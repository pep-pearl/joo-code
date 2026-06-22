import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from "react";

export type PolymorphicProps<
  T extends ElementType,
  OwnProps extends object = {},
> = OwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps | "as">;

export type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>["ref"];
