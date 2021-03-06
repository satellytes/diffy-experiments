// JsFromRoutes CacheKey a3607d58cb6d1500624c2363eca10166
//
// DO NOT MODIFY: This file was automatically generated by JsFromRoutes.
import { definePathHelper } from '@js-from-routes/client'

export default {
  list: definePathHelper('get', '/diffs/:diff_id/comments'),
  create: definePathHelper('post', '/diffs/:diff_id/comments'),
  new: definePathHelper('get', '/diffs/:diff_id/comments/new'),
  edit: definePathHelper('get', '/diffs/:diff_id/comments/:id/edit'),
  get: definePathHelper('get', '/diffs/:diff_id/comments/:id'),
  update: definePathHelper('patch', '/diffs/:diff_id/comments/:id'),
  destroy: definePathHelper('delete', '/diffs/:diff_id/comments/:id'),
}
