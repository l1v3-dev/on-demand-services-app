import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  extendType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'

import { Context } from '../context'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, ctx: Context) => {
        return ctx.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
      },
    })
  },
})

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    // get all users
    t.list.field("users", {
      type: "User",
      resolve(parent, _, ctx) {
        return ctx.db.user.findMany();
      },
    });
    // get user by id
    t.field("user", {
      type: "User",
      args: {
        id: intArg(),
      },
      resolve(parent, _, ctx) {
        return ctx.db.user.findUnique({
          where: { id: parent.id },
        });
      },
    });
  },
});