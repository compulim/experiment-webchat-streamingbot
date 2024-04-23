import { array, object, string, union, unknown, value, type Output, type StringSchema } from 'valibot';

const executeTurnResponseBodySchema = object({
  action: union([
    string([value('continue')]) as StringSchema<'continue'>,
    string([value('waiting')]) as StringSchema<'waiting'>
  ]),
  activities: array(object({}, unknown())),
  conversationId: string()
});

export default executeTurnResponseBodySchema;
export type ExecuteTurnResponseBody = Output<typeof executeTurnResponseBodySchema>;
