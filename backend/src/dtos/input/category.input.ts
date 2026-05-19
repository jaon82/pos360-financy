import { Field, InputType } from 'type-graphql';

@InputType()
export class CategoryInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => String)
  color!: string;
}
