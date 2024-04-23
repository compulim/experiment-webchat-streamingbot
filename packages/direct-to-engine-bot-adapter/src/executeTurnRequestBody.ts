import { object, unknown, type Output } from 'valibot';

const executeTurnRequestBodySchema = object({
  activity: object({}, unknown())
});

export default executeTurnRequestBodySchema;
export type ExecuteTurnRequestBody = Output<typeof executeTurnRequestBodySchema>;
