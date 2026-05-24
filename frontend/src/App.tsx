import { Mail } from 'lucide-react';
import { Button } from './components/ui/button';
import { Field, FieldDescription, FieldLabel } from './components/ui/field';
import { Input } from './components/ui/input';

function App() {
  return (
    <div className="border h-screen display flex flex-col gap-2 items-center justify-center max-w-5xl my-0 mx-auto">
      <Field>
        <FieldLabel htmlFor="name">Label</FieldLabel>
        <Input
          id="name"
          autoComplete="off"
          placeholder="Evil Rabbit"
          icon={Mail}
          //hasError
          value="Teste"
          disabled
        />
        <FieldDescription>Helper/Error</FieldDescription>
      </Field>
      <Button size="sm">
        <Mail />
        Button
      </Button>
      <Button variant="outline" size="sm" disabled>
        <Mail />
        Button
      </Button>
      <Button size="icon" variant="outline" disabled>
        <Mail color="red" />
      </Button>
      <Button variant="link">Link</Button>
      <Button variant="outline" size="icon" disabled>
        1
      </Button>
    </div>
  );
}

export default App;
