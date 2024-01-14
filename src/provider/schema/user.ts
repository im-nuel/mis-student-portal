import { Type } from "@feathersjs/typebox";

export const userSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.Optional(Type.String()),

    createdAt: Type.Optional(Type.String()),
    updatedAt: Type.Optional(Type.String()),
  },
  { $id: "User", additionalProperties: false }
);
