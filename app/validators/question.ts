import vine from '@vinejs/vine'

export const createQuestionValidator = vine.compile(
  vine.object({
    categories: vine.array(
      vine.object({
        id: vine
          .string()
          .uuid()
          .exists(async (db, value) => {
            const category = await db.from('categories').where('id', value).first()
            return !!category
          }),
      })
    ),
    name: vine.string().trim().minLength(20).maxLength(255),
    content: vine.string().trim(),
    response1: vine.string().trim().maxLength(255),
    response2: vine.string().trim().maxLength(255),
    response3: vine.string().trim().maxLength(255),
    response4: vine.string().trim().maxLength(255),
    correct: vine.number().min(1).max(5),
    time: vine.number().min(0),
    picture: vine.string().trim().maxLength(255).optional(),
    tags: vine.array(vine.string().trim().maxLength(50)).optional(),
    level: vine.number().min(0).max(5),
  })
)

export const updateQuestionValidator = vine.compile(
  vine.object({
    categories: vine.array(
      vine.object({
        id: vine
          .string()
          .uuid()
          .exists(async (db, value) => {
            const category = await db.from('categories').where('id', value).first()
            return !!category
          }),
      })
    ),
    name: vine.string().trim().minLength(20).maxLength(255).optional(),
    content: vine.string().trim().optional(),
    response1: vine.string().trim().maxLength(255).optional(),
    response2: vine.string().trim().maxLength(255).optional(),
    response3: vine.string().trim().maxLength(255).optional(),
    response4: vine.string().trim().maxLength(255).optional(),
    correct: vine.number().min(1).max(5).optional(),
    time: vine.number().min(0).optional(),
    picture: vine.string().trim().maxLength(255).optional(),
    tags: vine.array(vine.string().trim().maxLength(50)).optional(),
    level: vine.number().min(0).max(5).optional(),
  })
)
