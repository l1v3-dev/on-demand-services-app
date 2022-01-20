import { makeSchema } from "nexus";
import { join } from "path";
import * as types from './typedefs'

export const schema = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  outputs: {
    schema: join(__dirname, "/../schema.graphql"),
    typegen: join(__dirname, "/generated/nexus-typegen.ts"),
  },
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  }
})